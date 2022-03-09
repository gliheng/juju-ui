<template>
  <j-dropdown trigger="hover">
    <j-button>Hover me</j-button>
    <template #menu>
      <j-menu list>
        <j-menu label="Windows" icon="logo-windows" />
        <j-menu label="Google" icon="logo-google" />
        <j-menu label="Linux" icon="logo-tux" />
        <j-menu label="Slack" icon="logo-slack" />
      </j-menu>
    </template>
  </j-dropdown>
</template>
