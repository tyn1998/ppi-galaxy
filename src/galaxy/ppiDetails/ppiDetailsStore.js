/**
 * Prepares data for selected node details
 */
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
                var ppiDetailsUrl = config.dataUrl + '9606/nodes/' + scene.getNodeInfo(currentNodeId).name + '.json';

                request(ppiDetailsUrl, {
                    responseType: 'json'
                }).then(resolve);
            }
        })
    }
}
