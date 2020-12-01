import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
import axios from 'axios';
import moment from "moment";

class WelcomePage extends Component {
    constructor() {
      super();

      this.state = {
        userName: undefined,
        email: undefined,
        phoneNumber: undefined,
        password: undefined,
        confirmPass: undefined,
        birthDate: undefined,
        passions: undefined
      }

      this.handleLogin = this.handleLogin.bind(this);
      this.startRegister = this.startRegister.bind(this);
      this.regEnterUsername = this.regEnterUsername.bind(this);
      this.regEnterEmail = this.regEnterEmail.bind(this);
      this.isValidEmail = this.isValidEmail.bind(this);
      this.regEnterPhoneNumber = this.regEnterPhoneNumber.bind(this);
      this.isValidPhoneNumber = this.isValidPhoneNumber.bind(this);
      this.regEnterPassword = this.regEnterPassword.bind(this);
      this.regEnterBirthdate = this.regEnterBirthdate.bind(this);
      this.regEnterPassions = this.regEnterPassions.bind(this);
      this.doRegistration = this.doRegistration.bind(this);
    }

    handleLogin() {
      console.log("nope");
    }

    async startRegister() {
      await this.regEnterUsername();
    }

    async regEnterUsername(error = "") {
      const { value: username } = await Swal.fire({
        title: 'Registration step 1/6',
        input: 'text',
        inputLabel: 'Enter your username\n\n' + error,
        inputPlaceholder: '....',
        confirmButtonText: `Next`,
      })

      if (username.length <= 3)
        this.regEnterUsername("Username must have 4 characters long!");
      else {
        this.setState({userName : username});
        this.regEnterEmail();
      }
    }

    async regEnterEmail(error = "") {
      const { value: email } = await Swal.fire({
        title: 'Registration step 2/6',
        input: 'email',
        inputLabel: 'Enter your email\n\n' + error,
        inputPlaceholder: '....',
        confirmButtonText: `Next`,
      })

      const check = await this.isValidEmail(email)
      
      if (check) {
        this.setState({email : email});
        this.regEnterPhoneNumber();
      } 
      else
        this.regEnterEmail("This e-mail is already in use!")
    }

    async isValidEmail(email) {
      let temp = undefined;
      await axios.get("http://localhost:8000/api/valid_email/" + email)
      .then(response => {
          temp = response.data.length == 0
      })
      return temp;
    }

    async regEnterPhoneNumber(error = "") {
      let { value: phone } = await Swal.fire({
        title: 'Registration step 3/6',
        input: 'tel',
        inputLabel: 'Enter your phone number\n\n' + error,
        inputPlaceholder: '(eg.: "30/123-4567")',
        confirmButtonText: `Next`,
      })

      if (phone != undefined && this.isValidPhoneNumber(phone)) {
        this.setState({phoneNumber : phone});
        this.regEnterPassword();
      } 
      else 
        this.regEnterPhoneNumber(`Invalid phone number!\n'${phone}'`);
    }

    isValidPhoneNumber(phone) {
      if (phone.length < 11 || phone.length > 11)
        return false;

      for (let i = 0; i < phone.length; i++) {
        if (i == 2) {
          if (phone[i] != '/')
            return false;
        }
        else if (i == 6) {
          if (phone[i] != "-")
            return false;
        }
        else if (isNaN(phone[i]))
            return false;
      }
      return true;
    }

    async regEnterPassword(error = "", pw = "") {
      const { value: formValues } = await Swal.fire({
        title: 'Registration step 4/6',
        html:
          '<p>Enter your password</p>' +
          `<input id="swal-input1" class="swal2-input" type="password" value="${pw}">` +
          '<p>Confirm your password</p>' +
          `${error !== "" ? `<p>${error}</p>` : ""}` +
          '<input id="swal-input2" class="swal2-input" type="password">',
        focusConfirm: false,
        confirmButtonText: `Next`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      
      if (formValues[0] === formValues[1]) {
          this.setState({password : formValues[0]});
          this.regEnterBirthdate();
      }
      else
        this.regEnterPassword("Invalid confirm password!", formValues[0]);
    }

    async regEnterBirthdate(error = "") {
      const { value: birthdate } = await Swal.fire({
        title: 'Registration step 5/6',
        html: 
          '<p>Enter your birthdate</p>' +
          `${error !== "" ? `<p>${error}</p>` : ""}` +
          '<input id="swal-input1" class="swal1-input" type="date">',
          focusConfirm: false,
        confirmButtonText: `Next`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value
          ]
        }
      })

      if (birthdate[0] !== "") {
        this.setState({birthDate : moment(birthdate[0]).valueOf()});
        this.regEnterPassions();
      }
      else
        this.regEnterBirthdate("You didn't enter your birthdate!");
    }

    async regEnterPassions(error = "") {
      let { value: passions } = await Swal.fire({
        title: 'Registration step 6/6',
        input: 'text',
        inputLabel: 'Enter minimum 3 passions comma separated \n\n' + error,
        inputPlaceholder: '(eg.: "reading,coding,walking")',
        confirmButtonText: `Registration`,
      })
      
      if (passions.split(',').length >= 3) {
        this.setState({passions : passions});
        this.doRegistration();
      }
      else
        this.regEnterPassions("You have to enter minimum 3 passion!")
    }

    doRegistration() {
      const {userName, email, phoneNumber, password, birthDate, passions} = this.state
      axios.post("http://localhost:8000/api/register", {
        name: userName,
        email: email,
        phone_number: phoneNumber,
        password: password,
        birthdate: birthDate,
        passion: passions
      }).then(response => {
        this.props.setUser(response.data);
      })
    }
  
    render() {
      return (
        <>
          <Helmet>
              <title>Tinder | Dating, Make Friends & Meet New People</title>
          </Helmet>
  
          <section style={{ height:"100vh",
                            background: 'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url("https://tinder.com/static/build/m/b07fe760ab4714aa3e932a15657494e5.webp")',
                            backgroundRepeat:"no-repeat"}}
          >
            <nav className="navbar navbar-light bg-transparent justify-content-between">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="/">
                    <span className="sr-only">TindR</span>
                    <img src="logo.svg" width="55%"></img>
                </a>
              </div>   
  
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <a className="btn btn-success rounded-pill"
                    onClick={this.handleLogin}
                >
                    LOG IN
                </a>
              </div>
            </nav>
  
            <div className="container d-flex h-100 align-items-center">
              <div className="mx-auto text-center">
                <h1 className="mx-auto my-0" style={{fontSize:"800%"}}>
                  Swipe Right®
                </h1>
                <a  className="btn btn-danger js-scroll-trigger rounded-pill"
                    onClick={this.startRegister}
                >
                  CREATE ACCOUNT 
                </a>
              </div>
            </div>
  
          </section>
        </>
      );
    }
  }
  
  export default WelcomePage;