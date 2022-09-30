<template>
  <div id="testGeekExpression">
    <h1>表达式添加</h1>
    <GeekExpression id="geekExpression"></GeekExpression>

    <br />
  </div>
</template>

<script>
import GeekExpression from "../components/GeekExpression.vue";
export default {
  name: "TestGeekExpression",
  data() {
    return {};
  },
  components: {
    GeekExpression,
  },
};
</script>

<style scoped>
/* #geekExpression {
  height: 200px;
  width: 200px;
  background-color: #1890ff;
  margin: 0 auto;
} */
</style>
