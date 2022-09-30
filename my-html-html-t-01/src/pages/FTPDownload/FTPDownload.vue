<template>
  <div id="FTPDownloadIndex">
    <h2>{{ currentApiDesc }}</h2>
    <br />
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item
        v-for="(item, index) in ftpProperties"
        :key="index"
        :label="item.showStr"
        @submit="handleSubmit"
      >
        <a-input
          style="width: 300px"
          v-model="item.value"
          :placeholder="item.desc"
        />
      </a-form-item>
      <a-form-item
        label="执行时间"
        style="margin-bottom:0;"
        class="form-item-columns"
      >
        <a-time-picker
          addon="间隔秒数"
          format="每ss秒"
          :default-open-value="moment('30', 'ss')"
          :disabledSeconds="getDisabledSeconds"
          :secondStep="5"
          valueFormat="ss"
          v-model="jobConfig.jobTime"
        />
      </a-form-item>
      <a-form-item
        label="文件列数"
        style="margin-bottom:1;margin-top:20px;"
        class="form-item-columns"
      >
        <div>
          <a-input
            style="width: 150px"
            v-model="columns"
            placeholder="文件总列数"
          />
          <a-button
            type="primary"
            @click="setFTPUploadMapping"
            style="margin-left:10px"
            >编辑映射</a-button
          >
          <a-button
            type="dashed"
            @click="showDeleteMapConfirm"
            style="margin-left:10px"
            >清空映射</a-button
          >
        </div>
      </a-form-item>
      <br />
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="showSubmitConfirm()"
          >提交配置</a-button
        >
        <a-button
          type="dashed"
          style="margin-left:80px"
          @click="showDeleteFTPConfirm"
        >
          清空配置
        </a-button>
      </a-form-item>
    </a-form>

    <a-drawer
      title="编辑字段"
      width="60%"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="expCleanMap"
    >
      <FtpConfigMappingVue />
    </a-drawer>

    <a-modal
      title=""
      :visible="submitConfrimVisible"
      @ok="submitConfrimOk"
      @cancel="submitConfrimCancel"
    >
      <a-alert type="info" message="确认提交配置" banner />
    </a-modal>

    <a-modal
      title=""
      :visible="deleteConfigVisible"
      @ok="deleteCurrentConfigOk"
      @cancel="deleteCurrentConfigCancel"
    >
      <a-alert :show-icon="false" message="确认清空配置" banner />
    </a-modal>
    <a-modal
      title=""
      :visible="deleteMapVisible"
      @ok="deleteMapConfirmOk"
      @cancel="deleteMapConfirmCancel"
    >
      <a-alert :show-icon="false" message="清空映射" banner />
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FtpConfigMappingVue from "../FtpConfigMapping";
import apiStore from "@/utils/apiStore";
import moment from "moment";

function clearTargetData(treeData) {
  for (let i = 0; i < treeData.length; i++) {
    let fieldNode = treeData[i];
    fieldNode.expressionStepList = [];
    fieldNode.mappingList = [];
    if (fieldNode.children.length > 0) {
      clearTargetData(fieldNode.children);
    }
  }
}

export default {
  name: "FTPDownload",
  data() {
    return {
      form: this.$form.createForm(this, { name: "ftpProperties" }),
      ftpProperties: [],
      targetTreeData: [],
      origTreeData: [],
      visible: false,
      deleteMapVisible: false,
      deleteConfigVisible: false,
      submitConfrimVisible: false,
      columns: 0,
      isMpping: false,
      apiName: 0,
      jobConfig: {},
    };
  },
  computed: {
    ...mapState("apiConfig", ["currentApiName", "currentApiDesc"]),
  },
  components: { FtpConfigMappingVue },
  mounted() {
    if (this.currentApiName != null && this.currentApiName != "") {
      this.$api(apiStore.ftpConfig.getFTPApiConfig, {
        apiName: this.currentApiName,
      }).then(({ data }) => {
        if (data.code === 0) {
          //请求成功
          let obj = data.data;
          this.apiName = obj.apiName;
          this.ftpProperties = [...obj.properties];
          this.targetTreeData = [...obj.targetTreeData];
          this.jobConfig = obj.jobConfig;
          this.columns = obj.columns;
        } else {
          this.$message.error("服务器异常" + data.message);
        }
      });
    }
  },
  methods: {
    ...mapMutations("expDrag", { setOrigTreeData: "ExpSetOrigTreeData" }),
    ...mapMutations("expDrag", { setTargetTreeData: "ExpSetTargetTreeData" }),
    moment,
    //确认提交
    showSubmitConfirm() {
      this.submitConfrimVisible = true;
    },
    submitConfrimOk() {
      this.handleSubmit();
    },
    submitConfrimCancel() {
      this.submitConfrimVisible = false;
    },

    //清空字段mapping
    showDeleteMapConfirm() {
      this.deleteMapVisible = true;
    },
    deleteMapConfirmCancel() {
      this.deleteMapVisible = false;
    },
    deleteMapConfirmOk() {
      clearTargetData(this.targetTreeData);
      this.setTargetTreeData(this.targetTreeData);
      this.origTreeData = [];
      this.deleteMapVisible = false;
    },
    //禁用秒
    getDisabledSeconds (selectedHour, selectedMinute) {
      return [0]
    },

    //清空当前ftpConfig
    showDeleteFTPConfirm() {
      this.deleteConfigVisible = true;
    },
    deleteCurrentConfigCancel() {
      this.deleteConfigVisible = false;
    },
    deleteCurrentConfigOk() {
      this.targetTreeData = [];
      this.columns = null;
      this.setTargetTreeData(this.targetTreeData);
      this.ftpProperties.forEach((item) => {
        item.value = "";
      });
      this.deleteConfigVisible = false;
    },
    //
    updateMap() {
      this.visible = false;
    },
    expCleanMap() {
      this.visible = false;
    },
    afterVisibleChange() {
      console.log("afterVisibleChange");
    },
    //设置ftp回传的目标树
    setFTPUploadMapping() {
      this.setTargetTreeData(this.targetTreeData);
      if (this.columns > 0) {
        if (this.origTreeData.length === 0) {
          for (let i = 0; i < this.columns; i++) {
            let node = {
              fieldName: "column" + (i + 1),
              key: "column" + (i + 1),
              scopedSlots: {
                title: "replace",
              },
              mappingList: [],
              children: [],
              expressionStepList: [],
            };
            this.origTreeData.push(node);
          }
        }
        this.setOrigTreeData(this.origTreeData);
        this.visible = true;
      } else {
        alert("请先设置文件总列数");
      }
    },
    handleSubmit() {
      console.log("jobConfig", this.jobConfig);

      if (this.columns < 1) {
        alert("请先设置文件总列数");
        this.submitConfrimVisible = false;
        return;
      }

      this.$api(apiStore.ftpConfig.setFTPApiConfig, {
        apiName: this.apiName,
        properties: this.ftpProperties,
        targetTreeData: this.targetTreeData,
        jobConfig: this.jobConfig,
        columns: this.columns,
      }).then(
        // eslint-disable-next-line no-unused-vars
        ({ data }) => {
          if (data.code === 0) {
            alert("配置成功");
            this.$router
              .push({
                name: "FTPApiCenter",
              })
              .catch(() => {
                console.log("push FTPApiCenter error");
              });
          } else {
            alert("配置失败:" + data.msg);
          }
        }
      );
      this.submitConfrimVisible = false;
    },
  },
};
</script>

<style scoped>
.form-item-columns {
  display: flex;
}
</style>
