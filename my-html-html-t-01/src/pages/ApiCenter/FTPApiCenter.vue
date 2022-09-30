<template>
  <div>
    <h3>基础信息</h3>
    <div class="ftpIpConfig">
      FTPip地址:
      <a-input
        v-model="ftpIpConfig.ftp_ip"
        style="width: 90px;height: 30px;margin-right:20px;"
      />
      FTP端口:
      <a-input
        v-model="ftpIpConfig.ftp_prot"
        style="width: 90px;height: 30px;margin-right:20px;"
      />
      FTP协议:
      <a-select
        style="width: 90px;margin-right:20px;"
        v-model="ftpIpConfig.ftp_client"
      >
        <a-select-option value="ftp">
          ftp
        </a-select-option>
        <a-select-option value="ftps">
          ftps
        </a-select-option>
        <a-select-option value="sftp">
          sftp
        </a-select-option>
      </a-select>
      FTP用户名:
      <a-input
        v-model="ftpIpConfig.ftp_username"
        style="width: 90px;height: 30px;margin-right:20px;"
      />
      FTP密码:
      <a-input
        v-model="ftpIpConfig.ftp_password"
        style="width: 90px;height: 30px;margin-right:20px;"
      />
      <a-button type="primary" @click="setFTPIPConfig">
        提交
      </a-button>
    </div>

    <div class="tableButton">
      <a-button
        style="margin-bottom:10px;"
        type="primary"
        @click="changeAddApiVisible()"
      >
        新增
      </a-button>
      <a-button
        style="margin-bottom:10px;margin-left:10px"
        type="download"
        @click="exportConfig()"
        :disabled="!configData.length > 0"
      >
        <a-icon type="download" />
        导出
      </a-button>

      <a-upload
        class="uploadButton"
        name="file"
        :multiple="true"
        :action="uploadUrl"
        @change="handleUploadConfig"
        :fileList="fileList"
        :key="uploadButtonKey"
      >
        <a-button style="margin-bottom:10px;margin-left:10px" type="upload">
          <a-icon type="upload" />
          上传
        </a-button>
      </a-upload>
    </div>

    <a-table :data-source="configData" :pagination="false">
      <a-table-column key="apiDesc" title="接口名称" data-index="apiDesc" />
      <a-table-column key="apiName" title="接口编号" data-index="apiName" />
      <a-table-column key="enabled" title="是否启用">
        <template slot-scope="record">
          <a-switch
            :checked="record.enabled == 2"
            @change="apiEnabledChange(record)"
          />
        </template>
      </a-table-column>

      <!-- <a-table-column key="ownerWhse" title="货主编码">

            <template slot-scope="record">
            <a-select
              mode="multiple"
              style="width: 100%"
              placeholder="Please select"
              v-model="ownerWhseList[record.index]"
              @change="editOwnerConfig(record)"
            >
            <a-select-option
                :key="item.ownerWhse" 
                v-for="item in record.ownerWhse"          
                >{{item.ownerWhse}}
              </a-select-option>
              
            </a-select>

        </template>
      </a-table-column> -->

      <a-table-column key="systemConfig" title="参数配置">
        <template slot-scope="record">
          <a-button type="primary" ghost @click="editSystemConfig(record)">
            参数配置
          </a-button>
        </template>
      </a-table-column>

      <a-table-column key="jsonMsg" title="接口报文">
        <template slot-scope="record">
          <a-button type="primary" ghost @click="showApiJsonMsg(record)">
            接口报文
          </a-button>
        </template>
      </a-table-column>

      <a-table-column key="delete" title="删除">
        <template slot-scope="record">
          <a-button type="primary" ghost @click="deleteConfig(record)">
            删除
          </a-button>
        </template>
      </a-table-column>
    </a-table>

    <a-modal
      title="新增接口"
      :visible="addApiVisible"
      @ok="addFTPApi"
      @cancel="cancelAddFTPApi"
    >
      <a-select
        style="width: 200px;margin-left:20px;"
        @select="handleChange"
        :key="selectAddApiKey"
      >
        <a-select-option
          v-for="p of unCreatedApi"
          :key="p.key"
          :value="p.apiName"
        >
          {{ p.apiDesc }}
        </a-select-option>
      </a-select>
    </a-modal>
    <a-modal
      title="接口报文"
      :visible="apiJsonMsgVisible"
      @ok="changeApiJsonMsg"
      @cancel="cancelApiJsonMsg"
    >
      <a-textarea
        placeholder="接口报文"
        :autoSize="autosize"
        v-model="currentApiJsonMsg"
      />
      <!-- <pre style="white-space:pre-wrap;">
          {{ currentApiJsonMsg }}
      </pre> -->
    </a-modal>
  </div>
