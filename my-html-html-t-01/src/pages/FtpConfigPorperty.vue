<template>
  <div id="index">
    <h1>设置ftp ip 端口号</h1>
    <br />
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item
        v-for="(item, index) in ftpProperties"
        :key="index"
        :label="item.name"
        @submit="handleSubmit"
      >
        <a-input
          style="width: 300px"
          v-model="item.value"
          :placeholder="item.desc"
          v-if="item.name != 'ftpClient'"
          v-decorator="[
            item.name,
            {
              rules: [{ required: true, message: '参数不能为空' }],
              initialValue: item.value,
            },
          ]"
        />

        <a-select
          :default-value="ftpClient"
          style="width: 120px"
          v-if="item.name == 'ftpClient'"
          v-model="ftpClient"
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
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="handleSubmit()">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
let ftpProperties = [
  {
    name: "hostName",
    value: "",
    desc: "服务器ip",
  },
  {
    name: "hostPort",
    value: "",
    desc: "服务器端口",
  },
  {
    name: "usrName",
    value: "",
    desc: "用户名",
  },
  {
    name: "password",
    value: "",
    desc: "用户名",
  },
  {
    name: "ftpClient",
    value: "",
    desc: "协议",
  },
];
import apiStore from "@/utils/apiStore";
export default {
  name: "FtpConfigPorperty",
  data() {
    return {
      form: this.$form.createForm(this, { name: "ftpProperties" }),
      ftpProperties,
      ftpClient: "ftp",
    };
  },
  methods: {
    handleSubmit() {
      console.log("配置提交了");
      this.form.validateFields((err, values) => {
        if (!err) {
          values.ftpClient = this.ftpClient;
          console.log("Received values of form: ", values);
          // let endItem = this.ftpProperties.pop();
          // endItem.value = this.ftpClient;
          // this.ftpProperties.push(endItem);
          // console.log("ftpProperties: ", this.ftpProperties);

          this.$api(apiStore.ftpConfig.setFtpHost, values).then(
            ({ data, msg, code }) => {
              if (code === 0) {
                this.loading = false;
                this.data = data.listData;
                this.pagination.total = data.totalCount;
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped></style>
