<template>
  <div class="min-h-screen bg-background">
    <!-- eslint-disable-next-line -->
    <router-view />
  </div>
</template>

<script setup>
// eslint-disable-next-line vue/no-setup-props-destructure
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style>
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #64748b;
  --accent: #10b981;
  --destructive: #ef4444;
  --muted: #f1f5f9;
  --border: #e2e8f0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background);
  color: var(--foreground);
}
</style>
