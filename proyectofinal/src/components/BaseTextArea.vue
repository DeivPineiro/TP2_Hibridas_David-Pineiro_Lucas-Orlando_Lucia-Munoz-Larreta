<template>
    <textarea class="w-full block mb-2 p-2 border border-gray-800 rounded-lg" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>
<script>
export default {

    name: 'BaseTextArea',
    props: ['modelValue'],
    emits: ['update:modelValue'],

}
</script>
<style ></style>