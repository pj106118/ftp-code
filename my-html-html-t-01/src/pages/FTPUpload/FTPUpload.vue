<template>
  <div id="FTPUploadIndex">
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
          :secondStep="5"
          :disabledSeconds="getDisabledSeconds"
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
// let origTreeData = [
//   {
//     fieldName: "body",
//     key: "body",
//     scopedSlots: {
//       title: "replace",
//     },
//     children: [
//       {
//         fieldName: "sku_list",
//         key: "body.sku_list[]",
//         scopedSlots: {
//           title: "replace",
//         },
//         children: [
//           {
//             fieldName: "warehouse_code",
//             key: "body.sku_list[].warehouse_code",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "owner_code",
//             key: "body.sku_list[].owner_code",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "sku_code",
//             key: "body.sku_list[].sku_code",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "sku_level",
//             key: "body.sku_list[].sku_level",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "out_batch_code",
//             key: "body.sku_list[].out_batch_code",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "amount",
//             key: "body.sku_list[].amount",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "production_date",
//             key: "body.sku_list[].production_date",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "expiration_date",
//             key: "body.sku_list[].expiration_date",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "audit_time",
//             key: "body.sku_list[].audit_time",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "shelf_code",
//             key: "body.sku_list[].shelf_code",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "shelf_bin_code",
//             key: "body.sku_list[].shelf_bin_code",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property04",
//             key: "body.sku_list[].batch_property04",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property05",
//             key: "body.sku_list[].batch_property05",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property07",
//             key: "body.sku_list[].batch_property07",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property08",
//             key: "body.sku_list[].batch_property08",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property09",
//             key: "body.sku_list[].batch_property09",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property10",
//             key: "body.sku_list[].batch_property10",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property11",
//             key: "body.sku_list[].batch_property11",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//           {
//             fieldName: "batch_property12",
//             key: "body.sku_list[].batch_property12",
//             scopedSlots: {
//               title: "replace",
//             },
//             children: [],
//             mappingList: [],
//             expressionStepList: [],
//           },
//         ],
//         mappingList: [],
//         expressionStepList: [],
//       },
//     ],
//     mappingList: [],
//     expressionStepList: [],
//   },
// ];

import { mapState, mapMutations } from "vuex";
import FtpConfigMappingVue from "../FtpConfigMapping";
import apiStore from "@/utils/apiStore";
import moment from "moment";

export default {
  name: "FTPUpload",
  data() {
    return {
      form: this.$form.createForm(this, { name: "ftpProperties" }),
      ftpProperties: [],
      fieldMapConfig: {},
      origTreeData: [],
      targetTreeData: [],
      visible: false,
      deleteMapVisible: false,
      deleteConfigVisible: false,
      submitConfrimVisible: false,
      columns: null,
      isMpping: false,
      apiName: 0,
      jobConfig: {},
    };
  },
  components: { FtpConfigMappingVue },
  computed: {
    ...mapState("apiConfig", ["currentApiName", "currentApiDesc"]),
  },
  mounted() {
    console.log("currentApiName", this.currentApiName);
    if (this.currentApiName != "" && this.currentApiName != null) {
      this.$api(apiStore.ftpConfig.getFTPApiConfig, {
        apiName: this.currentApiName,
      }).then(({ data }) => {
        if (data.code === 0) {
          let obj = data.data;
          this.apiName = obj.apiName;
          this.ftpProperties = [...obj.properties];
          this.targetTreeData = [...obj.targetTreeData];
          this.origTreeData = [...obj.origTreeData];
          this.jobConfig = obj.jobConfig;
          this.columns = this.targetTreeData.length;
        } else {
          alert("请求服务器获取资源失败5:", data.message);
        }
      });
    }
  },
  methods: {
    ...mapMutations("expDrag", { setOrigTreeData: "ExpSetOrigTreeData" }),
    ...mapMutations("expDrag", { setTargetTreeData: "ExpSetTargetTreeData" }),
    moment,
    jobSwitchChange() {
      let sw = this.jobConfig.jobSwitch;
      if (sw === 1) {
        this.jobConfig.jobSwitch = 0;
      } else {
        this.jobConfig.jobSwitch = 1;
      }
    },
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
      this.targetTreeData = [];
      this.setTargetTreeData(this.targetTreeData);
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
      this.setOrigTreeData(this.origTreeData);
      if (this.columns > 0) {
        console.log("开始设置setFTPTargetTreeData", this.columns);
        if (this.targetTreeData.length === 0) {
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
            this.targetTreeData.push(node);
          }
        }
        this.setTargetTreeData(this.targetTreeData);
        this.visible = true;
      } else {
        alert("请先设置文件总列数");
      }
    },

    handleSubmit() {
      this.$api(apiStore.ftpConfig.setFTPApiConfig, {
        apiName: this.apiName,
        properties: this.ftpProperties,
        targetTreeData: this.targetTreeData,
        origTreeData: this.origTreeData,
        jobConfig: this.jobConfig,
      }).then(
        // eslint-disable-next-line no-unused-vars
        ({ data }) => {
          console.log("code", data.code);
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
