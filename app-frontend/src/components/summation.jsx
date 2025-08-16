// src/components/summation.jsx
import React, { Component } from 'react';
import axios from 'axios';

class Summation extends Component {
    state = { 
        num1: "",
        num2: "",
        sum: "",
        error: ""
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault(); // ✅ prevent page reload

        this.setState({ error: "" }); // clear old errors

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/summation`, {
            num1: this.state.num1,
            num2: this.state.num2
        })
        .then(res => {
            this.setState({ sum: res.data.sum });
        })
        .catch(err => {
            console.error("Request failed:", err);
            this.setState({ error: "Failed to fetch sum. Please check backend connection." });
        });
    };

    render() { 
        return ( 
            <div className="container p-5">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group mx-sm-3 mb-2">
                        <input
                            type="number"
                            name="num1"
                            value={this.state.num1}
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Number 1"
                        />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <input
                            type="number"
                            name="num2"
                            value={this.state.num2}
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Number 2"
                        />
                    </div>
                    <button type="submit" className="btn btn-success mb-2">
                        Submit
                    </button>
                </form>

                {this.state.error && (
                    <div className="alert alert-danger mt-3">{this.state.error}</div>
                )}
                
                <div className="card" style={{ width: "18rem" }}>
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
