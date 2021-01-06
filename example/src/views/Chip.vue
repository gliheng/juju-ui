<template>
  <div>
    <h1>Chip</h1>
    <div>
      <section>
        <h2>Text chip</h2>
        <p>
          <j-chip>Primary</j-chip>
          <j-chip class="j-secondary">Secondary</j-chip>
        </p>
      </section>
      <section>
        <h2>Chip with icon</h2>
        <p>
          <j-chip icon="car">Car</j-chip>
          <j-chip class="j-info" icon="airplane">Plane</j-chip>
          <j-chip class="j-success" icon="bicycle">Bicycle</j-chip>
          <j-chip class="j-warning" icon="bus">Bus</j-chip>
        </p>
      </section>
      <section>
        <h2>Chip with close icon</h2>
        <p>
          <j-chip icon="car" closable>Car</j-chip>
          <j-chip class="j-info" icon="airplane" closable>Plane</j-chip>
          <j-chip class="j-success" icon="bicycle" closable>Bicycle</j-chip>
          <j-chip class="j-warning" icon="bus" closable>Bus</j-chip>
        </p>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
section :deep(.j-chip) {
  margin: 0 0.2rem;
}
</style>