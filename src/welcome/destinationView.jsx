import React from "react";

export default class Destination extends React.Component {
  render() {
    let x = this;
    let props = x.props;

    return (
      <a
        className="media col-md-6 col-lg-4"
        href={props.href}
      >
        <div className="media-left">
          <img
            className="media-object"
            width="150px"
            height="93px"
            src={'/'}
            alt={props.name}
          />
        </div>
        <div className="media-body">
          <h4 className="media-heading">{props.name}</h4>
          {props.description}
        </div>
      </a>
    );
  }
}
