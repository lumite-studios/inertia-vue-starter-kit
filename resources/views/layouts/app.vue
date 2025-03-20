<script setup lang="ts">
import { ToggleDark } from './_components'
</script>

<template>
    <div class="container mx-auto">
        {{ 'views/layouts/app.vue' }}
        <ToggleDark />
        <slot />
    </div>
</template>
