import React, { Component } from 'react'
import axios from 'axios';
import moment from "moment";

import Loading from './Loading'

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoading: true
        }

        this.getUsers = this.getUsers.bind(this);
    }

    async getUsers() {
        await axios.get(`${process.env.REACT_APP_IP}/api/users`)
        .then(response => {
            this.setState({
                users : response.data,
                isLoading : false
            })
        })
    }

    async componentDidMount() {
        await this.getUsers();
    }

    render() {
        const { users, isLoading } = this.state;

        return(
            <>
                <div style={{position:"fixed", top:"5%", left:"35%", width:'50%'}}>
                    {isLoading === false ?
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Birthdate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u =>
                                    <tr>
                                        <th scope="row">{u.id}</th>
                                        <td>{u.name}</td>
                                        <td>{moment(u.birthdate).format("YYYY. MMM. D.")}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    :
                        <Loading />
                    }
                </div>
            </>
        );
    }
}