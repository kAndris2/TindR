import React, { Component } from 'react'
import axios from 'axios';
import moment from "moment";

import Loading from './Loading'
import AdminTicketTable from './AdminTicketTable'

export default class ShowTickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            tickets: []
        }

        this.getTickets = this.getTickets.bind(this);
        this.formatTickets = this.formatTickets.bind(this);
        this.updateTicket = this.updateTicket.bind(this);
    }

    getTickets() {
        axios.get(`${process.env.REACT_APP_IP}/api/get_all_tickets`)
        .then(response => {
            this.setState({
                tickets: response.data,
                isLoading: false
            });
        })
    }

    formatTickets(tickets) {
        const data = [];

        tickets.map(t => {
            data.push({
                id: t.id,
                date: moment(t.date).format("YYYY. MMM. D."),
                subject: t.subject,
                section: t.section,
                solved: t.solved === false ? "Open" : "Closed",
                steps: t.steps,
                notifier_id: t.notifier_id,
                solver_id: t.solver_id,
            })
        })
        return data;
    }

    async updateTicket(ticketID, newStatus) {
        this.setState({
            isLoading : true,
            tickets : []
        });

        await axios.put(`${process.env.REACT_APP_IP}/api/update_ticket/${ticketID}`, {
            "solved": newStatus,
            "solver_id": this.props.userID
        })
        .then(response => {
            this.setState({
                tickets: response.data,
                isLoading: false
            });
        })
    }

    componentDidMount() {
        this.getTickets();
    }

    render() {
        const { isLoading, tickets } = this.state;

        return(
            <>
                {isLoading !== true ?
                    <div style={{position:"fixed", top:"5%", left:"30%"}}>
                        <AdminTicketTable 
                            data={this.formatTickets(tickets)}
                            updateTicket={this.updateTicket}
                        />
                    </div>
                :
                    <div style={{position:"fixed", top:"10%", left:"50%"}}>
                        <Loading />
                    </div>
                }
            </>
        );
    }    
}