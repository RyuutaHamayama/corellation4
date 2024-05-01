import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ x_scale: 10 });
  }

  componentDidUpdate() {
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;
  
    var data = this.props.data2;
    var selectedCategory = this.props.selectedCategory; // the selected radio button
    var selectedTarget = this.props.selectedTarget; // the selected target from dropdown
  
    if (!selectedCategory || !selectedTarget) {
        return; // exit early if selectedCategory or selectedTarget is not set
      }
    
      var temp_data = d3
        .rollups(
          data,
          (v) => {
            var mean = d3.mean(v, (d) => parseFloat(d[selectedTarget]));
            return isNaN(mean) ? 0 : mean; // use 0 if mean is NaN
          },
          (d) => d[selectedCategory]
        )
        .map(([key, value]) => ({ key, value }));
    

    var order;
    switch (selectedCategory) {
      case "sex":
        order = ["Male", "Female"];
        break;
      case "smoker":
        order = ["Yes", "No"];
        break;
      case "day":
        order = ["Thur", "Fri", "Sat", "Sun"];
        break;
      case "time":
        order = ["Lunch", "Dinner"];
        break;
      default:
        order = ["Thur", "Fri", "Sat", "Sun"];
    }
  
    temp_data.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
  
    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    var x_scale = d3
      .scaleBand()
      .domain(order)
      .range([margin.left, w])
      .padding(0.2);
  
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));
  
    var y_data = temp_data.map((item) => item.value);
    var y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);
  
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale));
  
    container
      .selectAll("rect")
      .data(temp_data)
      .join("rect")
      .attr("x", function (d) {
        return x_scale(d.key);
      })
      .attr("y", function (d) {
        return y_scale(d.value);
      })
      .attr("width", x_scale.bandwidth())
      .attr("height", function (d) {
        return h - y_scale(d.value);
      })
      .attr("fill", "lightgray");
    
      container
      .selectAll(".bar-value")
      .data(temp_data)
      .join("text")
      .attr("class", "bar-value")
      .attr("x", function (d) {
        var x = x_scale(d.key) + x_scale.bandwidth() / 2;
        return isNaN(x) ? 0 : x; // use 0 if x is NaN
      })
      .attr("y", function (d) {
        var y = y_scale(d.value) + 15;
        return isNaN(y) ? 0 : y; // use 0 if y is NaN
      })
      .text(function (d) {
        return isNaN(d.value) ? "" : d.value.toFixed(2); // use empty string if d.value is NaN
      })
      .attr("text-anchor", "middle")
      .attr("fill", "black"); // change the text color to black
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '10px'}}>
          <label>
            <input type="radio" name="category" value="sex" onChange={this.props.handleRadioChange} />
            sex
          </label>
          <label style={{ marginLeft: '10px'}}>
            <input type="radio" name="category" value="smoker" onChange={this.props.handleRadioChange} />
            smoker
          </label>
          <label style={{ marginLeft: '10px'}}>
            <input type="radio" name="category" value="day" onChange={this.props.handleRadioChange} />
            day
          </label>
          <label style={{ marginLeft: '10px'}}>
            <input type="radio" name="category" value="time" onChange={this.props.handleRadioChange} />
            time
          </label>
        </div>
        <svg className="child2_svg" style={{ marginTop: '20px' }}>
          <g className="g_2"></g>
        </svg>
      </div>
    );
  }
}

export default Child2;