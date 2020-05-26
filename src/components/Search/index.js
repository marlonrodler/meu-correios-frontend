import React, { Component } from 'react';

import api from "../../services/api";

import "./styles.css";

export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            order: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadOrder = async () => {
        //debugger
        const response = await api.post("/search", {
            codRastreio: this.state.value
          });
        this.setState({ order: response.data.events });
        console.log(this.state.order);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert('Um codigo de rastreio foi enviado: ' + this.state.value);
        event.preventDefault();
        this.loadOrder();
    }
    
    render(){
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                    <input name="codRastreio" id="codRastreio" value={this.state.value} onChange={this.handleChange}  placeholder="Insira o seu codigo de rastreio" required></input>
                    <input type="submit" value="OK"/>
                    </div>
                </form>
                <div className="row">
                    <div className="col">
                        <ul>
                            {this.state.order.map((item, index) => (
                                <li>
                                    <div className="row dirCol">
                                        <h2 key={index}>{item.status}</h2>
                                        <p key={index}>{item.data}</p>
                                        <p key={index}>{item.destino}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}