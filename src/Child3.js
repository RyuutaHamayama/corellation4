import React, { Component } from "react";

class Child3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.data2);
  }

  componentDidUpdate() {
    
  }

render() {
    return (
      <svg className="child3_svg">
        <g className="g"></g>
      </svg>
    );
  }
}

export default Child3;