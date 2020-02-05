import React, { useContext, useState, useEffect } from "react";

//AppContexts
import { AthletesContext } from "../../actionscontext/AthletesContext";
//Helpers Components
import {
  FieldContextComponent,
  fcStandarChangeHandler,
  fcDateChangeHandler
} from "../complements/FormComponentsBuilder";
import { LazyLoaderCompositionComponent } from "../../actionscompositions/LazyLoaderCompositionComponent";

export const AthletesFilter = () => {
  /**Helper Methods */
  const maxDate = () => {
    let validate = new Date();
    return validate;
  };

  const minDate = () => {
    let validate = new Date();
    validate.setMonth(0);
    validate.setDate(1);
    return validate;
  };

  /**Main Component Data */
  const initState = {
    first_name: "",
    gender: "",
    weight: "",
    level: "",
    event: "",
    start_date: minDate(),
    end_date: maxDate()
  };
  const { athletes, setFiltered, setPaginator } = useContext(AthletesContext);
  const [filterAthletes, setFilterAthletes] = useState(null);
  const [mainState, setMain] = useState(initState);

  /**Main State Listener */
  useEffect(() => {
    if (athletes && !filterAthletes) {
      setFilterAthletes(athletes);
    }
  });

  /**Main Handlers */
  const resetFilter = e => {
    setMain(initState);
  };

  const mainHandleSubmit = e => {
    e.preventDefault();
    try {
      const auxStart = new Date(mainState.start_date);
      auxStart.setDate(auxStart.getDate() - 1);
      const auxEnd = new Date(mainState.end_date);

      const auxAthletes = filterAthletes.filter(athlete => {
        let name = true;
        const recordTime = new Date(athlete.record_date);
        if (athlete.dojo_name) {
          name =
            mainState.first_name !== ""
              ? athlete.first_name
                  .toLowerCase()
                  .includes(mainState.first_name.toLowerCase()) ||
                athlete.dojo_name
                  .toLowerCase()
                  .includes(mainState.first_name.toLowerCase())
              : true;
        } else {
          name =
            mainState.first_name !== ""
              ? athlete.first_name
                  .toLowerCase()
                  .includes(mainState.first_name.toLowerCase())
              : true;
        }

        const gender =
          mainState.gender !== "" ? mainState.gender === athlete.gender : true;
        const weight =
          mainState.weight !== "" ? mainState.weight === athlete.weight : true;
        const level =
          mainState.level !== "" ? mainState.level === athlete.level : true;
        const event =
          mainState.event !== "" ? athlete[mainState.event] === "y" : true;

        const startTime = recordTime >= auxStart ? true : false;
        const endTime = recordTime <= auxEnd ? true : false;

        return (
          name && gender && weight && level && event && startTime && endTime
        );
      });

      setFiltered(auxAthletes);
      setPaginator(false);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /**Main Render */
  return (
    <form onSubmit={mainHandleSubmit}>
      <div className="row minflex">
        <div className="col s12 l10">
          <div className="row">
            <div className="col s12 l5">
              <div className="row">
                <FieldContextComponent
                  fieldsize="s12"
                  fieldtag="Name/ClubName"
                  fieldtype="text"
                  fieldid="first_name"
                  fieldvalue={mainState.first_name}
                  handleChange={e => {
                    fcStandarChangeHandler(e, mainState, setMain);
                  }}
                />
              </div>
            </div>

            <div className="col s12 l7">
              <div className="row">
                <FieldContextComponent
                  fieldsize="s12 l6"
                  fieldtag="Gender"
                  fieldtype="select"
                  fieldid="gender"
                  fieldvalue={mainState.gender}
                  fieldoptions={[
                    { value: "M", text: "Male" },
                    { value: "F", text: "Female" }
                  ]}
                  handleChange={e => {
                    fcStandarChangeHandler(e, mainState, setMain);
                  }}
                />
                <FieldContextComponent
                  fieldsize="s12 l6"
                  fieldtag="Weight (Kg)"
                  fieldtype="text"
                  fieldid="weight"
                  fieldvalue={mainState.weight}
                  handleChange={e => {
                    fcStandarChangeHandler(e, mainState, setMain);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col s12 l5">
              <div className="row">
                <FieldContextComponent fieldsize="s12" fieldtag="Date range">
                  <div className="row">
                    <FieldContextComponent
                      fieldsize="s12 l6"
                      fieldtype="date"
                      fieldid="start_date"
                      fieldvalue={mainState.start_date}
                      maxdate={
                        mainState.end_date !== ""
                          ? mainState.end_date
                          : maxDate()
                      }
                      handleChange={e => {
                        fcDateChangeHandler(
                          e,
                          "start_date",
                          mainState,
                          setMain
                        );
                      }}
                    />
                    <FieldContextComponent
                      fieldsize="s12 l6"
                      fieldtype="date"
                      fieldid="end_date"
                      fieldvalue={mainState.end_date}
                      maxdate={maxDate()}
                      mindate={mainState.start_date}
                      handleChange={e => {
                        fcDateChangeHandler(e, "end_date", mainState, setMain);
                      }}
                    />
                  </div>
                </FieldContextComponent>
              </div>
            </div>
            <div className="col s12 l7">
              <div className="row">
                <FieldContextComponent
                  fieldsize="s12 l6"
                  fieldtag="Belt"
                  fieldtype="select"
                  fieldid="level"
                  fieldvalue={mainState.level}
                  fieldoptions={[
                    { value: "White" },
                    { value: "Yellow" },
                    { value: "Orange" },
                    { value: "Green" },
                    { value: "Purple" },
                    { value: "Blue" },
                    { value: "Brown" },
                    { value: "Black" }
                  ]}
                  handleChange={e => {
                    fcStandarChangeHandler(e, mainState, setMain);
                  }}
                />
                <FieldContextComponent
                  fieldsize="s12 l6"
                  fieldtag="Event"
                  fieldtype="select"
                  fieldid="event"
                  fieldvalue={mainState.event}
                  fieldoptions={[
                    { value: "kumite", text: "Kumite" },
                    { value: "kata", text: "Kata" },
                    { value: "seminar", text: "Parakarate" }
                  ]}
                  handleChange={e => {
                    fcStandarChangeHandler(e, mainState, setMain);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 l2">
          <div className="row buttonscontainer krt-btns-vertical">
            <div className="buttonscontainer krt-pdf-buttons-container">
              <LazyLoaderCompositionComponent
                layout="DownLoadAthletesList"
                id="athlete-list-btn"
              ></LazyLoaderCompositionComponent>
              <LazyLoaderCompositionComponent
                layout="DownLoadAthletesList"
                template="team"
                tooltip="Download Team PDF"
                icon="fas fa-file-pdf"
                id="team-athlete-list-btn"
              ></LazyLoaderCompositionComponent>
              <LazyLoaderCompositionComponent
                layout="DownLoadAthletesListCSV"
                tooltip="Download all CSV"
                icon="fas fa-file-csv"
                id="csv-athlete-list-btn"
              ></LazyLoaderCompositionComponent>
            </div>
            <button className="blue-custom-button">
              <i className="fas fa-search" /> Search
            </button>
            <button
              onClick={resetFilter}
              className="blue-custom-button redbutton"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AthletesFilter;
