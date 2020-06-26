//* Component Taken From: https://codesandbox.io/s/stupefied-star-7t0bz?file=/src/index.js:0-746
import React, { Component } from "react";
import autosize from "autosize";

class ExpandingCopyArea extends Component {
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }

  render() {
    const style = {
      // maxHeight: "75px",
      minHeight: "38px",
      resize: "none",
    //   padding: "9px",
      padding: "25px",
      boxSizing: "border-box",
      fontSize: "15px"
    };
    return (
      <>
        <textarea
          className={this.props.classes}
          style={style}
          ref={c => (this.textarea = c)}
          placeholder={this.props.placeholder}
          rows={1}
          defaultValue=""
          onChange={this.props.onChange}
          onClick={this.props.onChange}
        />
      </>
    );
  }
}

export default ExpandingCopyArea;