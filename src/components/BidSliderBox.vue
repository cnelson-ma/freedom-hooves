<template>
  <div class="slider-box-container">
    <BidSlider
      v-for="slider in sliders"
      :fillColor="slider.fillColor"
      :initialWidth="slider.coloredWidth"
      :initialAmount="slider.amount"
      :key="slider.i"
    />
  </div>
</template>

<script>
import BidSlider from './BidSlider.vue';

export default {
  name: 'BidSliderBox',
  components: {
    BidSlider,
  },
  data() {
    return {
      sliders: [
        {
          i: 1,
          fillColor: '00e7fc',
          coloredWidth: '60',
          amount: 6000,
        },
        {
          i: 2,
          fillColor: 'ff0266',
          coloredWidth: '20',
          amount: 2000,
        },
        {
          i: 3,
          fillColor: 'ffde03',
          coloredWidth: '50',
          amount: 5000,
        },
        {
          i: 4,
          fillColor: '651fff',
          coloredWidth: '50',
          amount: 5000,
        },
        {
          i: 5,
          fillColor: '546E7a',
          coloredWidth: '69',
          amount: 6900,
        },
        {
          i: 6,
          fillColor: 'f9a825',
          coloredWidth: '30',
          amount: 3000,
        },
        {
          i: 7,
          fillColor: '76ff03',
          coloredWidth: '70',
          amount: 7000,
        },
        {
          i: 8,
          fillColor: '03a9f4',
          coloredWidth: '90',
          amount: 9000,
        },
      ],
    };
  },
};
</script>

<style>
  .slider-box-container {
    margin-top: 200px;
  }
</style>
