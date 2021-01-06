<template>
  <div>
    <h1>SvgIcon</h1>
    <section>
      <h2>Built-in Icons</h2>
      <div>
        <p>
          <j-svg-icon name="accessibility-outline" size="sm" />
          <j-svg-icon name="accessibility-outline" size="md" />
          <j-svg-icon name="accessibility-outline" size="lg" />
        </p>
        Icons are provided by <a href="https://ionicons.com/" target="_blank">ionicons</a>
      </div>
    </section>
    <section>
      <h2>Custom Icons using svg prop</h2>
      <p>
        <j-svg-icon svg='<rect x="0" y="0" width="512" height="512" rx="100" />' />
      </p>
    </section>
    <section>
      <h2>Using alt props to provide hover icon</h2>
      <p>
        <j-svg-icon svg='<rect x="0" y="0" width="512" height="512" rx="100" />'
          alt='<circle cx="256" cy="256" r="256" />' size="lg" />
        <j-svg-icon name="accessibility-outline" alt="accessibility" size="lg" />
      </p>
    </section>
  </div>
</template>

<style scoped>
section :deep(svg) {
  color: rgb(238, 23, 123);
}
</style>