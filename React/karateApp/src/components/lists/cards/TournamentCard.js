import React, { Component } from "react";

class TournamentCard extends Component {
  render() {
    return (
      <div className="col s12 m6 l4 cardsblock card-type-2">
        <div>
          <div className="roundcheck-container">
            <label>
              <input type="checkbox" />
              <span />
            </label>
          </div>
          <div className="cardimg">
            <div
              style={{
                backgroundImage:
                  "url(" +
                  process.env.PUBLIC_URL +
                  "'/assets/img/resource/perfil3.jpg')"
              }}
            />
          </div>
          <div className="card-content">
            <ul>
              <li>
                <span>
                  <strong>Name</strong>
                </span>
              </li>
              <li>
                <span>
                  <strong>From:</strong>Lorem ipsum dolor sit amet
                </span>
              </li>
              <li>
                <span>
                  <strong>To:</strong>Lorem ipsum dolor sit amet
                </span>
              </li>
              <li>
                <span>
                  <i className="fas fa-map-marker-alt" />
                  <strong>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam in.
                  </strong>
                </span>
              </li>
            </ul>
          </div>
          <div className="cardactions">
            <ul>
              <li>
                <a href="">
                  <i className="fas fa-pencil-alt" />
                </a>{" "}
              </li>
              <li>
                <a href="">
                  <i className="far fa-trash-alt" />
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TournamentCard;
