import React from "react";

export default class Destination extends React.Component {
  render() {
    let x = this;
    let props = x.props;

    return (
      <div
        className="media col-md-6 col-lg-4"
      >
        <a className="media media-left" href={props.href} target="_blank">
          <img
            className="media-object"
            width="150px"
            height="100px"
            src={props.imgUrl}
            alt={props.name}
          />
        </a>
        <div className="container media-body">
          <a className="media" href={props.href} target="_blank">
            <h4 className="media-heading">{props.name}</h4>
            {props.description}
          </a>
          <div className="row" style={{ marginTop: "5px" }}>
            <div className="col-xs-2">
              <a className="media" href={`${ props.href }&v=normal`} target="_blank">
                <button className="welcome-button">normal</button>
              </a>
            </div>
            <div className="col-xs-2">
              <a className="media" href={`${ props.href }&v=sparse`} target="_blank">
                <button className="welcome-button">sparse</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
