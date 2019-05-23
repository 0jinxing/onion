import React from "react";
import classNames from "classnames";

class Input extends React.Component {
  constructor(props) {
    super(props);
    const { value = "" } = props;
    this.state = { value };
  }

  handleChange = e => {
    const { onChange } = this.props;
    this.setState({ value: e.target.value });
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render() {
    const { ...rest } = this.props;
    const { value } = this.state;
    return (
      <>
        <input {...rest} onChange={this.handleChange} value={value} />
        <style jsx>{`
          input {
            outline: none;
            border: none;
            padding: 6px 0;
            border-bottom: 1px solid #aaa;
            box-shadow: none;
            transition: all 0.2s linear;
            color: #222;
          }
          input:focus,
          input:hover {
            border-color: #9055a2;
            border-bottom-width: 1px;
          }
          :global(::-webkit-input-placeholder) {
            color: #cccccc;
          }
        `}</style>
      </>
    );
  }
}

export default Input;
