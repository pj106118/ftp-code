<template>
  <div class="tree-box-modal-container">
    <a-card title="From Field" class="mappingCard">
      <div class="card-box">
        <a-tree
          :tree-data="treeData"
          show-icon
          default-expand-all
          @select="onSelect"
          @drop="onDrop"
        >
          <template slot="replace" slot-scope="row">
            <div class="rowLine" draggable @dragstart="origDragStart(row)">
              <span>{{ row.fieldName }}</span>
            </div>
          </template>
        </a-tree>
      </div>
    </a-card>
  </div>
</template>
<script>
// const treeData = [
//   {
//     fieldName: "text",
//     key: "text",
//     scopedSlots: {
//       title: "replace",
//     },
//     children: [
//       {
//         fieldName: "field1",
//         key: "field1",
//         scopedSlots: {
//           title: "replace",
//         },
//         children: [],
//       },
//       {
//         fieldName: "field2",
//         key: "field2",
//         scopedSlots: {
//           title: "replace",
//         },
//         children: [],
//       },
//       {
//         fieldName: "field3",
//         key: "field1",
//         scopedSlots: {
//           title: "replace",
//         },
//         children: [],
//       },
//       {
//         fieldName: "field4",
//         key: "field1",
//         scopedSlots: {
//           title: "replace",
//         },
//         children: [],
//       },
//       {
//         fieldName: "field5",
//         key: "field1",
//         scopedSlots: {
//           title: "replace",
//         },
//         children: [],
//       },
//     ],
//   },
// ];
import { mapMutations } from "vuex";

export default {
  name: "ExpOrigTree",
  data() {
    return {
      // treeData,
    };
  },
  props: ["treeData"],
  methods: {
    onSelect(selectedKeys, info) {
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
    ...mapMutations("expDrag", { origDragStart: "OrigDragStart" }),
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
