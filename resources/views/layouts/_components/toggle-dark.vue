<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
    <PrimeButton
        :label="isDark ? 'Light' : 'Dark'"
        :severity="'secondary'"
        @click="toggleDark()"
    />
</template>
