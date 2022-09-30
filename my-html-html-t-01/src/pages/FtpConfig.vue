<template>
  <div id="ftpConfig">
    <!-- 设置ftp ip 端口和 协议 用户名 名密-->
    <router-link
      :to="{
        name: 'ftpConfigPorperty',
      }"
    >
      服务器配置
    </router-link>
    <hr />
    <router-link
      :to="{
        name: 'ftpConfigFolder',
      }"
    >
      设置接口文件夹
    </router-link>
    <hr />
    <router-link
      :to="{
        name: 'ftpConfigMapping',
      }"
    >
      接口字段映射
    </router-link>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "FtpConfig",
  data() {
    return {
      delimiter: "",
      suffix: "",
    };
  },
  components: {},
};
</script>

<style scoped></style>
