import React from "react";
import PropTypes from "prop-types";
import styles from "./Radio.css";

class Radio extends React.Component {
  handleChange = e => {
    const { onChange } = this.props;
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  render() {
    const { value, checked, children, name, disabled } = this.props;
    return (
      <div className={styles.radio}>
        <label>
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={this.handleChange}
            disabled={disabled}
          />
          <span className={styles.radioDot} />
          <span className={styles.radioContainer}>{children}</span>
        </label>
      </div>
    );
  }
}

Radio.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

export default Radio;
