import React, { Component } from "react";

import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";

export default require("maco").template(degreesScatter, React);

function degreesScatter(props) {
  let degrees = props.degrees;
  let degreesFormatted = [];

  degrees.forEach((degreeObj) => {
    degreesFormatted.push([degreeObj["degree"], degreeObj["count"]]);
  });
  var option = (option = {
    title: {
      text: "Degree Distribution",
      textStyle: {
        fontSize: 12,
      },
      bottom: "0%",
      left: "center",
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 20,
      },
    ],
    grid: {
      x: "17%",
      y: "15%",
      x2: "15%",
      y2: "25%",
    },
    xAxis: {
      name: "Degree",
      nameTextStyle: {
        padding: [0, 0, 0, -40],
      },
      nameRotate: -90,
    },
    yAxis: {
      name: "Number Of Nodes",
      nameTextStyle: {
        padding: [0, 0, 0, 90],
      },
      // max: 100,
    },
    series: [
      {
        symbolSize: 5,
        data: degreesFormatted,
        type: "scatter",
      },
    ],
  });
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      style={{ width: "180px", height: "200px" }}
    />
  );
}
