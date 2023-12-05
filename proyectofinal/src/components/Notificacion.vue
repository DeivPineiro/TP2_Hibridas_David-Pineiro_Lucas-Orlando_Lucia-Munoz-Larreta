<template>
  <div v-if="show" class="notification" :class="typeClass">
    <p>{{ message }}</p>
  </div>
</template>
  
<script>
export default {
  props: {
    type: String,
    message: String,
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    typeClass() {
      return this.type ? `notification-${this.type}` : '';
    },
  },
};
</script>
  
<style scoped>
.notification {
  padding: 1em;
  margin: 1em 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.notification-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.notification-error {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}
</style>
  