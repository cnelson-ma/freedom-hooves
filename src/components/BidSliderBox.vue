<template>
  <div class="slider-box-container">
    <BidSlider v-for="slider in sliders" :fillColor="slider.fillColor" :initialWidth="slider.coloredWidth" :initialAmount="slider.amount"/>
  </div>
</template>

<script>
import BidSlider from './BidSlider'
  export default {
    name: "BidSliderBox",
    components: {
      BidSlider,
    },
    data () {
      return {
        sliders: [
          {
            fillColor: '00e7fc',
            coloredWidth: '60',
            amount: 6000,
          },
          {
            fillColor: 'ff0266',
            coloredWidth: '20',
            amount: 2000,
          },
          {
            fillColor: 'ffde03',
            coloredWidth: '50',
            amount: 5000,
          },
          {
            fillColor: '651fff',
            coloredWidth: '50',
            amount: 5000,
          },
          {
            fillColor: '546E7a',
            coloredWidth: '69',
            amount: 6900,
          },
          {
            fillColor: 'f9a825',
            coloredWidth: '30',
            amount: 3000,
          },
          {
            fillColor: '76ff03',
            coloredWidth: '70',
            amount: 7000,
          },
          {
            fillColor: '03a9f4',
            coloredWidth: '90',
            amount: 9000,
          },
        ]
      }
    }
  }
</script>

<style>
  .slider-box-container {
    margin-top: 200px;
  }
</style>
