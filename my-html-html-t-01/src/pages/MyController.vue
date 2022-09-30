<template>
  <div>
    <div id="customerTree">
      <CustomerTree />
    </div>
    <div id="artemisTree">
      <ArtemisTree />
    </div>
  </div>
</template>

<script>
import CustomerTree from "../components/CustomerTree";
import ArtemisTree from "../components/ArtemisTree";

export default {
  name: "Mycontroller",
  components: {
    CustomerTree,
    ArtemisTree,
  },
};
</script>

<style>
#customerTree {
  width: 50%;
  float: left;
}

#artemisTree {
  width: 50%;
  float: left;
}
</style>
