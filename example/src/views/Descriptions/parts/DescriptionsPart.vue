<template>
  <j-descriptions :columns="2">
    <j-descriptions-item label="Name">Bill</j-descriptions-item>
    <j-descriptions-item label="Age">100</j-descriptions-item>
    <j-descriptions-item label="Job">Programmer</j-descriptions-item>
    <j-descriptions-item label="Country">China</j-descriptions-item>
    <j-descriptions-item>
      <template #label>
        Gender <j-icon name="male-female" />
      </template>
      <template #default>
        Male <j-icon name="man-outline" />
      </template>
    </j-descriptions-item>
  </j-descriptions>
</template>
