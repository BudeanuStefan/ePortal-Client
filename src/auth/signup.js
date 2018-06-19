import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {strings} from '../localization';

import {signError, signUp} from '../actions';

import path from 'path';
import TextInput from '../components/text-input';
import DropdownList from '../components/dropdown-list';

import Header from '../components/header';
import Footer from '../components/footer';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muiTheme: getMuiTheme(),
      dialogStyle: {display: 'none'},
      isSubmitting: false,
      selectedLevel: null,
      selectedYear: null,
      selectedSpecialization: null,
    };

    this.onSelectLevel = this.onSelectLevel.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.onSelectSpecialization = this.onSelectSpecialization.bind(this);
  }

  onSelectLevel(value) {
    this.setState({
      selectedLevel: value
    });
  }

  onSelectYear(value) {
    this.setState({
      selectedYear: value
    });
  }

  onSelectSpecialization(value) {
    this.setState({
      selectedSpecialization: value
    });
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  getChildContext() {
    return {muiTheme: this.state.muiTheme};
  }

  static propTypes = {
    topOffset: PropTypes.number,
    leftOffset: PropTypes.number
  };

  componentDidMount() {
    this.setState({
      dialogStyle: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        top: this.props.topOffset,
        left: this.props.leftOffset
      }
    });

    $('#avatar_image').hide();
  }

  componentWillMount() {
    this.props.signError('');
  }

  submitForm = (e) => {
    e.preventDefault();

    const {isSubmitting} = this.state;

    if (isSubmitting) return;

    const registrationId = $('#registrationId').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const passwordConfirm = $('#passwordConfirm').val();
    const name = $('#name').val();
    // const yearOfStudy = $('#yearOfStudy').val();
    // const specialization = $('#specialization').val();
    // const level = $('#level').val();
    const yearOfStudy = this.state.selectedYear;
    const specialization = this.state.selectedSpecialization;
    const level = this.state.selectedLevel;
    const fileToUpload = document.getElementById('fileToUpload').files;

    if (email && password && passwordConfirm && name && registrationId && yearOfStudy && specialization && level) {
      if (email.length > 0 && password.length > 0 && passwordConfirm.length > 0 && name.length > 0 && registrationId.length > 0
          && yearOfStudy.length > 0 && specialization.length > 0 && level.length > 0) {

        if (password === passwordConfirm) {
          if (!isSubmitting) {
            $('#submit').html('<img src="/public/assets/images/spinner.gif"/>');
            this.setState({isSubmitting: true});
          }

          const failed = () => {
            $('#submit').html('Submit');
            this.setState({isSubmitting: false});
          };

          let avatar = null;

          if (fileToUpload) {
            if (fileToUpload[0]) {
              const filename = fileToUpload[0].name;

              if (filename && filename.length > 0) {
                const ext = path.extname(filename).toLowerCase();

                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.ico') {
                  avatar = fileToUpload[0];
                }
              }
            }
          }

          const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
          return sleep(300).then(() => {
            this.props.signUp({
              registrationId,
              email,
              password,
              name,
              avatar,
              yearOfStudy,
              specialization,
              level,
              failed
            });
          });
        }
      }
    }
  };

  signError = () => {
    if (this.props.error) {
      return (
          <div className="alert alert-danger">
            <strong>{this.props.error}</strong>
          </div>
      );
    }
  };

  uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const ext = path.extname(file.name).toLowerCase();

      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.ico') {
        let reader = new FileReader();

        reader.onload = function (e) {
          const avatar_image = $('#avatar_image');
          avatar_image.attr('src', e.target.result);
          const avatar_text = $('#avatar_text');
          avatar_text.attr('placeholder', file.name);
          avatar_image.show();
        };

        reader.readAsDataURL(file);
      }
    }
    else {
      $('#avatar_image').hide();
    }
  }

  renderButton = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%', height: '60px'}}>
          <RaisedButton
              label="Avatar Image"
              labelPosition="before"
              style={{marginLeft: 0, marginRight: 20}}
              containerElement="label"
          >
            <input
                type="file"
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  width: '100%',
                  opacity: 0,
                  marginRight: 20
                }}
                id="fileToUpload"
                name="fileToUpload"
                className="form-control"
                onChange={this.uploadFile}/>
          </RaisedButton>
          <div>
            <input id="avatar_text" type="text" readOnly="" className="form-control" placeholder=""/>
          </div>
          <div>
            <img id="avatar_image" width="50px" height="50px" alt="" className="img-circle"
                 style={{marginLeft: 4, marginRight: 4, verticalAlign: 'middle'}}/>
          </div>
        </div>
    );
  };

  validateId = (value) => {
    let error = '';
    if (!value || value.length <= 0) {
      error = 'Required';
    }
    if (value.length != 16) {
      error = 'Registration ID must be formed by 16 characters'
    }

    return error;
  };

  validateEmail = (value) => {
    let error = '';
    if (!value || value.length <= 0) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }

    return error;
  };

  validateName = (value) => {
    let error = '';
    if (!value || value.length <= 0) {
      error = 'Required';
    } else if (value.length < 4) {
      error = 'Must be 4 characters or more';
    } else if (value.length > 30) {
      error = 'Must be 30 characters or less';
    }

    return error;
  };

  validatePassword = (value) => {
    let error = '';
    if (!value || value.length <= 0) {
      error = 'Required';
    } else if (value.length < 4) {
      error = 'Must be 4 characters or more';
    } else if (value.length > 15) {
      error = 'Must be 15 characters or less';
    }

    return error;
  };

  validatePasswordConfirm = (value) => {
    let error = '';
    if (!value || value.length <= 0) {
      error = 'Required';
    }

    const password = $('#password').val();

    if (value !== password) {
      error = 'Passwords must match';
    }

    return error;
  };

  reset = () => {
    this._registrationId.reset();
    this._email.reset();
    this._password.reset();
    this._passwordConfirm.reset();
    this._name.reset();
    this._yearOfStudy.reset();
    this._level.reset();
    this._specialization.reset();

    $('#fileToUpload').val('');
    $('#avatar_image').attr('src', '').hide();
    $('#avatar_text').attr('placeholder', '');
  };

  renderOptions(level) {
    let options;
    switch (level) {
      case 'Bachelor':
        options = {
          year: ["1", "2", "3", "4"],
          specialization: ["Informatică Economică", "Contabilitate si informatica de gestiune", "Finante si banci", "Marketing", "Management"]
        };
        return options;
      case 'Master':
        options = {
          year: ["1", "2"],
          specialization: ["Software Development and Business Information Systems", "Sisteme informaționale pentru afaceri", "Analiza si strategii de marketing", "Banci si piete financiare", "Contabilitate, expertiza si audit"]
        };
        return options;
      case 'Doctor':
        options = {
          year: ["1", "2", "3"],
          specialization: ["Cibernetica si Statistica", "Contabilitate", "Economie", "Informatica Economica"]
        };
        return options;
      default:
        return options;
    }
  }

  render() {
    const optionsLevels = ['Licenta', 'Master', 'Doctorat'];
    let options = this.renderOptions(this.state.selectedLevel);

    const defaultOptionLevel = 'Please choose your level of study';
    const defaultOptionYear = 'Please choose your year of study';
    const defaultSpecialization = 'Please choose your specialization';

    return (
        <div>
          <Header/>
          <div style={{textAlign: 'center'}}>
            {this.signError()}
          </div>
          <div style={this.state.dialogStyle}>
            <form style={{
              width: '60%', height: '100%',
              marginTop: 20, marginBottom: 100
            }}
                  id='form_info'
                  name='form_info'
                  onSubmit={(e) => this.submitForm(e)}>
              <TextInput
                  ref={e => this._name = e}
                  label="Name"
                  name="name"
                  type="text"
                  validate={this.validateName}
                  placeholder="Please enter your name"
              />
              <TextInput
                  ref={e => this._registrationId = e}
                  label="Registration ID"
                  name="registrationId"
                  type="text"
                  validate={this.validateId}
              />
              <TextInput
                  ref={e => this._email = e}
                  label="Email"
                  name="email"
                  type="text"
                  validate={this.validateEmail}
              />
              <TextInput
                  ref={e => this._password = e}
                  label="Password"
                  name="password"
                  type="password"
                  validate={this.validatePassword}
                  placeholder="Please enter a password"
              />
              <TextInput
                  ref={e => this._passwordConfirm = e}
                  label="Confirm Password"
                  name="passwordConfirm"
                  type="password"
                  validate={this.validatePasswordConfirm}
                  placeholder="Please re-type password"
              />
              <DropdownList
                  ref={e => this._level = e}
                  options={optionsLevels}
                  onSelect={this.onSelectLevel}
                  value={this.state.selectedLevel ? this.state.selectedLevel : defaultOptionLevel}
                  label="Level"
              />
              {this.state.selectedLevel ?  <DropdownList
                  ref={e => this._specialization = e}
                  options={options.specialization}
                  onSelect={this.onSelectSpecialization}
                  value={this.state.selectedSpecialization ? this.state.selectedSpecialization : defaultSpecialization}
                  label="Specialization"
              />: ''}
              {this.state.selectedLevel ?  <DropdownList
                  ref={e => this._yearOfStudy = e}
                  options={options.year}
                  onSelect={this.onSelectYear}
                  value={this.state.selectedYear ? this.state.selectedYear : defaultOptionYear}
                  label="Year"
              />: ''}
              <div className="form-group">
                {this.renderButton()}
              </div>
              <div style={{clear: 'both'}}>&nbsp;</div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <button
                    id="submit"
                    type="submit"
                    value="Submit"
                    name="submit"
                    className="btn btn-lg btn-primary">Submit
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                    type="button"
                    value="Clear"
                    name="clear"
                    className="btn btn-lg btn-default"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.signError('');
                      this.reset();
                    }}>Clear
                </button>
              </div>
            </form>
          </div>
          <Footer/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signError: (error) => dispatch(signError(error)),
    signUp: ({registrationId, email, password, name, avatar, yearOfStudy, level, specialization, failed}) => dispatch(signUp({
      registrationId,
      email,
      password,
      name,
      avatar,
      yearOfStudy,
      level,
      specialization,
      failed
    }))
  }
};

export default Signup = withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
