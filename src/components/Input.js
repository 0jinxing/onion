import React from "react";
import styles from "./Input.css";

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
        <input
          {...rest}
          className={styles.input}
          onChange={this.handleChange}
          value={value}
        />
      </>
    );
  }
}

export default Input;
