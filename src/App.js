import React, { Component } from "react";
import "./App.css";
import Child1 from "./Child1";
import Child2 from "./Child2";
import Child3 from "./Child3";
import * as d3 from "d3";
import tips from "./tips.csv";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      selected: {
        sex: "",
        smoker: "",
        day: "",
        time: ""
      },
      target: ""
    };    
  }

  handleRadioChange = (event) => {
    this.setState({ selected: { sex: "", smoker: "", day: "", time: "", [event.target.value]: event.target.value } });
  };
  

  handleSelectChange = (event) => {
    console.log('Selected target:', event.target.value);
    this.setState({ target: event.target.value });
  };
  
  componentDidMount() {
    var self = this;
    d3.csv(tips, function (d) {
      return {
        tip: parseFloat(d.tip),
        total_bill: parseFloat(d.total_bill),
        size: parseInt(d.size),
        sex: d.sex,
        smoker: d.smoker,
        day: d.day,
        time: d.time,
      };
    })
      .then(function (csv_data) {
        var columns = Object.keys(csv_data[0]).filter(column => ["tip", "total_bill", "size"].includes(column));
        self.setState({ data: csv_data, columns: columns });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const selectedCategory = Object.keys(this.state.selected).find(key => this.state.selected[key]);

    return (
      <div className="parent">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            height: "40px",
          }}
        >
          <span>Select Target: </span>
          <select
            style={{ marginLeft: "10px" }}
            onChange={this.handleSelectChange}
          >
            {this.state.columns.map((column, index) => (
              <option key={index} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div className="child2">
      <Child2
        data2={this.state.data}
        selectedCategory={selectedCategory}
        selectedTarget={this.state.target}
        handleRadioChange={this.handleRadioChange}
      />
    </div>
          <div className="child3">
            <Child3 data2={this.state.data}></Child3>
          </div>
        </div>
        <div className="child1">
          <Child1 data1={this.state.data}></Child1>
        </div>
      </div>
    );
  }
}

export default App;
