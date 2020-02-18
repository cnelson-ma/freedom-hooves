<template>
  <div class="slider-container">
    <div class="slider-bar">
      <div
        class="color-fill"
        v-bind:style="{ backgroundColor: '#' + fillColor, width: coloredWidth + '%' }"
      >
        <div class="slide-marker">
          <div class="amount-label">${{ amount }}</div>
        </div>
      </div>
      <div class="no-fill">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BidSlider',
  props: {
    fillColor: {
      type: String,
      default: '00e7fc',
    },
    initialWidth: {
      type: String,
      default: '0',
    },
    initialAmount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      amount: this.initialAmount,
      coloredWidth: this.initialWidth,
    };
  },
};
</script>

<style>
  .slider-container {
    margin-top: 50px;
    width: auto;
    display: flex;
    justify-content: center;
  }
  .slider-bar {
    width: 60%;
    height: 12px;
    background-color: #c4c4c4;
  }
  .color-fill {
    position: relative;
    height: inherit;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .no-fill {
    width: auto;
    background-color: transparent;
    height: inherit;
  }
  .slide-marker-container {
    width: auto;
    height: auto;
    padding-bottom: 22px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .slide-marker {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    height: 22px;
    width: 9px;
    background-color: #ffffff;
    border: 1px solid grey;
    border-radius: 3px;
    z-index: 10;
  }
  .amount-label {
    position: absolute;
    top: -23px;
  }
  .custom-appear-active-class {
    transition: width 2s ease;
  }
  .custom-appear-class {
    width: 0;
  }
</style>
