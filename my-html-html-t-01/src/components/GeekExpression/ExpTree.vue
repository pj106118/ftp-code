<template>
  <div class="tree-box-modal-container">
    <div class="card-box">
      <a-tree :tree-data="expTreeData" show-icon default-expand-all>
        <template slot="replace" slot-scope="row">
          <div class="rowLine" draggable @dragstart="myDragstart(row)">
            <a-popover placement="topLeft">
              <template slot="content">
                <p v-for="(p, index) in row.expDesc" :key="index">{{ p }}</p>
              </template>
              <span>{{ row.expName }}</span>
            </a-popover>
          </div>
        </template>
      </a-tree>
    </div>
  </div>
</template>
<script>
const expTreeData = [
  {
    expName: "表达式",
    scopedSlots: {
      title: "replace",
    },
    key: "0-0",
    children: [
      {
        expName: "设固定值",
        expDesc: ["生成常量值"],
        expIndex: 1,
        scopedSlots: {
          title: "replace",
        },
        expNodeList: [
          {
            index: 0,
            showStr: " 输入固定值 :  ",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 1,
            showStr: " ,结果 : __ ",
            type: "result",
            nodeValue: "",
            nodeKey: "",
          },
        ],
      },
      {
        expName: "日期格式",
        expDesc: ["格式转换如:yyyyMMddHHmmss"],
        expIndex: 2,
        scopedSlots: {
          title: "replace",
        },

        expNodeList: [
          {
            index: 0,
            showStr: " 输入 :_____  ",
            type: "input",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 1,
            showStr: " 输入格式 :  ",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 2,
            showStr: " ,结果 : __ ",
            type: "result",
            nodeValue: "",
            nodeKey: "",
          },
        ],
      },
      {
        expName: "枚举转换",
        expDesc: [
          "0>A;1>B (0 转为 A, 1 转为 B)",
          "0>A;1>B (不是 0 或 1  时，结果为空)",
          "0>A;1>B; (不是 0 或 1  时，结果为空)",
          "0>A;1>B;2> (原始是2,结果为空)",
          "0>A;1>B;>C (原始是空,结果为C)",
          "0>A;1>B;C  (不是 0 或 1 时，结果为C)",
          "0>A;1>B;>  (不是 0 或 1 时，结果为原始值)",
        ],
        expIndex: 3,
        scopedSlots: {
          title: "replace",
        },
        expNodeList: [
          {
            index: 0,
            showStr: " 输入 :_____  ",
            type: "input",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 1,
            showStr: " 枚举值:",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 2,
            showStr: " ,结果 : __ ",
            type: "result",
            nodeValue: "",
            nodeKey: "",
          },
        ],
      },
      {
        expName: "字符分割",
        expDesc: [
          "例:原始值为'a_b',用'_'分割，",
          "变成[a , b ],取的第一位,结果为:a",
        ],
        expIndex: 4,
        scopedSlots: {
          title: "replace",
        },
        expNodeList: [
          {
            index: 0,
            showStr: " 输入 : ___ , ",
            type: "input",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 1,
            showStr: " 用: ",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 2,
            showStr: " 分割 , ",
            type: "exp",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 3,
            showStr: " 取位置为: ",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 4,
            showStr: " 结果 : ___ , ",
            type: "result",
            nodeValue: "",
            nodeKey: "",
          },
        ],
      },
      {
        expName: "字符拼接",
        expDesc: ["例:concat('a','_','b')"],
        expIndex: 5,
        scopedSlots: {
          title: "replace",
        },
        expNodeList: [
          {
            index: 0,
            showStr: " 位置1 :  ",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 1,
            showStr: " , 位置2 :   ",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 2,
            showStr: " , 位置3 :   ",
            type: "keyIn",
            nodeValue: "",
            nodeKey: "",
          },
          {
            index: 3,
            showStr: " , 结果 : ___ , ",
            type: "result",
            nodeValue: "",
            nodeKey: "",
          },
        ],
      },
    ],
  },
];
import { mapMutations } from "vuex";

export default {
  name: "ExpTree",
  data() {
    return {
      expTreeData,
    };
  },
  methods: {
    onCheck(checkedKeys, info) {
      console.log("onCheck", checkedKeys, info);
    },
    edit() {
      console.log("edit");
    },
    dragover(e) {
      e.preventDefault();
    },
    onDrop(e) {
      console.log("onDrop", e);
    },
    ...mapMutations("expDrag", { myDragstart: "ExpDragStart" }),
    // myDragstart({ event, node }) {
    //   console.log("dragstart", node);

    // },
  },
};
</script>
<style scoped>
.customerTitle {
  background-color: rgb(54, 141, 175);
  margin-left: 10px;
}

.mappingCard {
  overflow-y: auto;
}
.card-box {
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
