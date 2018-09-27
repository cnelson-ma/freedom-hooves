<template>
  <div class="bidding">
    <BiddingDashboard msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BiddingDashboard from '@/components/BiddingDashboard.vue';

export default {
  name: 'bidding',
  components: {
    BiddingDashboard,
  },
};
</script>
