//求和相关的配置
export default {
  namespaced: true,
  actions: {},
  mutations: {
    ExpSetOrigTreeData(state, value) {
      state.expOrigTreeData = value;
    },
    ExpSetTargetTreeData(state, value) {
      state.expTargetTreeData = value;
    },
    ExpDragStart(state, value) {
      state.expStep = value;
    },
    ExpImportDragStart(state, value) {
      state.importName = value.node.title;
      state.importKey = value.node.eventKey;
    },
    ExpSetStepTreeData(state, value) {
      state.stepTreeData = value;
      console.log("ExpSetStepTreeData", value);
    },
    ExpSetEditRow(state, value) {
      state.expEditRow = value;
      //JSON.parse(JSON.stringify(this.expStep));
      state.stepTreeData = JSON.parse(JSON.stringify(value.expressionStepList));
    },

    ExpCleanInputTreeData(state) {
      state.importNodeList[0].children = [];
    },
    AddSelectedNode(state, value) {
      console.log("mutations中的AddSelectedNode被调用了");
      console.log("目标的", value);
    },
    OrigDragStart(state, value) {
      console.log("OrigDragStart", value);
      state.fromNodeKey = value.key;
      state.fromNodeTitle = value.fieldName;
    },
  },
  state: {
    expOrigTreeData: [],
    expTargetTreeData: [],
    expEditRow: {},
    stepTreeData: [],
    expStep: {},
    //origTree
    fromNodeKey: "",
    fromNodeTitle: "",
    //表达式
    importName: "",
    importKey: "",
    //输入项的集合
    importNodeList: [
      {
        title: "输入项",
        key: "0",
        children: [],
      },
    ],
    selectedNode: {},
  },
  getters: {
    editRow(state) {
      return state.expEditRow;
    },
    currentStepList(state) {
      return state.stepTreeData;
    },
  },
};
