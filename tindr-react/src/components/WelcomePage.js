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

      this.startLogin = this.startLogin.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.doLogin = this.doLogin.bind(this);
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

    async startLogin() {
      await this.handleLogin();
    }

    async handleLogin(error = "") {
      const { value: formValues } = await Swal.fire({
        title: 'Sign in',
        html:
          `${error !== "" ? `<p style="color:red">${error}</p>\n\n` : ""}` +
          '<p>Enter your email address</p>' +
          '<input id="swal-input1" class="swal2-input" type="email">' +
          '<p>Enter your email password</p>' +
          '<input id="swal-input2" class="swal2-input" type="password">',
        focusConfirm: false,
        confirmButtonText: `Sign in`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })

      if (formValues === undefined)
        console.log("cancel login")
      else if (formValues[0] == "" || formValues[1] == "") {
        this.handleLogin("You must be enter your username and your password!");
      }
      else
        this.doLogin(formValues[0], formValues[1]);
    }

    doLogin(email, password) {
      axios.post("http://172.31.1.57:8000/api/login", {
        email: email,
        password: password
      }).then(response => {
        if (response.data.length !== 0) {
          this.props.setUser(response.data);
        }
        else
          this.handleLogin("Incorrect e-mail or password!")
      })
    }

    async startRegister() {
      await this.regEnterUsername();
    }

    async regEnterUsername(error = "") {
      const { value: username } = await Swal.fire({
        title: 'Registration step 1/6',
        html:
          '<p>Enter your username</p>' +
          `${error !== "" ? `\n\n<p style="color:red">${error}</p>` : ""}` +
          '<input id="swal-input1" class="swal2-input" type="text">',
        focusConfirm: false,
        confirmButtonText: `Next`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value
          ]
        }
      })

      if (username !== undefined) {
        if (username[0] == "")
          this.regEnterUsername("You must be enter your username!");
        else if (username[0].length <= 3)
          this.regEnterUsername("Username must have 4 characters long!");
        else {
            this.setState({userName : username});
            this.regEnterEmail();
        }
      }
    }

    async regEnterEmail(error = "") {
      const { value: email } = await Swal.fire({
        title: 'Registration step 2/6',
        html:
          '<p>Enter your e-mail address</p>' +
          `${error !== "" ? `\n\n<p style="color:red">${error}</p>` : ""}` +
          '<input id="swal-input1" class="swal2-input" type="email" placeholder="(eg.: somebody@example.com)">',
        focusConfirm: false,
        confirmButtonText: `Next`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value
          ]
        }
      })

      if (email !== undefined) {
        if (email[0] == "")
          return this.regEnterEmail("You must be enter your e-mail address!")
        else if (email[0].includes("@") == false || email[0].includes(".") == false)
          return this.regEnterEmail("Invalid e-mail address!")
      
        const check = await this.isValidEmail(email[0])

        if (check) {
          this.setState({email : email[0]});
          this.regEnterPhoneNumber();
        } 
        else
          this.regEnterEmail("This e-mail is already in use!")
      }
    }

    async isValidEmail(email) {
      let temp = undefined;
      await axios.get("http://172.31.1.57:8000/api/valid_email/" + email)
      .then(response => {
          temp = response.data.length == 0
      })
      return temp;
    }

    async regEnterPhoneNumber(error = "") {
      const { value: phone } = await Swal.fire({
        title: 'Registration step 3/6',
        html:
          '<p>Enter your phone number</p>' +
          `${error !== "" ? `\n\n<p style="color:red">${error}</p>` : ""}` +
          '<input id="swal-input1" class="swal2-input" type="tel" placeholder="(eg.: 30/123-4567)">',
        focusConfirm: false,
        confirmButtonText: `Next`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value
          ]
        }
      })

      if (phone !== undefined) {
        if (phone[0] == "")
          this.regEnterPhoneNumber("You must be enter your phone number");
        else if (this.isValidPhoneNumber(phone[0])) {
          this.setState({phoneNumber : phone});
          this.regEnterPassword();
        } 
        else 
          this.regEnterPhoneNumber(`Invalid phone number!\n'${phone}'`);
      }
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
          `${error !== "" ? `<p style="color:red">${error}</p>` : ""}` +
          `<input id="swal-input1" class="swal2-input" type="password" value="${pw}">` +
          '<p>Confirm your password</p>' +
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
      
      if (formValues !== undefined) {
        if (formValues[0] == "" || formValues[1] == "")
          this.regEnterPassword("You must be enter your password and confirm it!");
        else if (formValues[0] === formValues[1]) {
            this.setState({password : formValues[0]});
            this.regEnterBirthdate();
        }
        else
          this.regEnterPassword("Invalid confirm password!", formValues[0]);
      }
    }

    async regEnterBirthdate(error = "") {
      const { value: birthdate } = await Swal.fire({
        title: 'Registration step 5/6',
        html: 
          '<p>Enter your birthdate</p>' +
          `${error !== "" ? `<p style="color:red">${error}</p>` : ""}` +
          '<input id="swal-input1" class="swal2-input" type="date">',
        focusConfirm: false,
        confirmButtonText: `Next`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value
          ]
        }
      })

      if (birthdate !== undefined) {
        if (birthdate[0] == "")
          this.regEnterBirthdate("You didn't enter your birthdate!");
        else {
          this.setState({birthDate : moment(birthdate[0]).valueOf()});
          this.regEnterPassions();
        }
      }
    }

    async regEnterPassions(error = "") {
      const { value: passions } = await Swal.fire({
        title: 'Registration step 6/6',
        html: 
          '<p>Enter minimum 3 passions comma separated</p>' +
          `${error !== "" ? `<p style="color:red">${error}</p>` : ""}` +
          '<input id="swal-input1" class="swal2-input" type="text" placeholder="(eg.: reading,coding,walking)">',
        focusConfirm: false,
        confirmButtonText: `Registration`,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value
          ]
        }
      })

      if (passions !== undefined) {
        if (passions[0].split(',').length >= 3) {
          this.setState({passions : passions[0]});
          this.doRegistration();
        }
        else
          this.regEnterPassions("You have to enter minimum 3 passion!")
      }
    }

    doRegistration() {
      const {userName, email, phoneNumber, password, birthDate, passions} = this.state
      axios.post("http://172.31.1.57:8000/api/register", {
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
                            backgroundRepeat:"no-repeat",
                            backgroundSize:"cover"}}
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
                    onClick={this.startLogin}
                >
                    LOG IN
                </a>
              </div>
            </nav>
  
            <div className="container d-flex h-100 align-items-center">
              <div className="mx-auto text-center">
                <h1 className="mx-auto my-0 text-white" style={{fontSize:"800%"}}>
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