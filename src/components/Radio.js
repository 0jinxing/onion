import React from "react";
import PropTypes from "prop-types";

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
      <div className="radio">
        <label>
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={this.handleChange}
            disabled={disabled}
          />
          <span className="radio-dot" />
          <span className="radio-container">{children}</span>
        </label>
        <style jsx>{`
          .radio {
            margin: 0 8px 8px 0;
          }
          .radio input[type="radio"] {
            display: none;
          }
          .radio label {
            position: relative;
            height: 1.4em;
            line-height: 1.4em;
            cursor: pointer;
          }
          .radio-container {
            margin-left: 1.8em;
          }
          .radio-dot {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            content: "";
            display: block;
            width: 1.2em;
            height: 1.2em;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 50%;
          }
          .radio input[type="radio"] + .radio-dot::after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            content: "";
            display: block;
            border-radius: 50%;
            width: 0.4em;
            height: 0.4em;
            background: transparent;
            transition: background 0.2s linear;
          }
          .radio input[type="radio"]:checked + .radio-dot {
            border-color: #EC6A69;
          }
          .radio input[type="radio"]:checked + .radio-dot::after {
            background: #EC6A69;
          }
        `}</style>
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
