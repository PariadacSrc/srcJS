import React, { Component } from "react";

//Validations
import {
  clearFormErrors,
  newFileName,
  validateFormRules
} from "../../rules/validateFormRules";

//Helpers Components
import FormButtons from "./FormButtons";
import RegisterSummari from "../../summarimessages/RegisterSummari";
import AlertsForms from "../../summarimessages/AlertsForms";

//Steps
import StepOne from "./steps/StepOne";
import StepTwoIndividual from "./steps/StepTwoIndividual";
import StepTwoTeam from "./steps/StepTwoTeam";
import StepThreeIndividual from "./steps/StepThreeIndividual";

//Redux Conection
import { connect } from "react-redux";

//Actions
import { setUser, validateUserdata } from "../../../store/actions/usersActions";
import {
  setLastcallFormAlert,
  fetchFormAlert
} from "../../../store/actions/formAlertsActions";

class MasterStepForm extends Component {
  /*
   *Basic class constructor
   *@params: props(React Component parent props)
   */
  constructor(props) {
    super(props);
    // Set the initial input values
    this.state = {
      currentStep: 1, // Default step value
      maxStep: 3, // Maximum number of steps in the form
      recordtype: "individual", // Type of form to be rendered
      currentErrors: [],
      currentAlert: "",
      userdata: {
        // Fields that are synchronized with the central storage of the application
        name: "",
        user_name: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
        address: "",
        email: "",
        phone: "",
        birthdate: this.getvalidDate(),
        gender: "",
        weight: "",
        level: "",
        club_name: "",
        health_core: "",
        event_kumite: "",
        event_seminar: "",
        event_kata: "",
        style: "",
        picture: null
      }
    };
  }

  getvalidDate = () => {
    let validate = new Date();
    validate.setFullYear(validate.getFullYear() - 4);
    return validate;
  };

  setLastAlert = id => {
    this.setState({ currentAlert: id });
  };

  fixdate = date => {
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    return `${date.getFullYear()}-${month}-${day}`;
  };

  fixApiState = () => {
    let apiState = {};
    const pictureName = this.state.userdata.picture?newFileName(
      this.state.userdata.picture[0],
      `${Math.random()}-${this.state.userdata.user_name}`
    ):"";

    const replistate = this.state;
    apiState.user_data = {
      id_user: replistate.userdata.user_name,
      password: replistate.userdata.password,
      user_type: "Application",
      createdby: replistate.userdata.user_name,
      id_rol: replistate.recordtype === "individual" ? "3" : "2"
    };

    if (replistate.recordtype === "individual") {
      apiState.person_data = {
        first_name: replistate.userdata.first_name,
        last_name: replistate.userdata.last_name,
        address: replistate.userdata.address,
        email: replistate.userdata.email,
        phone: replistate.userdata.phone,
        birthdate: this.fixdate(replistate.userdata.birthdate),
        level: replistate.userdata.level,
        gender: replistate.userdata.gender,
        style: replistate.userdata.style,
        weight: replistate.userdata.weight,
        health_care: replistate.userdata.health_core,
        id_dojo: null,
        dojo_name: replistate.userdata.club_name,
        kata: replistate.userdata.event_kata,
        kumite: replistate.userdata.event_kumite,
        seminar: replistate.userdata.event_seminar,
        picture: pictureName,
        iduser: replistate.userdata.user_name,
        createdby: replistate.userdata.user_name
      };
    } else {
      apiState.team_data = {
        name: replistate.userdata.name,
        address: replistate.userdata.address,
        style: replistate.userdata.style,
        phone: replistate.userdata.phone,
        email: replistate.userdata.email,
        id_user: replistate.userdata.user_name,
        createdby: replistate.userdata.user_name,
        picture: pictureName
      };
    }

    var file = null;
    if (replistate.userdata.picture) {
      file= new FormData();
      file.append("photo", replistate.userdata.picture[0], pictureName);
    }

    return {
      maindata: apiState,
      picturedata: file,
      useremail: replistate.userdata.email
    };
  };
  //Forms Handlers
  handleChangeDate = (field, date) => {
    let auxdata = this.state.userdata;
    auxdata[field] = date;
    this.setState({
      userdata: auxdata
    });
  };

  handleChangeFile = event => {
    const { files, name } = event.target;
    const size = files[0].size/1024/1024;
    if(size<2){
      let auxdata = this.state.userdata;
      auxdata[name] = files;
      this.setState({
        userdata: auxdata
      });
    }else{
      this.props.fetchFormAlert({
          id: this.state.currentAlert,
          status: "error",
        form_alert_body: "The file size must be less than 2MB"
      });
    }

    
  };

  handleChange = event => {
    clearFormErrors(event.target);
    const { name } = event.target;
    const value = name === "user_name" ? event.target.value.toLowerCase() : event.target.value;
    let auxdata = this.state.userdata;
    auxdata[name] = value;
    this.setState({
      userdata: auxdata
    });
  };

  handleChangecheck = event => {
    clearFormErrors(event.target);
    const { value, name } = event.target;
    let auxdata = this.state.userdata;
    auxdata[name] = value === "y" ? "" : "y";
    this.setState({
      userdata: auxdata
    });
  };

  handleChangeMainForm = event => {
    const { value, name } = event.target;
    if (name !== "userdata") {
      this.setState({
        [name]: value
      });
    }

    if (name === "recordtype") {
      switch (value) {
        case "team":
          this.setState({ maxStep: 2 });
          break;

        default:
          this.setState({ maxStep: 3 });
          break;
      }
    }
  };

  handleErros = errors => {
    this.setState({
      currentErrors: errors
    });
  };

  // Trigger an alert on form submission

