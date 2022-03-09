<template>
  <div>
    <h1>Dropdown</h1>
    <div>
      <section>
        <h2>Dropdown</h2>
        <code-block :code="dropdownPartCode">
          <dropdown-part />
        </code-block>
      </section>
      <section>
        <h2>Trigger by hover</h2>
        <code-block :code="hoverDropdownPartCode">
          <hover-dropdown-part />
        </code-block>
      </section>
    </div>
  </div>
</template>

<script setup>
import DropdownPart from './parts/DropdownPart.vue';
import dropdownPartCode from './parts/DropdownPart.vue?raw';
import HoverDropdownPart from './parts/HoverDropdownPart.vue';
import hoverDropdownPartCode from './parts/HoverDropdownPart.vue?raw';
</script>