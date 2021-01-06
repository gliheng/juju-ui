<template>
  <div>
    <h1>ProgressBar</h1>
    <section>
      <j-progress class="j-info" :value="30" />
      <j-progress class="j-warning" :value="50" />
      <j-progress class="j-danger" :value="70" />
    </section>
    <section>
      <h2>Striped</h2>
      <j-progress class="j-info" striped :value="30" />
      <j-progress class="j-warning" striped :value="50" />
      <j-progress class="j-danger" striped :value="70" />
    </section>
    <section>
      <h2>Indeterminate</h2>
      <j-progress class="j-info" indeterminate />
      <j-progress class="j-warning" indeterminate />
      <j-progress class="j-danger" striped indeterminate />
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
section :deep(.j-progress) {
  margin: 10px 0;
}
</style>
