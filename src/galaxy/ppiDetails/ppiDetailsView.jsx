import React from 'react';
import detailModel from './ppiDetailsStore.js';

module.exports = require('maco')(detailedPpiView, React);

function detailedPpiView(x) {
    x.state = {
        ppiDetails: null
    };

    x.render = function () {
        console.log(x);

        if (!x.state.ppiDetails) return null;
        var PpiDetails = getPpiDetails();

        return (
            <div className='ppi-details'>
                <PpiDetails model={x.state.ppiDetails} />
            </div>
        );
    };

    x.componentDidMount = function () {
        detailModel.on('changed', updateView);
    };

    x.componentWillUnmount = function () {
        detailModel.off('changed', updateView);
    };

    function getPpiDetails() {
        return require('maco').template(template, React);

        function template(props) {
            let model = props.model;
            return (
                <div className='container-fluid row'>
                    <div className='hidden-xs'>
                        <div className='col-xs-6'>
                            <h4 title={model.name}>{model.name}</h4>
                        </div>
                        <div className="col-xs-3">
                            <div className="row">
                                <h2 id={model.id} className='in-degree'>{model.inDegree}</h2>
                            </div>
                            <div className="row small">{model.inDegreeLabel}</div>
                        </div>
                        <div className="col-xs-3">
                            <div className="row">
                                <h2 id={model.id} className='out-degree'>{model.outDegree}</h2>
                            </div>
                            <div className="row small">{model.outDegreeLabel}</div>
                        </div>
                    </div>

                    <div className='visible-xs-block'>
                        <div className='row info-block'>
                            <div className='col-xs-6 no-overflow'><h5>{model.name}</h5></div>
                            <div id={model.id} className='in-degree col-xs-3'>{model.inDegree}</div>
                            <div id={model.id} className='out-degree col-xs-3'>{model.outDegree}</div>
                        </div>
                    </div>
                </div>
            );
        }

    }

    function updateView() {
        detailModel.loadPpiDetails()
            .then((ppiDetails) => {
                x.setState({
                    ppiDetails: ppiDetails
                });
                // x.forceUpdate();
            }).catch((message) => {
                console.log(message);
                x.setState({
                    ppiDetails: null
                })
            })
    }
}
