import config from "../config.js";
import request from "../galaxy/service/request.js";
import Promise from "bluebird";

export {getER, getEntropies};

function getER() {
  return new Promise((resolve, reject) => {
    let ERUrl = `${config.dataUrl}overview/evoResi.json`;

    request(ERUrl, {
      responseType: "json",
    })
      .then(resolve)
      .catch(reject);
  });
}

function getEntropies(speciesId) {
  return new Promise((resolve, reject) => {
    let entropiesUrl = `${config.dataUrl}${speciesId}/entropies.json`;

    request(entropiesUrl, {
      responseType: "json",
    })
      .then(resolve)
      .catch(reject);
  });
}
