<template>
  <div id="testView3">
    <TxtTree id="txtTree" />
    <TargetDragTree id="receiptNoteTree" />
    <br />
  </div>
</template>

<script>
import TxtTree from "../components/TxtTree";
import TargetDragTree from "../components/TargetDragTree";
export default {
  name: "TestView3",
  data() {
    return {
      delimiter: "",
      suffix: "",
    };
  },
  components: {
    TxtTree,
    TargetDragTree,
  },
};
</script>

<style scoped>
#testView3 {
  position: relative;
}
#txtTree {
  width: 30%;
  float: left;
  margin-left: 5%;
}

#receiptNoteTree {
  width: 30%;
  float: left;
  margin-left: 5%;
}
</style>
