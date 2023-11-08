import React from 'react'
import ReactApexChart from 'react-apexcharts';

export const StackedBarChart = (props) => {
  const { data, setFilterRiskDataFunction } = props;
  // console.log(data,"dta")
  const state = {

    series: [{
      name: "High",
      data: data.highRiskData,
      color: '#f92d49'
    },
    {
      name: 'Medium',
      data: data.mediumRiskData,
      color: '#f9cd13'
    },
    {
      name: 'Low',
      data: data.lowRiskData,
      color: '#11b684'
    }],
    options: {
      chart: {
        type: 'bar',
        height: 450,
        stacked: true,
        toolbar: {
          show: false
        },
        events: {

          Selection: function (event, chartContext, config) {
            console.log(event, chartContext, config, "select");
          },
          dataPointSelection: function (event, chartContext, config) {
            console.log(config.dataPointIndex)
            console.log(config.selectedDataPoints)
            let a = config.selectedDataPoints;
            let keyValue = 0
            a.forEach(function (value, key) {
              keyValue = key
            });
            setFilterRiskDataFunction(config.dataPointIndex, config.w.config.chart.type, keyValue)
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      color: [],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        // colors: ['#fff']
      },
      title: {
        text: ''
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: ["Operational",
          "Compliance",
          "Business",
          "External",
          "Information Security",
          "Management Risk",
          "Privacy",
          "Privact HIPAA",
          "Resource",
          "Technical"
        ],
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      fill: {
        opacity: 1
      },
    },
  };
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  )
}
