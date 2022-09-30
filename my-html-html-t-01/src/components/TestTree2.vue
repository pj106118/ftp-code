<template>
  <div @dragover="dragover">
    <a-tree
      :tree-data="treeData"
      show-icon
      draggable
      default-expand-all
      @select="onSelect"
      @drop="onDrop"
    >
      <a-icon slot="smile" type="smile-o" />
      <template slot="custom" slot-scope="{ selected }">
        <a-icon :type="selected ? 'frown' : 'smile'" />
      </template>

      <template slot="editTitle" slot-scope="{ selected }">
        <a-icon v-show="selected" type="edit" />
        <span>outOrderCode</span>
        <span class="customerTitle">item</span>
      </template>
    </a-tree>
  </div>
</template>
<script>
const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    slots: {
      icon: "smile",
    },
    children: [
      { title: "leaf", key: "0-0-1", scopedSlots: { icon: "custom" } },
      { key: "0-0-2", scopedSlots: { title: "editTitle" } },
    ],
  },
];

export default {
  name: "TestTree2",
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
  },
};
</script>
<style scoped>
.customerTitle {
  background-color: rgb(54, 141, 175);
  margin-left: 10px;
}
</style>
