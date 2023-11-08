import React from 'react'
import ReactApexChart from 'react-apexcharts';

export const Barchart = (props) => {
  const { data, setFilterRiskDataFunction } = props;
  const state = {

    series: [{
      data: data
    }],
    options: {
      chart: {
        type: 'bar',
        height: 450,
        toolbar: {
          show: false
        },
        events: {
          Selection: function (event, chartContext, config) {
            console.log(event, chartContext, config, "select");
          },
          dataPointSelection: function (event, chartContext, config) {
            console.log(config)
            setFilterRiskDataFunction(config.dataPointIndex, config.w.config.chart.type + 'Chart')
          }
        },
      },
      title: {
        text: ""
      },
      legend: {
        show: false
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7'],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
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
      }
    },


  };
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  )
}
