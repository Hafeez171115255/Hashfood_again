<template>
  <div class="loader_center flex-column">
    <i :style="`font-size: ${width}px`" class="bx bx-sad"></i>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "width"],
};
</script>