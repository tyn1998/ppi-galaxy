import React from "react";

export default require("maco").template(oracUnit, React);

function oracUnit(props) {
    let classStr = props.classStr;
    let imageSrc = props.imageSrc;
    let orcaCount = props.orcaCount;
  return (
    <div className={classStr}>
      <img
        className="img-responsive"
        src={imageSrc}
        width="70px"
        height="70px"
      />
      <h5>{orcaCount}</h5>
    </div>
  );
}
