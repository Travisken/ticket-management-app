<template>
  <div class="fixed bottom-6 right-6 z-50">
    <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div class="text-sm font-semibold text-gray-700 mb-2">Framework:</div>
      <div class="flex gap-2">
        <a
          href="/react"
          class="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          React
        </a>
        <!-- Active state for Vue -->
        <span class="px-3 py-1.5 text-sm rounded bg-blue-600 text-white">
          Vue.js
        </span>
        <a
          href="/twig"
          class="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          Twig
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
