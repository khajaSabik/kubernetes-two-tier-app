// src/components/summation.jsx
import React, { Component } from 'react';
import axios from 'axios';

class Summation extends Component {
    state = { 
        num1: "",
        num2: "",
        sum: ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = () => {
        // Use Kubernetes service name to access backend
        axios.post('http://python-backend-service:5000/summation', {
            num1: this.state.num1,
            num2: this.state.num2
        })
        .then(res => {
            this.setState({ sum: res.data.sum });
        })
        .catch(err => console.error(err));
    }

    render() { 
        return ( 
            <div className="container p-5">
                <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="number"
                               name="num1"
                               value={this.state.num1} 
                               className="form-control" 
                               onChange={this.handleChange} 
                               placeholder="Number 1"/>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="number"
                               name="num2"
                               value={this.state.num2} 
                               className="form-control" 
                               onChange={this.handleChange} 
                               placeholder="Number 2"/>
                    </div>
                    <button type="button" className="btn btn-success mb-2" onClick={this.handleSubmit}>Submit</button>
                </form>
                
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Sum</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Sum of the two numbers</h6>
                        <p className="card-text">{this.state.sum || ""}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summation;
