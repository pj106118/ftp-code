<template>
  <div>
    <div class="card-box">
      <a-tree :tree-data="stepTreeData" draggable show-icon default-expand-all>
        <template slot="replace" slot-scope="row">
          <div class="rowLine" @drop="onDrop(row)">
            <span >步骤{{ row.stepNo }}:</span>
            <div
              class="expModel"
              v-for="(item, index) in row.expNodeList"
              :key="index"
            >
              <span>
                {{ item.showStr }}
                <a-input
                  auto-size
                  style="width: 90px;height: 22px;"
                  v-model="item.nodeValue"
                  v-if="item.type == 'keyIn'"
                />
              </span>
            </div>
          </div>
        </template>
      </a-tree>
    </div>
  </div>
</template>
<script>
let stepNode = {
  stepNo: "",
  scopedSlots: {
    title: "replace",
  },
  key: "",
  expName: "",
  expNodeList: [],
};
import { mapState, mapMutations } from "vuex";

export default {
  name: "ReceiptNoteTree",
  data() {
    return {
      stepNode,
    };
  },
  props: ["stepTreeData"],
  computed: {
    ...mapState("expDrag", [
      "expStep",
      "importName",
      "importKey",
      "importNodeList",
    ]),
  },
  methods: {
    onDrop(row) {
      if (row.expNodeList.length === 0) {
        let step = JSON.parse(JSON.stringify(this.expStep));
        row.expName = step.expName;
        row.expIndex = step.expIndex;
        row.expNodeList = step.expNodeList;
      } else {
        for (let i = 0; i < row.expNodeList.length; i++) {
          let node = row.expNodeList[i];
          if (
            (node.type === "input" || node.type === "keyIn") &&
            node.nodeKey === "" && node.nodeValue === ""
          ) {
            if (node.type === "input") {
              node.showStr = "输入:" + this.importName;
            }
            node.nodeKey = this.importKey;
            node.nodeValue = this.importName;
            break;
          }
        }
      }
      var arr = row.expNodeList.filter(
        (node) => node.type === "input" && node.nodeValue === ""
      );
      if (arr.length === 0) {
        //设置结果
        let len = this.importNodeList[0].children.length;
        for (let i = 0; i < row.expNodeList.length; i++) {
          let node = row.expNodeList[i];
          if (node.type === "result" && node.nodeKey === "") {
            len += 1;
            node.nodeKey = "result" + len;
            node.nodeValue = "result" + len;
            node.showStr = "结果:" + node.nodeValue;

            let importNode = {};
            importNode.key = node.nodeKey;
            importNode.title = node.nodeValue;
            this.importNodeList[0].children.push(importNode);
          }
        }
      }

      this.stepTreeData.splice(row.index, 1);
      this.stepTreeData.splice(row.index, 0, row);
      console.log("stepTreeData", this.stepTreeData);
    },
    deleteStep(e) {
      console.log("deleteStep", e);
    },
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
    // ...mapMutations("treeDrag", { onDrop: "TargetDragDop" }),
    ...mapMutations("treeDrag", { treeDragSelected: "AddSelectedNode" }),

    deleteMapNode(e) {
      console.log("deleteMapNode", e);
      e.mappingList.pop();
    },
    editRowData(row) {
      this.editRow = row;
      this.visible = true;
    },
    updateFieldEdit() {
      console.log("updateFieldEdit", this.rowEditPorperties);
      const editValue = this.rowEditPorperties.filter(
        (property) => property.value.length > 0
      );

      this.editRow.expressionList.push(editValue);
      console.log("treeData", this.treeData);
      this.visible = false;
    },
  },
};
</script>
<style scoped>
.customerTitle {
  padding: 0 10px;
  color: #1890ff;
}

.fs-12 {
  font-size: 12px;
}

.color-error {
  color: #f5222d;
}

.rowLine {
  position: relative;
  display: flex;
}

.editIcon {
  position: absolute;
  left: -25px;
}

.stepResult {
  color: #1890ff;
}
.expModel {
  display: flex;
}
</style>
