import React, { Component } from "react";
import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";
import {treeJson} from './tree.js';

export default require("maco").template(tree, React);

function tree(props) {
  function onClick(e) {
    console.log(e);
    window.open(`#/galaxy/${e.name}?l=1`, '_blank');
  }

  let events = {
    'dblclick': onClick
  }

  let option = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    series: [
      {
        type: "tree",
        /* orient: "TB", */
        /* layout: "radial", */
        data: [treeJson],

        top: "1%",
        left: "7%",
        bottom: "5%",
        right: "20%",

        symbolSize: 7,

        label: {
          position: "left",
          verticalAlign: "middle",
          align: "right",
          fontSize: 14,
          color: 'white'
        },

        leaves: {
          label: {
            position: "right",
            verticalAlign: "middle",
            align: "left",
            /* rotate: -90 */
          },
        },

        emphasis: {
          focus: "descendant",
        },
        /* initialTreeDepth: 4, */
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      style={{ width: "100%", height: "1500px" }}
      onEvents={events}
    />
  );
}
