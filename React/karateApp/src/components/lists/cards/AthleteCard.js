import React, { Component } from "react";
import { API_IMG_URL } from "../../../config/apiConfig";

class AtheteCard extends Component {
  getCheckBoxBlock() {
    return this.props.putcheck ? (
      <label>
        <input type="checkbox" />
        <span />
      </label>
    ) : null;
  }

  getActionsBlock() {
    return this.props.putactions ? (
      <ul>
        {this.props.handlerEdit ? (
          <li>
            <a
              href="#"
              className="editbutton"
              onClick={e => {
                e.preventDefault();
                this.props.handlerEdit(this.props.athlete.id_person);
              }}
            >
              <i className="fas fa-pencil-alt" />
            </a>
          </li>
        ) : null}
        {this.props.handlerDelete ? (
          <li>
            <a
              href="#"
              className="deletebutton"
              onClick={e => {
                e.preventDefault();
                this.props.handlerDelete(this.props.athlete.id_person);
              }}
            >
              <i className="far fa-trash-alt" />
            </a>
          </li>
        ) : null}
      </ul>
    ) : null;
  }

  getTagsStatus = ({ status_payment }) => {
    return status_payment ? (
      <div className="tag-component">
        <div>Registered</div>
      </div>
    ) : (
      <div className="tag-component incomplete-status">
        <div>Pre-registered</div>
      </div>
    );
  };

  render() {
    const {
      id_person,
      first_name,
      last_name,
      birthdate,
      picture,
      auxpicture = {},
      weight,
      level,
      status_payment,
      kumite,
      kata,
      seminar
    } = this.props.athlete;
    const checkblock = this.getCheckBoxBlock();
    const actionblock = !status_payment ? this.getActionsBlock() : null;

    let newbirtdate = new Date(birthdate);
    let correctAge = new Date(Date.now() - newbirtdate);
    correctAge = Math.floor(correctAge / 31557600000);

    let defaultPicture = picture
      ? `${API_IMG_URL}/${picture}?v=${Math.round(Math.random() * 10)}`
      : null;
    defaultPicture = auxpicture.sourcehandler
      ? auxpicture.sourcehandler
      : defaultPicture;

    return (
      <div
        className={
          this.props.clubName
            ? "col s12 m12 l12 cardsblock card-type-1"
            : "col s12 m6 l4 cardsblock card-type-1"
        }
        key={`athlete-${id_person}`}
      >
        <div>
          <div className="roundcheck-container">{checkblock}</div>
          <div className="cardimg">
            <div
              style={{
                backgroundImage: defaultPicture
                  ? `url('${defaultPicture}')`
                  : null
              }}
            />
          </div>
          <div>
            <div className="title-card-block">
              <h4>
                {first_name} {last_name}
                {this.props.athlete.id_category ? (
                  <strong> (Category: {this.props.athlete.id_category})</strong>
                ) : null}
                {this.props.clubName ? (
                  <span>Club Name: {this.props.clubName}</span>
                ) : null}
              </h4>
            </div>
            <div className="top-elements">
              <div>
                <ul>
                  <li>
                    <span>Age</span>
                    <span>{correctAge}</span>
                  </li>
                  <li>
                    <span>Weight</span>
                    <span>{weight}</span>
                  </li>
                  <li>
                    <span>Belt</span>
                    <span
                      className="levelpoint"
                      style={{ backgroundColor: level.toLowerCase() }}
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Events</span>
                    <p className="events-block">
                      {kata ? <span>Kata</span> : null}
                      {kumite ? <span>Kumite</span> : null}
                      {seminar ? <span>Parakarate</span> : null}
                      {!seminar && !kata && !kumite ? <span>N/A</span> : null}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="cardactions">{actionblock}</div>
            </div>

            <div className="bottom-elements">
              {this.getTagsStatus(this.props.athlete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AtheteCard;
