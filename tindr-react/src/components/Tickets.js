import React, { Component } from 'react'
import axios from 'axios';
import moment from "moment";

export default class CreateTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tickets: []
    }
  }

  getTickets() {
      axios.get(`${process.env.REACT_APP_IP}/api/get_tickets/${this.props.userID}`)
      .then(response => {
        this.setState({
            tickets : response.data,
            isLoading : false
        });
      });
  }

  componentDidMount() {
      this.getTickets();
  }

  render() {
    const { isLoading, tickets } = this.state;
    console.log(tickets)

      return (
          <>
            {isLoading !== true ?
              <table class="table">

                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Notifier</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Section</th>
                        <th scope="col">Status</th>
                        <th scope="col">Solver</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map(ticket =>
                        <tr>
                            <th>{moment(ticket.date).format("YYYY. MMM. D.")}</th>
                            <td>{ticket.notifier_id}</td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.section}</td>
                            <td>{ticket.status === false ? "Open" : "Closed"}</td>
                            <td>{ticket.solver_id !== null ? ticket.solver_id : "-"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            :
                <h1>Loading</h1>
            }
          </>
      );
  }
}