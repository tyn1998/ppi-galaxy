import scene from "../store/scene.js";
import eventify from "ngraph.events";
import config from "../../config.js";
import request from "../service/request.js";
import Promise from "bluebird";

export default speciesDetailsStore();

function speciesDetailsStore() {
  var api = {
    loadSpeciesDetails: loadSpeciesDetails,
  };

  eventify(api);
  return api;

  function loadSpeciesDetails() {
    return new Promise((resolve, reject) => {
      let speciesDetailsUrl = `${
        config.dataUrl
      }${scene.getGraphName()}/${scene.getGraphName()}.json`;

      request(speciesDetailsUrl, {
        responseType: "json",
      })
        .then(beautify)
        .then(resolve)
        .catch(reject);
    });
  }
  function beautify(speciesDetails) {
    return new Promise((resolve, reject) => {
      speciesDetails["assortativeMixing"] =
        speciesDetails["assortativeMixing"].toFixed(4);
      speciesDetails["averageDegree"] =
        speciesDetails["averageDegree"].toFixed(4);
      speciesDetails["bfsEffDiam"] = speciesDetails["bfsEffDiam"].toFixed(4);
      speciesDetails["clustCf"] = speciesDetails["clustCf"].toFixed(4);
      speciesDetails["density"] = speciesDetails["density"].toFixed(4);
      speciesDetails["edgeEntropy"] = speciesDetails["edgeEntropy"].toFixed(4);
      if (speciesDetails["evolution"]) {
        // 不是每个物种都有evolution数据
        speciesDetails["evolution"] = speciesDetails["evolution"].toFixed(4);
      } else {
        speciesDetails["evolution"] = '未提供';
      }
      speciesDetails["giniCoefficient"] = speciesDetails["giniCoefficient"].toFixed(4);
      speciesDetails["globalClustering"] = speciesDetails["globalClustering"].toFixed(4);
      speciesDetails["starDensity2"] = speciesDetails["starDensity2"].toFixed(6);
      resolve(speciesDetails);
    });
  }
}
