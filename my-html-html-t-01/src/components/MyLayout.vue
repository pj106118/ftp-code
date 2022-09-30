<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <!-- <a-sub-menu key="sub1">
          <span slot="title"
            ><a-icon type="cloud-upload" /><span>FTP回传</span></span
          >
          <a-menu-item key="7">
            <a-icon type="file" />
            <span>库存对账回传</span>
            <router-link to="/FTPStockUpload"></router-link>
          </a-menu-item>
        </a-sub-menu> -->
        <!-- <a-menu-item key="7">
          <a-icon type="file" />
          <span>库存文件回传</span>
          <router-link to="/FTPStockUpload"></router-link>
        </a-menu-item> -->
        <a-menu-item key="8">
          <a-icon type="file" />
          <span>FTP对接</span>
          <router-link to="/FTPApiCenter"></router-link>
        </a-menu-item>

        <!-- <a-menu-item key="1">
          <a-icon type="file" />
          <span>测试1</span>
          <router-link to="/myController">测试1</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="file" />
          <span>测试2</span>
          <router-link to="/testView2">测试2</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="file" />
          <span>测试3</span>
          <router-link to="/testView3">测试3</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="file" />
          <span>FTP对接配置</span>
          <router-link to="/ftpConfig">FTP对接配置</router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="file" />
          <span>GeekExpression</span>
          <router-link to="/testGeekExpression">GeekExpression</router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="file" />
          <span>TestUpload</span>
          <router-link to="/testUpload">TestUpload</router-link>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div style="margin-left:20px;">
          <h3>
            版本号:{{ artemisVersion.tagName }} ,数据库环境参数:{{
              artemisVersion.dbEnv
            }}
            ,服务器环境参数:{{ artemisVersion.serveEnv }} ,服务启动时间:{{
              artemisVersion.serveStartTime
            }}
          </h3>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import apiStore from "@/utils/apiStore";

export default {
  data() {
    return {
      collapsed: false,
      artemisVersion: {
        tagName: "",
        dbEnv: "",
        serveEnv: "",
        serveStartTime: "",
      },
    };
  },
  mounted() {
    this.$api(apiStore.ftpConfig.getArtemisVersion, {}).then(({ data }) => {
      if (data.code === 0) {
        let obj = data.data;
        this.artemisVersion.tagName = obj.tagName;
        this.artemisVersion.dbEnv = obj.dbParam;
        this.artemisVersion.serveEnv = obj.envParam;
        this.artemisVersion.serveStartTime = obj.startTime;
      } else {
        this.$message.error("服务器异常!!!");
      }
    });

    this.$router
      .push({
        name: "hello",
      })
      .catch(() => {
        console.log("push hello");
      });
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
