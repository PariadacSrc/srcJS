import React, { Component } from "react";

//React Slick Carrousel
import Slider from "react-slick";

//Home Layouts
import LoginForm from "../../forms/login/LoginForm";
import RecoverPassword from "../../forms/RecoverPassword";
import MasterStepForm from "../../forms/registersteps/MasterStepForm";
import RegisterSummari from "../../summarimessages/RegisterSummari";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  getForm = () => {
    switch (this.props.match.params.formcall) {
      case "sign-in":
        return <MasterStepForm />;
      case "recoverpass":
        return <RecoverPassword {...this.props} />;
      case "subscription":
        return <RegisterSummari />;
      default:
        return <LoginForm />;
    }
  };

  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="mainblock">
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l6">
              <h2>Calgary Karate Cup</h2>
              <p>
                The Calgary Karate Cup Tournament that will take place October
                5, 2019, will allow everyone involved, whether you have just
                started or have trained for years, there is a division and an
                opportunity for you.
              </p>
              <div className="tournament-helper">
                <h5>Sponsor</h5>
                <Slider
                  {...settings}
                  className="sponsorscarrousel justoneelement"
                >
                  <div>
                    <div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/resource/LogoTecbound.jpg"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col s12 m12 l6">
              <div className="masterform">{this.getForm()}</div>
            </div>
          </div>
        </div>
        <div className="backmask">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
}

export default Home;
