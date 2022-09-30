// const root = "http://localhost:8082";
// const root = "http://localhost:8889";
// const root = "";
const baseUrl = "/geekplus/fe/api";
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPath = curWwwPath.substring(0, pos);
const root = localhostPath;
//A 0
// const baseUrl = "/fe/api";
//A 1

export default {
  ftpConfig: {
    getArtemisVersion: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/getArtemisVersion`, // 接口URL
      describe: "getArtemisVersion",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    setFtpHost: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/setHostInfo`, // 接口URL
      describe: "设置ftp的host信息",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    updateMapping: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/updateMapping`, // 接口URL
      describe: "设置Mapping信息",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    setFTPStockUploadConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/setFTPStockUploadConfig`, // 接口URL
      describe: "设置FTP回传配置",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    setFTPApiConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/setFTPApiConfig`, // 接口URL
      describe: "设置ftp 配置和映射",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    getFTPApiConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/getFTPApiConfig`, // 接口URL
      describe: "获取指定api的配置",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    getCreatedFTPApiConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/getCreatedFTPApiConfig`, // 接口URL
      describe: "获取已有配置",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    addFTPApiConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/addFTPApiConfig`, // 接口URL
      describe: "获取已有配置",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    changeFTPApiStatus: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/changeFTPApiStatus`, // 接口URL
      describe: "启用当前FTPApi",
      async: false,
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    setFTPIPConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/setFTPIPConfig`, // 接口URL
      describe: "提交ftpipconfig",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    setArtemisJsonMsg: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/setArtemisJsonMsg`, // 接口URL
      describe: "setArtemisJsonMsg",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    exportConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/exportConfig`, // 接口URL
      describe: "exportConfig",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
    uploadConfig: {
      method: "post", // 结构请求的方式
      url: `${root}${baseUrl}/ftpConfig/uploadConfig`, // 接口URL
      describe: "uploadConfig",
      isNeedLoading: false, // 是否需要loading
      storeKey: null, // 指定具体的ref，如果不指定则默认全局
    },
  },
};
