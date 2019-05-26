import React from "react";
import PropType from "prop-types";
import classNames from "classnames";
import styles from "./Switch.css";

class Switch extends React.Component {
  constructor(props) {
    super(props);
    const checked = props.checked || false;
    this.state = {
      checked
    };
  }

  handleChange = e => {
    const { onChange } = this.props;
    const { checked } = this.state;

    this.setState({ checked: !checked });
    if (typeof onChange === "function") {
      onChange(!checked, e);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ("checked" in nextProps) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  render() {
    const { inline, ...rest } = this.props;
    const { checked } = this.state;
    return (
      <>
        <div
          {...rest}
          className={classNames(styles.switch, {
            [styles.checked]: checked,
            [styles.inline]: inline
          })}
          onClick={this.handleChange}
        />
      </>
    );
  }
}

Switch.propTypes = {
  onChange: PropType.func,
  checked: PropType.bool,
  inline: PropType.bool
};

export default Switch;
