import React, { lazy, Suspense, useState } from "react";
//Helpers
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

export const AthletesTableList = props => {
  const { athletes } = props;
  const [modalSpace, setModal] = useState(null);
  const showModal = (target, athlete) => {
    if (athlete.status_payment) {
      const LazyModal = lazy(() => {
        return import("../layouts/modals/PaymentDetailsModal");
      });

      const lazyProps = { athlete: athlete, target: target };

      setModal(
        <Suspense fallback={<div></div>}>
          <LazyModal {...lazyProps}></LazyModal>
        </Suspense>
      );
    } else {
      setModal(null);
    }
  };

  const listRender = athletes => {
    try {
      return athletes.map(athlete => {
        const modalCall = React.createRef();
        return (
          <tr
            key={`athlete-${athlete.id_person}`}
            ref={modalCall}
            data-userid={athlete.id_person}
          >
            <td>
              <div>
                <p>{athlete.dojo_name ? athlete.dojo_name : "N/A"}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{athlete.first_name}</p>
              </div>
            </td>
            <td>{athlete.id_category}</td>

            <td>
              <p className="events-block">
                {athlete.kata === "y" ? <span>Kata</span> : null}
                {athlete.kumite === "y" ? <span>Kumite</span> : null}
                {athlete.seminar === "y" ? <span>Parakarate</span> : null}
              </p>
            </td>
            <td>{athlete.record_date ? athlete.record_date : ""}</td>
            <td>
              <button
                className="events-block"
                onClick={e => {
                  e.preventDefault();
                  showModal(modalCall.current, athlete);
                }}
              >
                {athlete.status_payment === "Paid" ? (
                  <span className="krt-event-green">
                    <i className="fas fa-check" />
                    <i> | </i>
                    <i className="far fa-eye" />
                  </span>
                ) : (
                  <span className="krt-event-red">
                    <i className="fas fa-times" />
                    <i> | </i>
                    <i className="far fa-eye-slash" />
                  </span>
                )}
              </button>
            </td>
            <td style={{ display: "none" }}>
              <div className="krt-actions-container">
                <button className="editbutton">
                  <i className="fas fa-pencil-alt" />
                </button>
                <button className="deletebutton">
                  <i className="far fa-trash-alt krt-red-item" />
                </button>
              </div>
            </td>
          </tr>
        );
      });
    } catch (error) {
      return null;
    }
  };

  if (athletes) {
    return athletes.length > 0 && athletes[0] ? (
      <div className="krt-table-list krt-team-list">
        {modalSpace}
        <table className="striped">
          <thead>
            <tr>
              <th>Club Name</th>
              <th>Name</th>
              <th>Category</th>

              <th>Event Type</th>
              <th>Register Date</th>
              <th>Registered</th>
              <th style={{ display: "none" }} />
            </tr>
          </thead>

          <tbody>{listRender(athletes)}</tbody>
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

export default AthletesTableList;
