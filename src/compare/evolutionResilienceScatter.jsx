import React, { Component } from "react";

import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";

export default require("maco").template(ERScatter, React);

function ERScatter(props) {
  let speciesId = props.speciesId;
  let er = props.er;

  if (!er) return null;

  Object.keys(er).forEach((key) => {
    er[key].forEach((dataUnit, index) => {
      if (dataUnit[2] == speciesId) {
        er[key][index] = {
          value: dataUnit,
          itemStyle: {
            color: "#ff0000",
            borderColor: "#ff0000",
            borderWidth: 5,
            opacity: 1
          },
        };
      }
    });
  });

  function onDblClick(e) {
    console.log(e);
    window.open(`#/galaxy/${e.data[2]}?l=1`, "_blank");
  }

  function onClick(e) {
    console.log(e);
    window.open(`#/compare/${e.data[2]}?l=1`, "_blank");
  }

  let events = {
    dblclick: onDblClick,
    // 'click': onClick,
  };

  var option = (option = {
    title: {
      text: "Evolution & Resilience",
      textStyle: {
        fontSize: 12,
      },
      bottom: "0%",
      left: "center",
    },
    legend: {
      show: true,
    },
    tooltip: {
      position: "top",
      formatter(params) {
        if (!params.data.value) {
          return `
            NCBI ID: ${params.data[2]}<br/>
            Evolution: ${params.data[0].toFixed(4)}<br/>
            Resilience: ${params.data[1].toFixed(4)}
            `;
        } else {
          return `
            NCBI ID: ${params.data.value[2]}<br/>
            Evolution: ${params.data.value[0].toFixed(4)}<br/>
            Resilience: ${params.data.value[1].toFixed(4)}
            `;
        }
      },
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
      },
      {
        type: "inside",
        yAxisIndex: [0],
      },
    ],
    xAxis: {
      name: "Evolution",
      nameTextStyle: {
        padding: [0, 0, 0, -50],
      },
      nameRotate: -90,
    },
    yAxis: {
      name: "Resilience",
      nameTextStyle: {
        padding: [0, 0, 0, 60],
      },
    },
    series: [
      {
        name: "Archaea",
        symbolSize: 5,
        data: er.Archaea,
        type: "scatter",
        encode: {
          tooltip: [0, 1, 2],
        },
      },
      {
        name: "Bacteria",
        symbolSize: 5,
        data: er.Bacteria,
        type: "scatter",
        encode: {
          tooltip: [0, 1, 2],
        },
      },
      {
        name: "Eukaryota",
        symbolSize: 5,
        data: er.Eukaryota,
        type: "scatter",
        encode: {
          tooltip: [0, 1, 2],
        },
      },
    ],
  });
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      style={{ width: "100%", height: "400px" }}
      onEvents={events}
    />
  );
}
