<template>
  <j-dropdown>
    <j-button>Press me</j-button>
    <template #menu>
      <j-menu list>
        <j-menu label="OS" icon="apps">
          <j-menu label="Windows" icon="logo-windows" />
          <j-menu label="Google" icon="logo-google" />
          <j-menu label="Linux" icon="logo-tux" />
          <j-menu label="Slack" icon="logo-slack" />
        </j-menu>
        <j-menu label="Human" icon="person">
          <j-menu label="Man" icon="male" />
          <j-menu label="Woman" icon="female" />
        </j-menu>
        <j-menu label="Transport" icon="list">
          <j-menu label="Bicycle" icon="bicycle" />
          <j-menu label="Bus" icon="bus" />
          <j-menu label="Car" icon="car" />
          <j-menu label="Boat" icon="boat" />
        </j-menu>
      </j-menu>
    </template>
  </j-dropdown>
</template>
