<template>
  <div class="display">
    <LeaderBoard/>
  </div>
</template>

<script>
// @ is an alias to /src
import LeaderBoard from '@/components/LeaderBoard.vue';

export default {
  name: 'display',
  components: {
    LeaderBoard,
  },
};
</script>
