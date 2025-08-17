import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Deferred',
    props: {
        data: {
            type: [String, Array<String>],
            default: null,
        },
        group: {
            type: [String],
            default: 'default',
        },
    },
    render() {
        let keys: string[] = []
        if (this.$props.data) {
            keys = (Array.isArray(this.$props.data) ? this.$props.data : [this.$props.data]) as string[]
        } else {
            keys = this.$page.props.deferred
        }

        if (!this.$slots.fallback) {
            throw new Error('`<Deferred>` requires a `<template #fallback>` slot')
        }
        return keys.every((key) => this.$page.props[key] !== undefined) ? this.$slots.default() : this.$slots.fallback()
    },
})
