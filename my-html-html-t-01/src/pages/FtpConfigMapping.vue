<template>
  <div>
    <!-- <h1>设置FtpConfigMapping</h1> -->
    <div id="index">
      <ExpOrigTree id="origTree" :treeData="expOrigTreeData" />
      <ExpTargetTree id="targetTree" :treeData="expTargetTreeData" />
    </div>
    <!-- <div id="mappingSubmit">
      <a-button id="button" type="primary" @click="handleSubmit()"
        >提交配置</a-button
      >
    </div> -->
  </div>
</template>

<script>
import apiStore from "@/utils/apiStore";
import ExpOrigTree from "../components/GeekExpression/ExpOrigTree";
import ExpTargetTree from "../components/GeekExpression/ExpTargetTree";
import { mapState } from "vuex";

// #region
//注释折叠
// const treeData = [
//   {
//     fieldName: "header",
//     scopedSlots: {
//       title: "replace",
//     },
//     key: "header",
//     mappingList: [],
//     children: [
//       {
//         fieldName: "userId",
//         scopedSlots: {
//           title: "replace",
//         },
//         key: "userId",
//         mappingList: [],
//         children: [],
//         expressionStepList: [],
//       },
//     ],
//   },
//   {
//     fieldName: "body",
//     scopedSlots: {
//       title: "replace",
//     },
//     key: "body",
//     mappingList: [],
//     children: [
//       {
//         scopedSlots: {
//           title: "replace",
//         },
//         fieldName: "receipt_list",
//         key: "body.receipt_list[0]",
//         mappingList: [],
//         children: [
//           {
//             scopedSlots: {
//               title: "replace",
//             },
//             fieldName: "receipt_code",
//             key: "body.receipt_list[0].receipt_code",
//             mappingList: [],
//             children: [],
//             expressionStepList: [],
//           },
//           {
//             scopedSlots: {
//               title: "replace",
//             },
//             fieldName: "type",
//             key: "body.receipt_list[0].type",
//             mappingList: [],
//             children: [],
//             expressionStepList: [],
//           },
//           {
//             scopedSlots: {
//               title: "replace",
//             },
//             fieldName: "remark",
//             key: "body.receipt_list[0].remark",
//             mappingList: [],
//             children: [],
//             expressionStepList: [],
//           },
//           {
//             scopedSlots: {
//               title: "replace",
//             },
//             fieldName: "sku_list",
//             key: "body.receipt_list[0].sku_list[0]",
//             mappingList: [],
//             children: [
//               {
//                 scopedSlots: {
//                   title: "replace",
//                 },
//                 fieldName: "sku_code",
//                 key: "body.receipt_list[0].sku_list[0].sku_code",
//                 mappingList: [],
//                 children: [],
//               },
//               {
//                 scopedSlots: {
//                   title: "replace",
//                 },
//                 fieldName: "sku_level",
//                 key: "body.receipt_list[0].sku_list[0].sku_level",
//                 mappingList: [],
//                 children: [],
//               },
//               {
//                 scopedSlots: {
//                   title: "replace",
//                 },
//                 fieldName: "owner_code",
//                 key: "body.receipt_list[0].sku_list[0].owner_code",
//                 mappingList: [],
//                 children: [],
//               },
//               {
//                 scopedSlots: {
//                   title: "replace",
//                 },
//                 fieldName: "amount",
//                 key: "body.receipt_list[0].sku_list[0].amount",
//                 mappingList: [],
//                 children: [],
//               },
//               {
//                 scopedSlots: {
//                   title: "replace",
//                 },
//                 fieldName: "out_batch_code",
//                 key: "body.receipt_list[0].sku_list[0].out_batch_code",
//                 mappingList: [],
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
// #endregion

export default {
  name: "FtpConfigMapping",
  data() {
    return {
      // treeData,
    };
  },
  components: {
    ExpOrigTree,
    ExpTargetTree,
  },
  computed: {
    ...mapState("expDrag", ["expOrigTreeData", "expTargetTreeData"]),
  },
  methods: {
    handleSubmit() {
      console.log("配置提交了", this.expTargetTreeData);
      this.$api(apiStore.ftpConfig.updateMapping, this.expTargetTreeData).then(
        // eslint-disable-next-line no-unused-vars
        ({ data, msg, code }) => {
          if (code === 0) {
            this.loading = true;
            this.data = data.listData;
            this.pagination.total = data.totalCount;
          }
        }
      );
      //
      // this.$router.go(0);
      // this.visible = false;
    },
  },
};
</script>

<style scoped>
#index {
  margin: 50px auto;
}

#origTree {
  width: 40%;
  float: left;
  margin-left: 5%;
}

#targetTree {
  width: 40%;
  float: left;
  margin-left: 5%;
}

#mappingSubmit {
  float: left;
  margin-left: 5%;
}
</style>
