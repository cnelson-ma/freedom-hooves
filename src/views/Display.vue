<template>
  <div class="display">
    <transition
      appear
      appear-class="custom-appear-class"
      appear-active-class="custom-appear-active-class"
    >
      <LotCardList />
    </transition>
  </div>
</template>

<script>
import LotCardList from '../components/LotCardList.vue';
// @ is an alias to /src

export default {
  name: 'display',
  components: {
    LotCardList,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
  .custom-appear-active-class {
    transition: opacity 1s ease;
  }
  .custom-appear-class {
    opacity: 0;
  }
</style>