</template>
<script>
// #region
// const configData = [
//   {
//     key: "1",
//     apiDesc: "入库单下发",
//     apiName: 9,
//     enabled: 0,
//   },
// ];

// const ftpIpConfig = {
//   ftp_ip: "127.0.0.1",
//   ftp_prot: "21",
//   ftp_client: "ftp",
//   ftp_usrname: "test",
//   ftp_password: "test",
// };

// const unCreatedApi = [
//   {
//     apiName: "11",
//     apiDesc: "入库单回传",
//     key: 3,
//     enabled: 0,
//   },
//   {
//     apiName: "15",
//     apiDesc: "出库单下发",
//     key: 4,
//     enabled: 0,
//   },
//   {
//     apiName: "17",
//     apiDesc: "出库单回传",
//     key: 5,
//     enabled: 0,
//   },
//   {
//     apiName: "1",
//     apiDesc: "商品信息下发",
//     key: 6,
//     enabled: 0,
//   },
// ];
// #endregion
import moment from "moment";
import { mapMutations } from "vuex";
import apiStore from "@/utils/apiStore";

export default {
  name: "FTPApiCenter",
  data() {
    return {
      configData: [],
      ftpIpConfig: {},
      unCreatedApi: [],
      newApiName: "",
      addApiVisible: false,
      apiJsonMsgVisible: false,
      autosize: true,
      currentApiJsonMsg: "",
      selectAddApiKey: 0,
      uploadButtonKey: 0,
      uploadUrl: "",
      fileList: [],
      ownerWhseList:[],
      uploadResponseNum: 0,
    };
  },
  mounted() {
    this.getCenterMsg();
    this.uploadUrl = apiStore.ftpConfig.uploadConfig.url;
  },
  methods: {
    moment,
    ...mapMutations("apiConfig", {
      setApiName: "ApiConfigSetApiName",
    }),
    showApiJsonMsg(record) {
      this.currentApiJsonMsg = record.jsonMsg;
      // this.currentApiJsonMsg = JSON.stringify(this.currentApiJsonMsg, null, 2);
      this.newApiName = record.apiName;
      this.apiJsonMsgVisible = true;
    },
    async exportConfig() {
      window.location.href = apiStore.ftpConfig.exportConfig.url;
    },
    async handleUploadConfig(info) {
      console.log("info", info);
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList = fileList;
      this.uploadResponseNum += 1;
      if (this.uploadResponseNum == 3) {
        if (info.file.response.code == 0) {
          this.$message.success("上传成功");
        } else {
          this.$message.error("上传失败:" + info.file.response.msg);
        }
        this.getCenterMsg();
        this.uploadResponseNum = 0;
      }
    },
    changeApiJsonMsg() {
      this.$api(apiStore.ftpConfig.setArtemisJsonMsg, {
        apiName: this.newApiName,
        jsonMsg: this.currentApiJsonMsg,
      }).then(({ data }) => {
        if (data.code === 0) {
          this.apiJsonMsgVisible = false;
          this.newApiName = "";
          this.currentApiJsonMsg = "";
          this.$message.success("设置报文成功");
        } else {
          //请求失败
          this.apiJsonMsgVisible = false;
          this.newApiName = "";
          this.currentApiJsonMsg = "";
          this.$message.error("设置报文失败:" + data.message);
        }
      });
    },
    cancelApiJsonMsg() {
      this.apiJsonMsgVisible = false;
    },
    changeAddApiVisible() {
      this.addApiVisible = true;
    },
    cancelAddFTPApi() {
      this.selectAddApiKey += 1;
      this.addApiVisible = false;
    },
    handleChange(value) {
      console.log("select name", value);
      this.newApiName = value;
    },
    getCenterMsg() {
      this.$api(apiStore.ftpConfig.getCreatedFTPApiConfig, {}).then(
        ({ data }) => {
          if (data.code === 0) {
            let obj = data.data;
            this.ftpIpConfig = obj.ftpIpConfig;
            this.configData = obj.configData.map((item, index) => {
                  this.ownerWhseList[index] = []
                  item.index = index;
                  return item;
            });
            this.unCreatedApi = obj.unCreatedApi;
          } else {
            this.$message.error("服务器异常!!!");
          }
        }
      );
    },
    toArtemisChangeFTPApiStatus(apiName, status) {
      this.$api(apiStore.ftpConfig.changeFTPApiStatus, {
        apiName: apiName,
        status: status,
        // ownerWhseList:ownerWhseList,
      }).then(({ data }) => {
        if (data.code === 0) {
          console.log("toArtemisChangeFTPApiStatus succss");
        } else {
          //请求失败
          this.$message.error("启用失败:" + data.msg);
        }
      });
    },
    addFTPApi() {
      this.selectAddApiKey += 1;
      if (this.newApiName !== "") {
        this.toArtemisChangeFTPApiStatus(this.newApiName, 1);
        let newApiArr = this.unCreatedApi.splice(
          this.unCreatedApi.findIndex((a) => a.apiName === this.newApiName),
          1
        );
        console.log("newApi", newApi);
        let newApi = newApiArr[0];
        newApi.enabled = 1;
        this.configData.unshift(newApi);
        this.addApiVisible = false;
        this.newApiName = "";
      }
    },
    setFTPIPConfig() {
      this.$api(apiStore.ftpConfig.setFTPIPConfig, {
        ftpIpConfig: this.ftpIpConfig,
      }).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success("基础信息配置成功");
        } else {
          this.$message.error("基础信息配置失败:" + data.message);
        }
      });
    },
    deleteConfig(record) {
      this.toArtemisChangeFTPApiStatus(record.apiName, 0,record.ownerWhseList);
      let deleteApiArr = this.configData.splice(
        this.configData.findIndex((a) => a.apiName === record.apiName),
        1
      );
      let deApi = deleteApiArr[0];
      console.log("deApi", deApi);
      deApi.enabled = 0;
      this.unCreatedApi.unshift(deApi);
    },
    editMappingConfig(record) {
      console.log("record", record);
    },
    // editOwnerConfig(record){
    //   console.log(111111,this.ownerWhseList, record);
    //   record.ownerWhseList = this.ownerWhseList;
    // },
    editSystemConfig(record) {
      this.setApiName(record);
      let parth = "";
      if (record.apiType == 0) {
        //下发接口
        parth = "FTPDownload";
      } else {
        //回传接口
        parth = "FTPUpload";
      }
      this.$router
        .push({
          name: `${parth}`,
        })
        .catch(() => {
          console.log(`push ${parth} error`);
        });
    },
    apiEnabledChange(record) {
      let sw = record.enabled;
      let status = 1;
      if (sw === 2) {
        status = 1;
      } else {
        status = 2;
      }

      this.$api(apiStore.ftpConfig.changeFTPApiStatus, {
        apiName: record.apiName,
        status: status,
        // ownerWhseList: this.ownerWhseList[record.index],
      }).then(({ data }) => {
        if (data.code === 0) {
          console.log("toArtemisChangeFTPApiStatus succss");
          record.enabled = status === 1 ? 1 : 2;
        } else {
          this.$message.error("启用失败:" + data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
.ftpIpConfig {
  display: flex;
  margin-bottom: 30px;
  margin-top: 10px;
  align-items: center;
}
.tableButton {
  display: flex;
}
.uploadButton {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
