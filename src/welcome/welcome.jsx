import React from "react";
import Destination from "./destinationView.jsx";
import Tree from "./treeView.jsx";
import { destinationArr } from "./destination";

// 一次性import一整个目录下的.png，并通过map['xxx']来使用它们
const ctx = require.context("./previewImages", false, /.*\.png$/);
let map = {};
ctx.keys().forEach(function(key, index){
  let id = key.slice(key.indexOf('/')+1, key.indexOf('.png'))
  map[id] = ctx(key);
});

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div
        className="container"
        style={{ top: 0, left: 0, width: "100%", position: "absolute" }}
      >
        <h1 style={{ textAlign: "center" }}>
          Welcome to the PPI <span style={{ color: "#ff008c" }}>Galaxy</span> !
        </h1>
        <div
          className="media-list row"
          style={{
            marginTop: "100px",
            marginLeft: "100px",
            marginRight: "100px",
            padding: "10px",
            border: "1px solid #ff008c",
          }}
        >
          {destinationArr.map((item) => {
            return (
              <Destination
                description={`[${item.speciesID}] ${item.ncibName}.`}
                href={`#/galaxy/${item.speciesID}?l=1`}
                imgUrl={map[item.speciesID]}
                name={item.chineseName}
              />
            );
          })}
        </div>
        <div className="row">
          <Tree />
        </div>
      </div>
    );
  }
}
