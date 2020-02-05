import React, { useContext, useState } from "react";
import ReactTooltip from "react-tooltip";
import { CSVLink } from "react-csv";
//AppContexts
import { AthletesContext } from "../../actionscontext/AthletesContext";

const generateCSV = () => {};

export const DownLoadAthletesListCSV = ({
  tooltip = "Download all PDF",
  icon = "fas fa-file-download",
  id
}) => {
  //Initial State
  const { filteredAthletes } = useContext(AthletesContext);
  const [renderState, setRender] = useState(false);
  const documentDate = new Date();
  const filename = `csv-athlete-list-${documentDate.getDay()}${documentDate.getMonth()}${documentDate.getFullYear()}.csv`;

  const headers = [
    { label: "Dojo", key: "dojo_name" },
    { label: "Athlete", key: "first_name" },
    { label: "Category", key: "id_category" },
    { label: "Kata", key: "kata" },
    { label: "Kumite", key: "kumite" },
    { label: "Parakarate", key: "seminar" },
    { label: "Register Date", key: "record_date" },
    { label: "Payment Status", key: "status_payment" },
    { label: "Payment Date", key: "payment_date" },
    { label: "Gender", key: "gender" },
    { label: "Age", key: "age" },
    { label: "Weight", key: "weight" },
    { label: "Belt", key: "level" }
  ];

  if (filteredAthletes) {
    return (
      <CSVLink
        data={filteredAthletes}
        headers={headers}
        filename={filename}
        className="blue-custom-button"
        separator={";"}
        data-tip
        data-for={id}
      >
        <ReactTooltip id={id} place="top" type="light" effect="float">
          <span className="krt-tooltip">{tooltip}</span>
        </ReactTooltip>
        <i className={icon}></i>
        {renderState ? `...` : ``}
      </CSVLink>
    );
  } else {
    return (
      <button
        className="blue-custom-button"
        onClick={e => {
          e.preventDefault();
        }}
      >
        <i className={icon}></i>...
      </button>
    );
  }
};

export default DownLoadAthletesListCSV;
