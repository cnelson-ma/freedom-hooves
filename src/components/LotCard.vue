<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        {{ lotName }}
      </div>
      <div class="card-amount">
        ${{ amount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LotCard',
  props: {
    lotName: {
      type: String,
      required: true,
      default: '',
    },
    amount: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style>
  .card-container {
    border-radius: 4px;
    width: 200px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-shadow: 1px 1px 4px 0px #888888;
  }
  .card-title {
    font-size: 20px;
    color: #6d6d6d;
  }
  .card-amount {
    font-size: 35px;
    position: relative;
    top: -30px;
  }
</style>
