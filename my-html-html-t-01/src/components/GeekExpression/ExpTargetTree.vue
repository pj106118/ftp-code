<template>
  <div>
    <a-card title="Target Field" bordered class="mappingCard">
      <div class="card-box">
        <a-tree :tree-data="treeData" show-icon draggable default-expand-all>
          <template slot="replace" slot-scope="row">
            <div class="rowLine">
              <a-icon
                v-show="row.selected"
                type="edit"
                theme="filled"
                style="padding-right:10px;"
                @click="editRowData(row)"
                class="editIcon"
              />
              <span
                @drop="onDrop(row)"
                :style="{
                  color: row.expressionStepList.length > 0 ? 'red' : '',
                }"
              >
                {{ row.fieldName }}</span
              >

              <span
                v-for="p of row.mappingList"
                :key="p.fromNodeKey"
                class="customerTitle"
                >{{ p.fromNodeTitle }}</span
              >
              <a-icon
                @click="deleteMapNode(row)"
                v-show="row.selected & (row.mappingList.length > 0)"
                type="close"
                class="fs-12 color-error"
              />
            </div>
          </template>
        </a-tree>
      </div>
    </a-card>
    <a-modal
      class="card-box"
      width="80%"
      title="编辑字段"
      v-if="visible"
      v-model="visible"
      @ok="updateFieldEdit"
      @cancel="expCleanInputTreeData"
    >
      <GeekExpression :fieldName="fieldName" />
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import GeekExpression from "./ExpGeekExpression";

export default {
  name: "ExpTargetTree",
  data() {
    return {
      fieldName: "",
      visible: false,
    };
  },
  components: {
    GeekExpression,
  },
  computed: {
    ...mapState("expDrag", ["fromNodeKey", "fromNodeTitle"]),
    ...mapState("expDrag", ["importNodeList", "stepTreeData"]),
    ...mapGetters("expDrag", ["editRow", "currentStepList"]),
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
    ...mapMutations("treeDrag", { treeDragSelected: "AddSelectedNode" }),
    ...mapMutations("expDrag", { expSetStepTreeData: "ExpSetStepTreeData" }),
    ...mapMutations("expDrag", {
      expCleanInputTreeData: "ExpCleanInputTreeData",
    }),
    ...mapMutations("expDrag", {
      expSetEditRow: "ExpSetEditRow",
    }),

    onDrop(node) {
      console.log("onDrop", node);
      let newMap = {
        fromNodeKey: this.fromNodeKey,
        fromNodeTitle: this.fromNodeTitle,
      };
      node.mappingList.push(newMap);
    },

    deleteMapNode(e) {
      console.log("deleteMapNode", e);
      e.mappingList.pop();
    },
    editRowData(row) {
      console.log("editRowData", row);
      this.visible = true;
      this.fieldName = row.fieldName;
      let expList = row.expressionStepList;
      this.expSetEditRow(row);
      let mapList = row.mappingList;
      for (let i = 0; i < mapList.length; i++) {
        let inputNode = mapList[i];
        let importNode = {};
        importNode.key = inputNode.fromNodeKey;
        importNode.title = inputNode.fromNodeTitle;
        this.importNodeList[0].children.push(importNode);
      }

      for (let i = 0; i < expList.length; i++) {
        let exp = expList[i];
        let noteList = exp.expNodeList;
        for (let j = 0; j < noteList.length; j++) {
          let note = noteList[j];
          if (note.type === "result") {
            let expNode = {};
            expNode.key = note.nodeKey;
            expNode.title = note.nodeValue;
            this.importNodeList[0].children.push(expNode);
          }
        }
      }
    },
    updateFieldEdit() {
      let stepList = JSON.parse(JSON.stringify(this.currentStepList));
      console.log("stepList", stepList);
      let len = this.editRow.expressionStepList.length;
      for (let i = 0; i < len; i++) {
        this.editRow.expressionStepList.pop();
      }

      let len2 = this.stepTreeData.length;
      if (len2 > 0) {
        let lastStep = this.stepTreeData[len2 - 1];
        var arr = lastStep.expNodeList.filter(
          (node) => node.type === "result" && node.nodeValue === ""
        );

        if (arr.length != 0 || lastStep.expName === "") {
          stepList.pop();
        }
      }

      for (let i = 0; i < stepList.length; i++) {
        this.editRow.expressionStepList.push(stepList[i]);
      }
      this.expCleanInputTreeData();
      this.visible = false;
    },
  },
  props: ["treeData"],
};
</script>
<style scoped>
.customerTitle {
  padding: 0 10px;
  color: #1890ff;
}

.mappingCard {
  overflow-y: auto;
  height: 500px;
}
/* .card-box {
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
} */
.fs-12 {
  font-size: 12px;
}

.color-error {
  color: #f5222d;
}

.rowLine {
  position: relative;
}

.editIcon {
  position: absolute;
  left: -25px;
}
</style>
