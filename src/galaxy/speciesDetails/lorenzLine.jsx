import React, { Component } from "react";

import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";

export default require("maco").template(lorenzLine, React);

function lorenzLine(props) {
  let lorenz = props.lorenz;
  let lorenzFormatted = [];

  lorenz.forEach((lorenzObj) => {
    lorenzFormatted.push([lorenzObj["x%"], lorenzObj["y%"]]);
  });
  var option = (option = {
    title: {
      text: "Lorez Curve",
      textStyle: {
        fontSize: 12,
      },
      bottom: "0%",
      left: "center",
    },
    grid: {
      x: "18%",
      y: "15%",
      x2: "15%",
      y2: "25%",
    },
    xAxis: {
      name: "100%",
      // nameTextStyle: {
      //   padding: [0, 0, 0, -40],
      // },
      nameRotate: -90,
    },
    yAxis: {
      name: "100%",
      nameTextStyle: {
        // padding: [0, 0, 0, 30],
      },
      // max: 100,
    },
    series: [
      {
        // symbolSize: 5,
        data: lorenzFormatted,
        type: "line",
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
