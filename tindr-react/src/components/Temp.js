import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';
export default class Temp extends Component {
    constructor(props){
        super(props);

        this.state={
            isLoading: true,
            data:''
        }
        this.calculateAlt=this.calculateAlt.bind(this);
    }

    async readData(){
        await axios.get("http://172.31.1.72")
        .then(resp => {
            this.setState({data:resp.data, isLoading:false})
        })
    }

    async componentDidMount(){
        await this.readData()
    }

    calculateAlt(){
        const P = parseFloat(this.state.data.pressure.split("h")[0]);
        //const P = 980.63;
        const T = parseFloat(this.state.data.temperature.split("C")[0]);
        //const T = 23.71;
        console.log(P,T);
        const sealevelpressure_hpa = 1013.25;
        
        return Math.round(((Math.pow((sealevelpressure_hpa/P),(1/5.257))-1)*(T+273.15)/0.0065 + Number.EPSILON)*100) / 100;
  
    }
      
    render() {
        const {data, isLoading} = this.state;
        
        if (isLoading){
            return(<div>I'm loading</div>)
        }
        return (
            <div className="container">
                 <div class="row">
                    <div class="col-sm-6">
                        <div class="card text-center">
                            <div class="card-header">Server 1</div>
                                <div class="card-body">
                                    <h5 class="card-title">Sensors Data</h5>
                                        <p class="card-text">
                                            Temperature : {data.temperature.split("C")[0]+" °C"}
                                        </p>
                                        <p>
                                            Humidity : {data.humidity}
                                        </p>
                                        <p>
                                            Pressure : {data.pressure}
                                        </p>
                                        <p>
                                            Altitude (calculated from pressure): {this.calculateAlt()} m
                                        </p>
                                    <a href="#" class="btn btn-primary">Button</a>
                                </div>
                            <div class="card-footer text-muted">Refreshed {moment(new Date(data.date[0]+"-"+data.date[1]+"-"+data.date[2]+"T"+data.date[3]+":"+data.date[4]+":"+data.date[5]+"Z")).fromNow()}</div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        
                    </div>
                </div>
            </div>
        )
    }
}
