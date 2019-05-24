import React from "react";
import PropType from "prop-types";
import classNames from "classnames";

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
          className={classNames("switch", { checked, inline })}
          onClick={this.handleChange}
        />
        <style jsx>{`
          .inline {
            display: inline-block;
          }
          .switch {
            cursor: pointer;
            position: relative;
            width: 4em;
            height: 2em;
            border-radius: 999px;
            margin-bottom: 8px;
            background: rgba(0, 0, 0, 0.2);
            box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
            transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
          }
          .checked {
            background: #EC6A69;
          }
          .switch::after {
            content: "";
            position: absolute;
            height: 1.6em;
            width: 1.6em;
            top: 0.2em;
            left: 0.2em;
            border-radius: 999px;
            background: #fff;
            transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
          }
          .checked::after {
            top: 0.2em;
            left: 2.2em;
          }
        `}</style>
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
