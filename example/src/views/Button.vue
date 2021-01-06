<template>
  <div>
    <h1>Button</h1>
    <section>
      <h2>Basic</h2>
      <div>
        <j-button>Button</j-button>
        <j-button disabled>Disabled</j-button>
      </div>
    </section>
    <section>
      <h2>Colors</h2>
      <div>
        <j-button class="j-primary">Primary</j-button>
        <j-button class="j-secondary">Secondary</j-button>
        <j-button class="j-success">Success</j-button>
        <j-button class="j-info">Info</j-button>
        <j-button class="j-warning">Warning</j-button>
        <j-button class="j-danger">Danger</j-button>
        <j-button class="j-help">Help</j-button>
      </div>
    </section>
    <section>
      <h2>Styles</h2>
      <div>
        <j-button outlined>Outlined</j-button>
        <j-button flat>Flat</j-button>
        <j-button raised>Raised</j-button>
        <j-button rounded>Rounded</j-button>
      </div>
    </section>
    <section>
      <h2>Size</h2>
      <div>
        <j-button size="sm">Small</j-button>
        <j-button>Normal</j-button>
        <j-button size="lg">Large</j-button>
      </div>
    </section>
    <section>
      <h2>Icon</h2>
      <div>
        <j-button class="j-primary" rounded icon="at-outline">hello</j-button>
        <j-button class="j-secondary" rounded icon="at-outline" iconPos="right">world</j-button>
        <j-button class="j-success" rounded icon="color-palette-outline"></j-button>
        <j-button class="j-info" rounded icon="beer-outline" />
        <j-button class="j-warning" rounded icon="barcode-outline" />
        <j-button class="j-danger" rounded icon="close-outline" />
        <j-button class="j-help" rounded icon="checkmark-outline" />
      </div>
    </section>
    <section>
      <h2>SplitButton</h2>
      <div>
        <j-split-button icon="add">
          Add
          <template #menu>
            <j-menu label="Edit" icon="create" />
            <j-menu label="Delete" icon="trash" />
            <j-menu label="Update" icon="swap-vertical" />
          </template>
        </j-split-button>
      </div>
    </section>
    <section>
      <h2>ToggleButton</h2>
      <div>
        <j-toggle-button on-icon="heart" off-icon="heart-dislike" v-model="toggleOn">
          <template #on>Like</template>
          <template #off>Dislike</template>
        </j-toggle-button>
      </div>
    </section>
    <section>
      <h2>ButtonGroup</h2>
      <div>
        <j-button-group>
          <j-button class="j-primary">Primary</j-button>
          <j-button class="j-secondary">Secondary</j-button>
          <j-button class="j-success">Success</j-button>
        </j-button-group>
      </div>
    </section>
    <section>
      <h2>ToggleButtonGroup</h2>
      <div>
        <j-toggle-button-group v-model="toggleGroupIndex">
          <j-toggle-button>Primary</j-toggle-button>
          <j-toggle-button>Secondary</j-toggle-button>
          <j-toggle-button>Success</j-toggle-button>
        </j-toggle-button-group>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let toggleOn = ref(false);
    let toggleGroupIndex = ref();
    return {
      toggleOn, toggleGroupIndex,
    };
  }
}
</script>

<style scoped>
:deep(.j-button) {
  margin: 0.2rem;
}
</style>