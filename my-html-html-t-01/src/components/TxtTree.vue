<template>
  <div class="tree-box-modal-container">
    <a-card title="From Field" class="mappingCard">
      <div class="card-box">
        <a-tree
          :tree-data="treeData"
          show-icon
          draggable
          default-expand-all
          @select="onSelect"
          @drop="onDrop"
          @dragstart="myDragstart"
        >
        </a-tree>
      </div>
    </a-card>
  </div>
</template>
<script>
const treeData = [
  {
    title: "txt",
    key: "0-0",
    children: [
      { title: "field1", key: "field1" },
      { title: "field2", key: "field2" },
      { title: "field3", key: "field3" },
      { title: "field4", key: "field4" },
    ],
  },
];
import { mapMutations } from "vuex";

export default {
  name: "TxtTree",
  data() {
    return {
      treeData,
    };
  },
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
    ...mapMutations("treeDrag", { myDragstart: "FromDragStart" }),
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
