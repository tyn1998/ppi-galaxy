import appEvents from '../service/appEvents.js';
import eventify from 'ngraph.events';
import scene from '../store/scene.js';
import config from '../../config.js';
import request from '../service/request.js';
import Promise from 'bluebird';

export default ppiDetailsStore();

function ppiDetailsStore() {
    var api = {
        loadPpiDetails: loadPpiDetails
    };

    var currentNodeId;
    appEvents.selectNode.on(updateDetails);

    eventify(api);

    return api;

    function updateDetails(nodeId) {
        currentNodeId = nodeId;
        api.fire('changed');
    }

    function loadPpiDetails() {
        return new Promise((resolve, reject) => {
            if (currentNodeId === undefined) {
                reject('currentNodeId is not defined.(因为鼠标点击在背景上)');
            } else {
                // request ppi details
                var ppiDetailsUrl =  `${config.dataUrl}${scene.getGraphName()}/nodes/${scene.getNodeInfo(currentNodeId).name}.json`;

                request(ppiDetailsUrl, {
                    responseType: 'json'
                }).then(beautify).then(resolve);
            }
        })
        function beautify(ppiDetails) {
            return new Promise((resolve, reject) => {
                ppiDetails['betweenness'] = ppiDetails['betweenness'].toFixed(6);
                ppiDetails['closeness'] = ppiDetails['closeness'].toFixed(6);
                ppiDetails['clustering'] = ppiDetails['clustering'].toFixed(6);
                ppiDetails['curvature'] = ppiDetails['curvature'].toFixed(4);
                ppiDetails['degreecentrality'] = ppiDetails['degreecentrality'].toFixed(6);
                resolve(ppiDetails);
            })
        }
    }
}
