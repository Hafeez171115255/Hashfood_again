<template>
  <p class="error-text">
    <i class="bx bxs-info-circle"></i>
    {{ title }}
  </p>
</template>

<script>
export default {
  props: ["title"],
};
</script>