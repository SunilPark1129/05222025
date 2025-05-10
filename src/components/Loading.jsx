import React, { Component } from "react";
import "./styles/loading.style.css";

export class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Loading;
