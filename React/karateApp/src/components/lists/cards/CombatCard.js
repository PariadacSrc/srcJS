import React, { Component } from "react";

class CombatCard extends Component {
  render() {
    return (
      <div className="col s12 m6 l3 cardsblock card-type-3">
        <div>
          <div className="cardimg">
            <div
              style={{
                backgroundImage:
                  "url(" +
                  process.env.PUBLIC_URL +
                  "'/assets/img/resource/perfil3.jpg')"
              }}
            />
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
                <strong>Tournament Name</strong>
              </li>
              <li>
                <span>Athlete 1</span>
              </li>
              <li>
                <span>Athlete 2</span>
              </li>
              <li>
                <strong>Category</strong>
              </li>
              <li>
                <span>15/07/2019</span>
              </li>
              <li>
                <span>22:00 mim.</span>
              </li>
            </ul>
          </div>
          <div className="arrowmodal">
            <a href="#">
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default CombatCard;
