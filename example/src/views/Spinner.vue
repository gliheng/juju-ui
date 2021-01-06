<template>
  <div>
    <h1>Spinner</h1>
    <section>
      <h2>Size</h2>
      <div>
        <j-spinner size="sm" />
        <j-spinner size="md" />
        <j-spinner size="lg" />
      </div>
    </section>
    <section>
      <h2>Button</h2>
      <div>
        <j-button><j-spinner /></j-button>
        <j-button><j-spinner />&nbsp;Loading</j-button>
        <j-button disabled><j-spinner />&nbsp;Loading</j-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
:deep(.j-button) {
  margin: 0.2rem;
}
</style>