  mainStepsValidations = event => {
    const validations = validateFormRules();
    if (validations.length === 0) {
      return true;
    } else {
      let emptyfield = 0,
        notmatch = 0,
        minlimint = 0,
        anyerror = 0;

      validations.map(errors => {
        errors.map(error => {
          switch (error.type) {
            case "emptyflield":
              emptyfield++;
              break;

            case "notmatch":
              notmatch++;
              break;

            case "minlimint":
              minlimint++;
              break;

            default:
              anyerror++;
              break;
          }
        });
      });

      if (emptyfield > 0 || anyerror > 0) {
        this.props.fetchFormAlert({
          id: this.state.currentAlert,
          status: "error",
          form_alert_body: "Please enter all required values"
        });
      }

      if (emptyfield === 0 && notmatch > 0) {
        this.props.fetchFormAlert({
          id: this.state.currentAlert,
          status: "error",
          form_alert_body: "The password value and confirmation do not match"
        });
      }

      if (emptyfield === 0 && notmatch === 0 && minlimint > 0) {
        this.props.fetchFormAlert({
          id: this.state.currentAlert,
          status: "error",
          form_alert_body:
            "The password cannot be less than 8 characters and a maximum of 15"
        });
      }

      return false;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.mainStepsValidations()) {
      this.serverValidations(
        this.state.currentStep,
        this.fixApiState(),
        data => {
          this.props.setUser(data);
        }
      );
    }
  };

  serverValidations = (auxstep, callbackdata, callback) => {
    let validation, validationvalue;
    switch (auxstep) {
      case 1:
        validation = "username";
        validationvalue = this.state.userdata.user_name;
        break;

      case 2:
        validation = "useremail";
        validationvalue = this.state.userdata.email;
        break;

      case 3:
        validation = "usercategory";
        validationvalue = {
          belt: this.state.userdata.level,
          birthday: this.fixdate(this.state.userdata.birthdate),
          gender: this.state.userdata.gender,
          karate:
            this.state.userdata.event_seminar === "y"
              ? this.state.userdata.event_seminar
              : null
        };
        break;
    }

    this.props.validateUserdata(
      {
        type: validation,
        value: validationvalue
      },
      callbackdata,
      callback
    );
  };

  changeStep = step => {
    if (step < this.state.currentStep) {
      this.setState({
        currentStep: step
      });
    } else {
      if (this.mainStepsValidations()) {
        const auxstep = step - 1;
        this.serverValidations(auxstep, step, step => {
          this.setState({
            currentStep: step
          });
        });
      }
    }
  };

  getButtons() {
    return (
      <FormButtons
        changeStep={this.changeStep}
        currentStep={this.state.currentStep}
        maxStep={this.state.maxStep}
      />
    );
  }

  getStep = () => {
    const { picture } = this.state.userdata;
    switch (this.state.currentStep) {
      case 1:
        const {
          user_name,
          password,
          password_confirmation
        } = this.state.userdata;
        const recordtype = this.state.recordtype;
        return (
          <StepOne
            formprops={{
              user_name,
              password,
              password_confirmation,
              recordtype
            }}
            handleChange={this.handleChange}
            handleChangeMainForm={this.handleChangeMainForm}
            handleErros={this.handleErros}
            AlertComponent={AlertsForms}
            setLastAlert={this.setLastAlert}
          />
        );
      case 2:
        const {
          name,
          first_name,
          last_name,
          address,
          email,
          phone,
          club_name,
          health_core,
          style
        } = this.state.userdata;
        switch (this.state.recordtype) {
          case "team":
            return (
              <StepTwoTeam
                formprops={{
                  name,
                  last_name,
                  address,
                  email,
                  phone,
                  style,
                  picture
                }}
                handleChange={this.handleChange}
                handleChangeFile={this.handleChangeFile}
                handleErros={this.handleErros}
                AlertComponent={AlertsForms}
                setLastAlert={this.setLastAlert}
              />
            );

          default:
            return (
              <StepTwoIndividual
                formprops={{
                  first_name,
                  last_name,
                  address,
                  email,
                  club_name,
                  health_core,
                  phone
                }}
                handleChange={this.handleChange}
                handleErros={this.handleErros}
                AlertComponent={AlertsForms}
                setLastAlert={this.setLastAlert}
              />
            );
        }
      case 3:
        const {
          weight,
          level,
          event_kumite,
          event_seminar,
          event_kata,
          birthdate,
          gender
        } = this.state.userdata;
        return (
          <StepThreeIndividual
            formprops={{
              weight,
              level,
              event_kumite,
              event_seminar,
              event_kata,
              picture,
              birthdate,
              gender
            }}
            handleChange={this.handleChange}
            handleChangeFile={this.handleChangeFile}
            handleChangeDate={this.handleChangeDate}
            handleErros={this.handleErros}
            handleChangecheck={this.handleChangecheck}
            AlertComponent={AlertsForms}
            setLastAlert={this.setLastAlert}
          />
        );

      default:
        return null;
    }
  };

  render() {
    return !this.props.recordcomplete ? (
      <div className="main-form-block">
        <div>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            {this.getStep()}
            {this.getButtons()}
          </form>
        </div>
      </div>
    ) : (
      <RegisterSummari recordtype={this.state.recordtype} />
    );
  }
}

const maspStateToProps = state => {
  try {
    return {
      recordcomplete: state.userrecord.recordcomplete
    };
  } catch (e) {
    console.log(e);
    return {};
  }
};

const mapDispatchtoProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data)),
    setLastcallFormAlert: id => dispatch(setLastcallFormAlert(id)),
    fetchFormAlert: data => dispatch(fetchFormAlert(data)),
    validateUserdata: (data, calldata, call) =>
      dispatch(validateUserdata(data, calldata, call))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(MasterStepForm);
