import React from "react";

export default require("maco").template(resilienceTable, React);

function resilienceTable(props) {
  let resilience = props.resilience;
  return (
    <div>
      <span className="highlight">Resilience from different nodes removal strategies:</span>
      <table className="resilience-table table table-condensed table-bordered">
        <thead>
          <tr>
            <th>Rdm</th>
            <th>Btw</th>
            <th>Clo</th>
            <th>Deg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{resilience["random"]}</td>
            <td>{resilience["betweenness"]}</td>
            <td>{resilience["closeness"]}</td>
            <td>{resilience["degreecentrality"]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
