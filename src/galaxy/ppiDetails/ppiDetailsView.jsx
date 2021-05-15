import React from "react";
import detailModel from "./ppiDetailsStore.js";
import OrcaUnit from "./orcaUnit.jsx";

module.exports = require("maco")(detailedPpiView, React);

function detailedPpiView(x) {
  x.state = {
    ppiDetails: null,
  };

  x.render = function () {
    console.log(x);

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
      let orcaImagesEndpoint = "http://localhost:9090/images";
      return (
        <div>
          <div className="container-fluid orca-box">
            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/0.png`}
                orcaCount={orcaCounts[0]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/1.png`}
                orcaCount={orcaCounts[1]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/2.png`}
                orcaCount={orcaCounts[2]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/3.png`}
                orcaCount={orcaCounts[3]}
              />
            </div>

            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/4.png`}
                orcaCount={orcaCounts[4]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/5.png`}
                orcaCount={orcaCounts[5]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/6.png`}
                orcaCount={orcaCounts[6]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/7.png`}
                orcaCount={orcaCounts[7]}
              />
            </div>

            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/8.png`}
                orcaCount={orcaCounts[8]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/9.png`}
                orcaCount={orcaCounts[9]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/10.png`}
                orcaCount={orcaCounts[10]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/11.png`}
                orcaCount={orcaCounts[11]}
              />
            </div>

            <div className="row">
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/12.png`}
                orcaCount={orcaCounts[12]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/13.png`}
                orcaCount={orcaCounts[13]}
              />
              <OrcaUnit
                classStr="col-xs-3"
                imageSrc={`${orcaImagesEndpoint}/14.png`}
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
