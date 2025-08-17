<script setup lang="ts">
import { DeferredComponent, ToggleDark } from './_components'
</script>

<template>
    <DeferredComponent>
        <template #fallback>
            {{ 'Loading...' }}
        </template>
        <div class="container mx-auto">
            {{ 'views/layouts/app.vue' }}
            <ToggleDark />
            <slot />
        </div>
    </DeferredComponent>
</template>
