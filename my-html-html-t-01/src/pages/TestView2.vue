<template>
  <div>
    <CustomerTree id="customerTree" />
    <TestTree2 id="testTree2" />
  </div>
</template>

<script>
import CustomerTree from "../components/CustomerTree";
import TestTree2 from "../components/TestTree2";

export default {
  name: "TestView2",
  components: {
    TestTree2,
    CustomerTree,
  },
};
</script>

<style>
#customerTree {
  width: 50%;
  float: left;
}

#testTree2 {
  width: 50%;
  float: left;
}
</style>
