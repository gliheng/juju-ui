<template>
  <div>
    <h1>Dropdown</h1>
    <div>
      <section>
        <h2>Simple dropdown</h2>
        <j-dropdown>
          <j-dropdown-item name="normal">Normal</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="darken">Darken</j-dropdown-item>
          <j-dropdown-item name="multiply">Multiply</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="lighten">Lighten</j-dropdown-item>
          <j-dropdown-item name="screen">Screen</j-dropdown-item>
        </j-dropdown>
      </section>
      <section>
        <h2>Dropdown button</h2>
        <j-dropdown>
          <template #button>
            <j-button>Press me</j-button>
          </template>
          <j-dropdown-item name="normal">Normal</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="darken">Darken</j-dropdown-item>
          <j-dropdown-item name="multiply">Multiply</j-dropdown-item>
          <j-dropdown-seperator />
          <j-dropdown-item name="lighten">Lighten</j-dropdown-item>
          <j-dropdown-item name="screen">Screen</j-dropdown-item>
        </j-dropdown>
      </section>
      <section>
        <h2>Dropdown with icon</h2>
        <j-dropdown :with-icon="true">
          <j-dropdown-item name="bicycle" icon="bicycle">Bicycle</j-dropdown-item>
          <j-dropdown-item name="car" icon="car-sport">Car</j-dropdown-item>
          <j-dropdown-item name="bus" icon="bus">Bus</j-dropdown-item>
          <j-dropdown-item name="ship">Ship</j-dropdown-item>
        </j-dropdown>
      </section>
    </div>
  </div>
</template>