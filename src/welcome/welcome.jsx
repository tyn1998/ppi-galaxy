import React from "react";
import Destination from "./destinationView.jsx";
import Tree from "./treeView.jsx";
import { destinationArr } from "./destination";

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
            border: "1px solid #ff008c",
          }}
        >
          {destinationArr.map((item) => {
            return (
              <Destination
                description={`Interactomes ${item.speciesID}`}
                href={`#/galaxy/${item.speciesID}?l=1`}
                media=""
                name={item.speciesID}
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
