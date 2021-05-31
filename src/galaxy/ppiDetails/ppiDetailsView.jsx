import React from "react";
import detailModel from "./ppiDetailsStore.js";
import OrcaUnit from "./orcaUnit.jsx";

// 一次性import一整个目录下的.png，并通过map['xxx']来使用它们
const ctx = require.context("./images", false, /.*\.png$/);
let map = {};
ctx.keys().forEach(function(key, index){
  map[index] = ctx(key);
});

module.exports = require("maco")(detailedPpiView, React);

function detailedPpiView(x) {
  x.state = {
    ppiDetails: null,
  };

  x.render = function () {
    if (!x.state.ppiDetails) return null;
    var PpiDetails = getPpiDetails();

    return (
      <div className="ppi-details">
        <PpiDetails model={x.state.ppiDetails} />
      </div>
    );
  };

  x.componentDidMount = function () {
    detailModel.on("changed", updateView);
  };

  x.componentWillUnmount = function () {
    detailModel.off("changed", updateView);
  };

  function getPpiDetails() {
    return require("maco").template(template, React);

    function template(props) {
      let model = props.model;
      let orcaCounts = model.orca;
      return (
        <div>
          <div className="container-fluid orca-box">
            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[0]}
                orcaCount={orcaCounts[0]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[1]}
                orcaCount={orcaCounts[1]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[2]}
                orcaCount={orcaCounts[2]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[3]}
                orcaCount={orcaCounts[3]}
              />
            </div>

            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[4]}
                orcaCount={orcaCounts[4]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[5]}
                orcaCount={orcaCounts[5]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[6]}
                orcaCount={orcaCounts[6]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[7]}
                orcaCount={orcaCounts[7]}
              />
            </div>

            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[8]}
                orcaCount={orcaCounts[8]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[9]}
                orcaCount={orcaCounts[9]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[10]}
                orcaCount={orcaCounts[10]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[11]}
                orcaCount={orcaCounts[11]}
              />
            </div>

            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[12]}
                orcaCount={orcaCounts[12]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[13]}
                orcaCount={orcaCounts[13]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={map[14]}
                orcaCount={orcaCounts[14]}
              />
            </div>
          </div>

          <div className="container-fluid number-box">
            <div className="hidden-xs">
              <div className="raw">
                <div className="col-xs-4">
                  <h5 className="ppi-number">{model.betweenness}</h5>
                  <div className="small">betweenness</div>
                </div>
                <div className="col-xs-4">
                  <h5 className="ppi-number">{model.closeness}</h5>
                  <div className="small">closeness</div>
                </div>
                <div className="col-xs-4">
                  <h5 className="ppi-number">{model.clustering}</h5>
                  <div className="small">clustering</div>
                </div>
              </div>
              <div className="raw">
                <div className="col-xs-4">
                  <h5 className="ppi-number">{model.degreecentrality}</h5>
                  <div className="small">degreecentrality</div>
                </div>
                <div className="col-xs-4">
                  <h5 className="ppi-number">{model.curvature}</h5>
                  <div className="small">curvature</div>
                </div>
              </div>
            </div>

            <div className="visible-xs-block">
              <div className="row info-block">
                <div className="col-xs-6 no-overflow">
                  <h5>{model.name}</h5>
                </div>
                <div id={model.id} className="in-degree col-xs-3">
                  {model.inDegree}
                </div>
                <div id={model.id} className="out-degree col-xs-3">
                  {model.outDegree}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function updateView() {
    detailModel
      .loadPpiDetails()
      .then((ppiDetails) => {
        x.setState({
          ppiDetails: ppiDetails,
        });
        // x.forceUpdate();
      })
      .catch((message) => {
        console.log(message);
        x.setState({
          ppiDetails: null,
        });
      });
  }
}
