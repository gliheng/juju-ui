<template>
  <div>
    <h1>InputGroup</h1>
    <div>
      <h2>Basic InputGroup</h2>
      <div>
        <j-input-group>
          <template #right>
            <j-button>Search</j-button>
          </template>
        </j-input-group>
      </div>

      <h2>Multiple Addons</h2>
      <div>
        <j-input-group>
          <template #left>
            <j-button class="j-success" icon="extension-puzzle" />
            <j-button class="j-warning" icon="beer-outline" />
          </template>
          <template #right>
            <j-button>Search</j-button>
          </template>
        </j-input-group>
      </div>
    </div>
  </div>
</template>