<template>
  <div class="tree-box-modal-container">
    <div class="card-box">
      <a-tree
        :tree-data="importNodeList"
        show-icon
        draggable
        default-expand-all
        @select="onSelect"
        @drop="onDrop"
        @dragstart="myDragstart"
      >
      </a-tree>
    </div>
  </div>
</template>
<script>
// const expInputTreeData = [
//   {
//     title: "输入项",
//     key: "0",
//     children: [
//       { title: "field1", key: "1" },
//       { title: "field2", key: "2" },
//     ],
//   },
// ];

import { mapState, mapMutations } from "vuex";

export default {
  name: "ExpInputTree",
  data() {
    return {};
  },
  computed: {
    ...mapState("expDrag", ["importNodeList"]),
  },
  props: ["expInputTreeData"],
  methods: {
    onSelect(selectedKeys, info) {
      // console.log("selected", selectedKeys, info);
      console.log("info", info);
    },
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
    ...mapMutations("expDrag", { myDragstart: "ExpImportDragStart" }),
    // myDragstart({ event, node }) {
    //   console.log("dragstart", node);

    // },
  },
  mounted() {
    // console.log("mounted");
    // for (let i = 0; i < this.expInputTreeData.length; i++) {
    //   let inputNode = this.expInputTreeData[i];
    //   let importNode = {};
    //   importNode.title = inputNode.fromNodeTitle;
    //   importNode.key = inputNode.fromNodeKey;
    //   this.importNodeList[0].children.push(importNode);
    //   // console.log("importNodeList");
    // }
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
