import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props;
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
    const { value } = this.state;
    return (
      <>
        <input className="input" onChange={this.handleChange} value={value} />
        <style jsx>{`
          .input {
            outline: none;
            border: 1px solid #aaa;
            padding: 6px 8px;
            border-radius: 4px;
            box-shadow: none;
            transition: all 0.2s linear;
          }
          .input:focus {
            box-shadow: 0 0 3px #9055a2;
            border-color: #9055a2;
          }
        `}</style>
      </>
    );
  }
}

export default Input;
