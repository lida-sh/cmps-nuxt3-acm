<template>
    <div id="chart" class="w-full h-96">
        
    </div>
    
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
onMounted(()=>{
//    var chartDom = document.getElementById("chart")!;
// var myChart = echarts.init(chartDom);

// // Draw the chart
// myChart.setOption({
//   title: {
//     text: 'ECharts Getting Started Example'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: 'sales',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// });
type EChartsOption = echarts.EChartsOption;

let chartDom = document.getElementById('chart')!;
let myChart = echarts.init(chartDom);
let option: EChartsOption;

option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

option && myChart.setOption(option);
})




</script>

<style scoped>

</style>