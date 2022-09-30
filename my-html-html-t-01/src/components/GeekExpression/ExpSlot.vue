<template>
  <div class="expSlot">
    <div class="showLine">
      <h4>当前字段：ownre_code</h4>
      <br />
      owner_code =
      <slot name="expSlotEntity">我是一些默认值</slot>
    </div>
    <div class="addLine">
      <a-button type="primary">
        固定值
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpSlot",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.expSlot {
  height: 300px;
  width: 80%;
  border-style: solid;
  border-width: 5px;
  display: flex;
}
.showLine {
  width: 50%;
  background-color: tomato;
}
.addLine {
  width: 50%;
  background-color: yellow;
}
</style>
