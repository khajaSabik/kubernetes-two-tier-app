// src/components/reverser.jsx
import React, { Component } from 'react';
import axios from 'axios';

class Reverser extends Component {
    state = { 
        num: "",
        reverseNum: ""
    }

    handleChange = (e) => {
        this.setState({ num: e.target.value });
    }

    handleSubmit = () => {
        // Use Kubernetes service name to access backend
        axios.post('${process.env.REACT_APP_BACKEND_URL}/reverser', { num: this.state.num })
        .then(res => {
            this.setState({ reverseNum: res.data.num });
        })
        .catch(err => console.error(err));
    }

    render() { 
        return ( 
            <div className="container p-5">
                <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="number" className="sr-only">Number</label>
                        <input type="number"
                               value={this.state.num} 
                               className="form-control" 
                               id="number" 
                               onChange={this.handleChange} 
                               placeholder="1234"/>
                    </div>
                    <button type="button" className="btn btn-primary mb-2" onClick={this.handleSubmit}>Submit</button>
                </form>
                
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Reverse Number</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Click kore dekhe nao magic</h6>
                        <p className="card-text">{this.state.reverseNum || ""}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reverser;
