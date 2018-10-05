<template>
  <div class="bidding">
    <BiddingDashboard/>
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
