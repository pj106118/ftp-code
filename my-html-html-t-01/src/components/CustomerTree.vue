<template>
  <div>
    <a-tree
      :tree-data="customerData"
      :default-expand-all="true"
      draggable
      @select="onSelect"
    >
    </a-tree>
  </div>
</template>
<script>
const customerData = [
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
        title: "inNum",
        key: "0-1-1",
      },
    ],
  },
];

export default {
  name: "CustomerTree",
  data() {
    return { customerData };
  },
  methods: {
    onSelect(keys, event) {
      console.log("Trigger Select", keys, event);
    },
    // onDrop(info) {
    //   const dropKey = info.node.eventKey;
    //   const dragKey = info.dragNode.eventKey;
    //   console.log("CustomerTree", info);

    //   console.log(dropKey);
    //   console.log(dragKey);
    // },
  },
};
</script>
