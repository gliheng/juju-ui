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

<script setup>
import BasicPart from './parts/BasicPart.vue';
import basicPartCode from './parts/BasicPart.vue?raw';
import BorderedPart from './parts/BorderedPart.vue';
import borderedPartCode from './parts/BorderedPart.vue?raw';
import SelectablePart from './parts/SelectablePart.vue';
import selectablePartCode from './parts/SelectablePart.vue?raw';
import FixedHeaderPart from './parts/FixedHeaderPart.vue';
import fixedHeaderPartCode from './parts/FixedHeaderPart.vue?raw';
import FixedColumnPart from './parts/FixedColumnPart.vue';
import fixedColumnPartCode from './parts/FixedColumnPart.vue?raw';
import RowGroupingPart from './parts/RowGroupingPart.vue';
import rowGroupingPartCode from './parts/RowGroupingPart.vue?raw';
import ColGroupingPart from './parts/ColGroupingPart.vue';
import colGroupingPartCode from './parts/ColGroupingPart.vue?raw';
import ResizablePart from './parts/ResizablePart.vue';
import resizablePartCode from './parts/ResizablePart.vue?raw';
</script>
