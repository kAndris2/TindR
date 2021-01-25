import React, { Component } from 'react'
import axios from 'axios';
import moment from "moment";

import Table from './Table';
import Loading from './Loading'

export default class CreateTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      section: "",
      steps: "",
      isLoading: true,
      tickets: [],
      columns: [
          {
              Header: "#",
              accessor: "index",
          },
          {
            Header: "Date",
            accessor: "date",
          },
          {
              Header: "Subject",
              accessor: "subject",
          },
          {
              Header: "Section",
              accessor: "section",
          },
          {
              Header: "Status",
              accessor: "solved",
          },
      ]
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
        [event.target.name] : event.target.value
    });
  }

  handleClick() {
    const { subject, section, steps, tickets } = this.state;

    this.setState({isLoading : true});

    const newTicket = {
        "notifier_id": this.props.userID,
        "subject": subject,
        "section": section,
        "steps": steps
    };

    axios.post(`${process.env.REACT_APP_IP}/api/create_ticket`, newTicket)
    .then(() => {
        const temp = tickets;
        temp.push(newTicket);

        this.setState({
            tickets, temp,
            isLoading : false
        });
    })
  }

  getFormattedTickets(tickets) {
    const data = [];
    let i = 0;

      tickets.map(t => {
          i++;
        data.push({
            index: `${i}.`,
            date: moment(t.date).format("YYYY. MMM. D."),
            subject: t.subject,
            section: t.section,
            solved: t.solved === false ? "Open" : "Closed",
            steps: t.steps, 
        })
      })
      return data;
  }

  getTickets() {
    axios.get(`${process.env.REACT_APP_IP}/api/get_tickets/${this.props.userID}`)
    .then(response => {
        console.log(response)
      this.setState({
          isLoading : false,
          tickets : response.data
      });
    });
}

  componentDidMount() {
    this.getTickets();
  }

  render() {
    const { isLoading, tickets, columns } = this.state;

      return(
          <>
            <div style={{position:"fixed", top:"5%", left:"45%"}}>
                <h1>Report us a bug:</h1>

                <fieldset className="form-group">
                    <label>Subject:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            name="subject"
                            className="form-control"
                            placeholder="(eg.: I couldn't save my preferences.)"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                </fieldset>

                <fieldset className="form-group">
                    <label>Section:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            name="section"
                            className="form-control"
                            placeholder="(eg.: Settings)"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                </fieldset>

                <fieldset className="form-group">
                    <label>Steps:</label>
                    <div className="input-group">
                        <textarea
                            className="form-control"
                            name="steps"
                            placeholder="Describe the steps leading to the error separated by commas"
                            maxLength="500"
                            style={{width:"400px", height:"200px", resize:"none"}}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                </fieldset>

                <button 
                    type="button" 
                    class="btn btn-warning"
                    onClick={this.handleClick}
                >Send</button>

                {isLoading !== true ? 
                    <>
                        <br /><br />
                        <h1>My tickets:</h1>
                        <Table 
                            data={this.getFormattedTickets(tickets)}
                            columnsData={columns}
                        />
                    </>
                :
                    <div style={{margin:"auto", width:"30%"}}>
                        <Loading />
                    </div>
                }

            </div>
          </>
      );
  }
}