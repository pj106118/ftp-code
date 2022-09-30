<template>
  <a-tree
    :tree-data="artemisTree"
    :default-expand-all="true"
    draggable
    @drop="onDrop"
  >
  </a-tree>
</template>
<script>
const artemisTree = [
  {
    title: "header",
    key: "0-0",
    children: [
      {
        title: "userId",
        key: "0-0-1",
      },
    ],
  },
  {
    title: "body",
    key: "0-1",
    children: [
      {
        title: "orderSize",
        key: "0-1-1",
      },
    ],
  },
];

export default {
  data() {
    return { artemisTree };
  },
  methods: {
    // onSelect(keys, event) {
    //   console.log("Trigger Select", keys, event);
    // },
    onDrop(info) {
      const dropKey = info.node.eventKey;
      const dragKey = info.dragNode.eventKey;
      console.log(info);
      console.log(dropKey);
      console.log(dragKey);
    },
  },
};
</script>
