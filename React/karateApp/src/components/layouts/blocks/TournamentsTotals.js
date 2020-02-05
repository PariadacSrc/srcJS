import React, { useContext } from "react";
//AppContexts
import { AthletesContext } from "../../actionscontext/AthletesContext";

export const getTotal = (type, athletes) => {
  const totals = {
    kumite: 0,
    kata: 0,
    seminar: 0
  };
  if (athletes) {
    athletes.map(athlete => {
      if (type === athlete.status_payment) {
        totals.kumite =
          athlete.kumite === "y" ? totals.kumite + 1 : totals.kumite;
        totals.kata = athlete.kata === "y" ? totals.kata + 1 : totals.kata;
        totals.seminar =
          athlete.seminar === "y" ? totals.seminar + 1 : totals.seminar;
      }
    });
  }

  return totals;
};

export const getAllAthletes = athletes => {
  let total = 0;

  if (athletes) {
    athletes.map(athlete => {
      if (athlete.kata === "y" && athlete.kumite === "y") {
        total++;
      } else {
        if (athlete.kata === "y") {
          total++;
        }
        if (athlete.kumite === "y") {
          total++;
        }
      }

      if (athlete.seminar === "y") {
        total++;
      }
    });
  }

  return total;
};

export const getCostTotal = athletes => {
  const totals = {
    kumite: 0,
    kata: 0,
    seminar: 0
  };
  if (athletes) {
    athletes.map(athlete => {
      if (athlete.status_payment==="Paid"){
        if (athlete.kata === "y" && athlete.kumite === "y") {
          totals.kata = totals.kata + 35;
          totals.kumite = totals.kumite + 15;
        } else {
          if (athlete.kata === "y") {
            totals.kata = totals.kata + 35;
          }
          if (athlete.kumite === "y") {
            totals.kumite = totals.kumite + 35;
          }
        }

        if (athlete.seminar === "y") {
          totals.seminar = totals.seminar + 35;
        }
      }
    });
  }

  return totals;
};

export const TournamentsTotals = props => {
  const { athletes } = useContext(AthletesContext);

  const bodyTotals = () => {
    const totalRegistered = getTotal("Paid", athletes);
    const totalPreRegister = getTotal("No payment", athletes);
    const costTotal = getCostTotal(athletes);
    const kumiteTotal = totalRegistered.kumite + totalPreRegister.kumite;
    const kataTotal = totalRegistered.kata + totalPreRegister.kata;
    const seminarTotal = totalRegistered.seminar + totalPreRegister.seminar;

    return (
      <div className="krt-total-tournament">
        <div className="row">
          <div className="col s12 l4">
            <div className="krt-record-total-block">
              <h4>Total Athletes Kumite</h4>
              <div>
                <p>
                  Registered<span>{totalRegistered.kumite}</span>
                </p>
                <p>
                  Pre-Registered<span>{totalPreRegister.kumite}</span>
                </p>
                <p>
                  Total<span>{kumiteTotal}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 l4">
            <div className="krt-record-total-block">
              <h4>Total Athletes Kata</h4>
              <div>
                <p>
                  Registered<span>{totalRegistered.kata}</span>
                </p>
                <p>
                  Pre-Registered <span>{totalPreRegister.kata}</span>
                </p>
                <p>
                  Total <span>{kataTotal}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 l4">
            <div className="krt-record-total-block">
              <h4>Total Athletes Parakarate</h4>
              <div>
                <p>
                  Registered<span>{totalRegistered.seminar}</span>
                </p>
                <p>
                  Pre-Registered<span>{totalPreRegister.seminar}</span>
                </p>
                <p>
                  Total<span>{seminarTotal}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l6">
            <div className="krt-record-total-block">
              <div>
                <p>
                  Total Athletes
                  <span>{getAllAthletes(athletes)}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="krt-record-total-block">
              <div>
                <p>
                  Total Payments
                  <span>
                    {costTotal.kumite + costTotal.kata + costTotal.seminar}$
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="krt-dashboard-total">
      <div>
        {props.comptitle ? (
          <div className="krt-header-total">
            <h3>{props.comptitle}</h3>
          </div>
        ) : null}
        <div className="krt-body-total">{bodyTotals()}</div>
      </div>
    </div>
  );
};

export default TournamentsTotals;
