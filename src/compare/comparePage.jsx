import React from "react";
import ERScatter from "./evolutionResilienceScatter.jsx";
import EntropiesLine from "./entropiesLine.jsx";
import { getER, getEntropies } from "./compareStore.js";

module.exports = require("maco")(comparePage, React);

function comparePage(x) {
  x.state = {
    ER: null,
    entropies: null
  };

  x.render = function () {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>
          <span style={{ color: "#ff008c" }}>Compare</span>
        </h1>
        <ERScatter speciesId={x.props.params.name} er={x.state.ER} />
        <EntropiesLine entropies={x.state.entropies} />
      </div>
    );
  };

  x.componentDidMount = function () {
    getER()
      .then((ER) => {
        x.setState({
          ER: ER,
        });
      })
      .catch((message) => {
        console.log(message);
        x.setState({
          ER: null,
        });
      });

    getEntropies(x.props.params.name)
      .then((entropies) => {
        x.setState({
          entropies: entropies,
        });
      })
      .catch((message) => {
        console.log(message);
        x.setState({
          entropies: null,
        });
      });
  };
}
