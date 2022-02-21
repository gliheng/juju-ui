<template>
  <div>
    <h1>Table</h1>
    <section>
      <h2>Basic table</h2>
      <code-block :code="basicPartCode">
        <basic-part />
      </code-block>
    </section>
    <section>
      <h2>Bordered table</h2>
      <code-block :code="borderedPartCode">
        <bordered-part />
      </code-block>
    </section>
    <section>
      <h2>Selectable rows</h2>
      <code-block :code="selectablePartCode">
        <selectable-part />
      </code-block>
    </section>
    <section>
      <h2>Fixed header</h2>
      <code-block :code="fixedHeaderPartCode">
        <fixed-header-part />
      </code-block>
    </section>
    <section>
      <h2>Fixed columns</h2>
      <code-block :code="fixedColumnPartCode">
        <fixed-column-part />
      </code-block>
      <p>Fixed column table needs fixed-header</p>
    </section>
    <section>
      <h2>Row Grouping</h2>
      <code-block :code="rowGroupingPartCode">
        <row-grouping-part />
      </code-block>
      <p>Grouping allows arbitrary grouping of data</p>
    </section>
    <section>
      <h2>Column Grouping</h2>
      <code-block :code="colGroupingPartCode">
        <col-grouping-part />
      </code-block>
    </section>
    <section>
      <h2>Resizable</h2>
      <code-block :code="resizablePartCode">
        <resizable-part />
      </code-block>
    </section>
  </div>
</template>

<script>
// glob load all components
const modules = import.meta.globEager('./parts/*.vue')
const parts = Object.fromEntries(Object.entries(modules).map(([path, module]) => {
  let match = /\/parts\/(.*).vue$/.exec(path);
  if (!match) return null;
  return [match[1], module.default];
}).filter(item => Boolean(item)));


// Sadly glob import in vite does not support raw syntax
import basicPartCode from './parts/BasicPart.vue?raw';
import borderedPartCode from './parts/BorderedPart.vue?raw';
import selectablePartCode from './parts/SelectablePart.vue?raw';
import fixedHeaderPartCode from './parts/FixedHeaderPart.vue?raw';
import fixedColumnPartCode from './parts/FixedColumnPart.vue?raw';
import rowGroupingPartCode from './parts/RowGroupingPart.vue?raw';
import colGroupingPartCode from './parts/ColGroupingPart.vue?raw';
import resizablePartCode from './parts/ResizablePart.vue?raw';

export default {
  setup() {
    return {
      basicPartCode,
      borderedPartCode,
      selectablePartCode,
      fixedHeaderPartCode,
      fixedColumnPartCode,
      rowGroupingPartCode,
      colGroupingPartCode,
      resizablePartCode,
    };
  },
  components: {
    ...parts,
  },
}
</script>
