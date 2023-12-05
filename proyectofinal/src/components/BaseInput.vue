<template>
    <input
      class="px-2 rounded-md disabled:bg-slate-300 w-full p-4 leading-6 text-lg placeholder-gray-400 bg-white shadow-none border border-gray-300"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </template>
  
  
  

<script>
export default {

    name: 'BaseInput',
    props: ['modelValue'],
    emits: ['update:modelValue'],

}
</script>
<style></style>

