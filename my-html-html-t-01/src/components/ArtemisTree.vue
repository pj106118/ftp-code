<template>
  <div>
    <a-tree
      :tree-data="artemisData"
      :default-expand-all="true"
      draggable
      @drop="onDrop"
    >
    </a-tree>
  </div>
</template>
<script>
const artemisData = [
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
        title: "outOrderCode",
        key: "0-1-1",
      },
    ],
  },
];

export default {
  name: "ArtemisTree",
  data() {
    return { artemisData };
  },
  methods: {
    // onSelect(keys, event) {
    //   console.log("Trigger Select", keys, event);
    // },
    onDrop(info) {
      console.log("ArtemisTree", info);
      const dragKey = info.node.eventKey;
      console.log("ArtemisTree dragKey", dragKey);
      const title = info.node.title;
      console.log("ArtemisTree title", title);
    },
  },
};
</script>
