import React, { Component } from "react";

import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";

export default require("maco").template(entropiesLine, React);

function entropiesLine(props) {
  let entropies = props.entropies;

  if (!entropies) return null;

  var option = (option = {
    title: {
      text: "Modified Shannon Entopies under different node removal strategies",
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
    },
    xAxis: {
      type: 'category',
      name: "Removal Percentage",
      nameTextStyle: {
        padding: [0, 0, 0, -110],
      },
      nameRotate: -90,
    },
    yAxis: {
      name: "Modified Shannon Entropy",
      nameTextStyle: {
        padding: [0, 0, 0, 140],
      },
    },
    series: [
      {
        name: "random",
        symbolSize: 5,
        data: entropies.randomEntropies.slice(0, -1),
        type: "line",
      },
      {
        name: "betweenness",
        symbolSize: 5,
        data: entropies.betweennessEntropies.slice(0, -1),
        type: "line",
      },
      {
        name: "closeness",
        symbolSize: 5,
        data: entropies.closenessEntropies.slice(0, -1),
        type: "line",
      },
      {
        name: "degreecentrality",
        symbolSize: 5,
        data: entropies.degreecentralityEntropies.slice(0, -1),
        type: "line",
      },
    ],
  });
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      style={{ width: "100%", height: "400px" }}
    />
  );
}
