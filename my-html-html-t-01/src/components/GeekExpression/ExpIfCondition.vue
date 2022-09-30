<template>
  <div class="expIfCondition">
    <div>
      <span>if(</span>
      <slot name="if">_if条件_</slot>
      <span>)then(</span>
      <slot name="then">_结果1_</slot>
      <span>) else (</span>
      <slot name="else">_结果2_</slot>
      <span>)</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpIfCondition",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
