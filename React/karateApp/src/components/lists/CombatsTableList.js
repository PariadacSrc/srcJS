import React from "react";
//Helpers
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

export const CombatsTableList = props => {
  const { combats } = props;

  const listRender = combats => {
    try {
      return combats.map(combat => {
        return (
          <tr
            key={`combat-${combat.id_key}-${Math.random()}`}
            data-combatid={combat.id_key}
          >
            <td>
              <div>
                <p>{combat.category}</p>
              </div>
            </td>
            <td>
              <p className="events-block">
                <span>{combat.competition_type}</span>
              </p>
            </td>

            <td>
              <div>
                <p>{combat.person_one ? combat.person_one : "N/A"}</p>
              </div>
            </td>
            <td></td>
            <td>
              <div>
                <p>{combat.person_two ? combat.person_two : "N/A"}</p>
              </div>
            </td>
          </tr>
        );
      });
    } catch (error) {
      return null;
    }
  };

  if (combats) {
    return combats.length > 0 && combats[0] ? (
      <div className="krt-table-list">
        <table className="striped">
          <thead>
            <tr>
              <th>Category</th>
              <th>Event Type</th>
              <th>Athlete 1</th>
              <th>VS</th>
              <th>Athlete 2</th>
            </tr>
          </thead>

          <tbody>{listRender(combats)}</tbody>
        </table>
      </div>
    ) : (
      <div className="krt-standar-msg">
        <div>
          <p>No records found for this search...</p>
        </div>
      </div>
    );
  } else {
    return <SpinerLoader></SpinerLoader>;
  }
};

export default CombatsTableList;
