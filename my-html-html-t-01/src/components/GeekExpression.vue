<template>
  <div class="expOut">
    <div class="showLine">
      <span>字段名称：{{ fieldName }} ,请添加步骤：</span>
      <a-icon @click="addStep" type="plus-square" class="editStep" />
      <a-icon @click="deleteStep" type="minus-square" class="editStep" />
      <ExpSteps :stepTreeData="stepTreeData"></ExpSteps>
    </div>
    <div class="addLine">
      <ExpTree></ExpTree>
    </div>
    <div class="inputLine">
      <ExpInputTree></ExpInputTree>
    </div>
  </div>
</template>
<script>
// let stepNode = {
//   stepNo: "",
//   scopedSlots: {
//     title: "replace",
//   },
//   index: "",
//   expName: "",
//   expNodeList: [],
// };

// let stepTreeData = [];

import ExpTree from "./GeekExpression/ExpTree";
import ExpSteps from "./GeekExpression/ExpSteps";
import ExpInputTree from "./GeekExpression/ExpInputTree";
import { mapState, mapMutations } from "vuex";

export default {
  name: "TestGeekExpression",
  data() {
    return {};
  },
  components: {
    ExpTree,
    ExpSteps,
    ExpInputTree,
  },
  props: ["fieldName"],
  computed: {
    ...mapState("expDrag", ["stepTreeData", "importNodeList"]),
  },
  methods: {
    // 添加步骤
    addStep() {
      let len = this.stepTreeData.length;
      if (len > 0) {
        let lastStep = this.stepTreeData[len - 1];
        var arr = lastStep.expNodeList.filter(
          (node) => node.type === "result" && node.nodeValue === ""
        );
        console.log("arr", arr);
        if (arr.length != 0 || lastStep.expName === "") {
          alert("请先完成之前步骤");
          return;
        }
      }
      let newStep = {
        scopedSlots: {
          title: "replace",
        },
        expName: "",
        expNodeList: [],
      };
      newStep.index = this.stepTreeData.length;
      newStep.stepNo = this.stepTreeData.length + 1;
      this.stepTreeData.push(newStep);
    },
    deleteStep() {
      if (this.stepTreeData.length > 0) {
        let lastStep = this.stepTreeData.pop();
        console.log(lastStep);
        if (lastStep.expNodeList.length > 0) {
          var arr = lastStep.expNodeList.filter(
            (node) => node.type === "result"
          );
          let len = arr.length;
          console.log("len", len);
          for (let i = 0; i < len; i++) {
            this.importNodeList[0].children.pop();
          }
        }
      }
    },
    addExp() {
      console.log("addExp");
    },
    dropExp() {
      console.log("dropExp");
    },
    ondragstart() {
      console.log("ondragstart");
    },
    ondrop(node) {
      node.preventDefault();
      console.log("node", node);
    },
  },
};
</script>

<style scoped>
.expOut {
  height: 300px;
  width: 100%;
  border-style: solid;
  border-width: 5px;
  display: flex;
}
.showLine {
  width: 50%;
  background-color: tomato;
}
.addLine {
  width: 30%;
  background-color: yellow;
  display: flex;
}
.inputLine {
  width: 20%;
  background-color: rgb(70, 167, 78);
}
.dragExpSpan {
  font-size: 30px;
  color: #1890ff;
  text-decoration: underline;
}
.editStep {
  margin-left: 10px;
}
</style>
