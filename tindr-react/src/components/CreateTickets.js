import React, { Component } from 'react'
import axios from 'axios';

import Tickets from './Tickets';

export default class CreateTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      section: "",
      steps: "",
      isLoading: false
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
    const { subject, section, steps } = this.state;

    this.setState({isLoading : true});

    axios.post(`${process.env.REACT_APP_IP}/api/create_ticket`, {
        "notifier_id": this.props.userID,
        "subject": subject,
        "section": section,
        "steps": steps
    }).then(() => {
        this.setState({
            isLoading : false
        });
    })
  }

  render() {
    const { isLoading } = this.state;

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
                    <Tickets 
                        userID={this.props.userID}
                    />
                :
                    <h1>Loading</h1>
                }

            </div>
          </>
      );
  }
}