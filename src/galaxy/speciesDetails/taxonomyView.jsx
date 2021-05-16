import React from "react";

export default require("maco").template(taxonomyView, React);

function taxonomyView(props) {
  let speciesId = props.speciesId;
  let speciesName = props.speciesName;
  let taxonomy = props.taxonomy;
  return (
    <p style={{ wordBreak: "break-word" }}>
      <span className="highlight">{"Lineage:  "}</span>
      {taxonomy.map((level) => {
        return (
          <span>
            <span>{level}</span>
            {" / "}
          </span>
        );
      })}
      <a target="_blank" href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${speciesId}&lvl=3&lin=f&keep=1&srchmode=5&unlock`}>
        <span>{speciesName}</span>
      </a>
    </p>
  );
}
