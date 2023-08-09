<template>
  <div class="pps-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
name:'ppsCard'
}
</script>

<style scoped>
.pps-card {
  width: auto;
  height: fit-content;
  padding: 5px;
  border: 1px solid #e3e3e7;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.144);
  border-radius: 10px;
  background: #fff;
  padding-bottom: 10px;
  margin: 5px;
}
</style>