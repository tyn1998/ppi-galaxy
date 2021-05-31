import React from "react";
import detailModel from "./speciesDetailsStore.js";
import DegreesScatter from "./degreesScatter.jsx";
import LorenzLine from "./lorenzLine.jsx";
import Taxonomy from "./taxonomyView.jsx";
import ResilienceTable from "./resilienceTableView.jsx";

module.exports = require("maco")(speciesView, React);

function speciesView(x) {
  x.state = {
    visibility: "visible", // or 'hidden'
    speciesDetails: null,
  };

  function toggleVisibility() {
    x.setState({
      visibility: x.state.visibility == "visible" ? "hidden" : "visible",
    });
  }

  x.render = function () {
    // console.log("speciesView", x.state.speciesDetails);
    if (!x.state.speciesDetails) return null;
    let s = x.state.speciesDetails;
    return (
      <div>
        <button className="button-toggle" onClick={toggleVisibility}>
          {x.state.visibility == "visible" ? "隐" : "显"}
        </button>
        <div
          className="species-details"
          style={{ visibility: x.state.visibility }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-5">
                <span className="highlight">NCBI_Id:</span> {s.id}
              </div>
              <div className="col-xs-7 one-line">
                <span className="highlight">NCBI_Name:</span> {s.ncbiName}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-5">
                <span className="highlight">Evolution:</span> {s.evolution}
              </div>
              <div className="col-xs-7">
                <span className="highlight">Pub_Count:</span> {s.pubCount}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <ResilienceTable resilience={s.resilience} />
                <a target="_blank" href={`#/compare/${s.id}`}>See more details</a>
              </div>
            </div>
          </div>

          <div className="container-fluid taxonomy-box">
            <div className="row">
              <div className="col-xs-12">
                <Taxonomy
                  speciesId={s.id}
                  speciesName={s.ncbiName}
                  taxonomy={s.taxonomies}
                />
              </div>
            </div>
          </div>

          <div className="container-fluid number-box">
            <div className="row">
              <div className="col-xs-3">
                <h5 className="number">{s.nodesNum}</h5>
                <div className="small">Nodes_Num</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.edgesNum}</h5>
                <div className="small">Edges_Num</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.maximumDegree}</h5>
                <div className="small">Max_Degree</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.averageDegree}</h5>
                <div className="small">Avg_Degree</div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-3">
                <h5 className="number">{s.density}</h5>
                <div className="small">Density</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.edgeEntropy}</h5>
                <div className="small">Edge_Entropy</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.assortativeMixing}</h5>
                <div className="small">Assort_Mixing</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.bfsEffDiam}</h5>
                <div className="small">Bfs_EffDiam</div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-3">
                <h5 className="number">{s.clustCf}</h5>
                <div className="small">Clust_Cf</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.globalClustering}</h5>
                <div className="small">Global_Clust</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.giniCoefficient}</h5>
                <div className="small">Gini_Coeff</div>
              </div>
              <div className="col-xs-3">
                <h5 className="number">{s.starDensity2}</h5>
                <div className="small">Star_Density2</div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ height: "200px", display: "flex", alignItems: "center" }}
          >
            <div className="col-xs-6">
              <LorenzLine lorenz={s.lorenz} />
            </div>
            <div className="col-xs-6">
              <DegreesScatter degrees={s.degrees} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  x.componentDidMount = function () {
    detailModel
      .loadSpeciesDetails()
      .then((speciesDetails) => {
        x.setState({
          speciesDetails: speciesDetails,
        });
      })
      .catch((message) => {
        console.log(message);
        x.setState({
          speciesDetails: null,
        });
      });
  };
}
