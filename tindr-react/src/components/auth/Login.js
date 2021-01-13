import React, { Component } from 'react'
import axios from 'axios';


export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",

            regErrors:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push('/');
    }

    handleSubmit(event){
        //destruct tho
        const {
            email,
            password
        } = this.state;

        axios.post(process.env.REACT_APP_IP+"/api/login", {
                email: email,
                password: password
            },
            {withCredentials: true}
        ).then(response => {
            if (response.data.status){
                this.handleSuccessfulAuth(response.data);
            }
            else {
                this.setState({regErrors: response.data})
            }
        }).catch( error => {
            console.log("login error", error);
        })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input onChange={this.handleChange} type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} name="email" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={this.handleChange} type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password"/>
                    </div>
                
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
