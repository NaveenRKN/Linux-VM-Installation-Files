import React, { useEffect, useRef, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";

const PieChart = (props) => {
  // console.clear(); 
  // let riskData = useSelector((state) => state);
  const pieChartRef = useRef();
  const [list, setList] = useState(props.riskList ? props.riskList : null)
  let { data, riskList, setFilterRiskDataFunction } = props
  let state = {

    series: data,
    options: {
      legend: {
        show: true
      },
      // fill: {
      //   type: 'gradient',
      // },
      chart: {
        id: "chart",
        zoom: {
          enabled: true
        },
        width: 700,
        type: 'donut',
        events: {
          // click: function (event, chartContext, config) {
          //   let chartName = ["WIP", "Open", "Occured", "Closed"];
          //   let filterList = filterData("status", chartName[config.dataPointIndex], null);

          // },
          Selection: function (event, chartContext, config) {
            console.log(event, chartContext, config, "select");
          },
          dataPointSelection: function (event, chartContext, config) {
            setFilterRiskDataFunction(config.dataPointIndex, config.w.config.chart.type)
            // setListData(filterList)
          }
        },
      },

      colors: ["#fb947a", "#be87f7", "#767777", "#0dba84"],
      labels: ["WIP", "open", "occured", "Closed"],
      responsive: [{
        breakpoint: 880,
        offsetX: 0,
        offsetY: 0,
        options: {
          chart: {
            width: 600
          },
          legend: {
            show: true
          }
        }
      }],

    },
  };
  return (
    <ReactApexChart ref={pieChartRef} options={state.options} series={state.series} type="donut" height={250} />
  )
}

export default PieChart;
