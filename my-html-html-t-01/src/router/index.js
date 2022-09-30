// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import MyController from "../pages/MyController";
import TestView2 from "../pages/TestView2";
import TestView3 from "../pages/TestView3";
import FtpConfig from "../pages/FtpConfig";
import FtpConfigPorperty from "../pages/FtpConfigPorperty";
import FtpConfigMapping from "../pages/FtpConfigMapping";
import FtpConfigFolder from "../pages/FtpConfigFolder";
import TestGeekExpression from "../pages/TestGeekExpression";
import TestUpload from "../pages/TestUpload";
import FTPStockUpload from "../pages/FTPUpload/FTPStockUpload";
import FTPApiCenter from "../pages/ApiCenter/FTPApiCenter";
import FTPDownload from "../pages/FTPDownload/FTPDownload";
import FTPUpload from "../pages/FTPUpload/FTPUpload";
import Hello from "../pages/Hello";

//创建并暴露一个路由器
const router = new VueRouter({
  base: "./",
  routes: [
    {
      name: "hello",
      path: "/hello",
      component: Hello,
    },
    {
      path: "/myController",
      component: MyController,
    },
    {
      path: "/testView2",
      component: TestView2,
    },
    {
      name: "testView3",
      path: "/testView3",
      component: TestView3,
    },
    {
      name: "ftpConfig",
      path: "/ftpConfig",
      component: FtpConfig,
    },
    {
      name: "ftpConfigPorperty",
      path: "/ftpConfigPorperty",
      component: FtpConfigPorperty,
    },
    {
      name: "ftpConfigMapping",
      path: "/ftpConfigMapping",
      component: FtpConfigMapping,
    },
    {
      name: "ftpConfigFolder",
      path: "/ftpConfigFolder",
      component: FtpConfigFolder,
    },
    {
      name: "testGeekExpression",
      path: "/testGeekExpression",
      component: TestGeekExpression,
    },
    {
      name: "testUpload",
      path: "/testUpload",
      component: TestUpload,
    },
    {
      name: "FTPStockUpload",
      path: "/FTPStockUpload",
      component: FTPStockUpload,
    },
    {
      name: "FTPApiCenter",
      path: "/FTPApiCenter",
      component: FTPApiCenter,
    },
    {
      name: "FTPDownload",
      path: "/FTPDownload",
      component: FTPDownload,
    },
    {
      name: "FTPUpload",
      path: "/FTPUpload",
      component: FTPUpload,
    },
  ],
});

export default router;
