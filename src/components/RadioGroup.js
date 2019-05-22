import React from "react";
import PropTypes from "prop-types";

class RedioGroup extends React.Component {
  constructor(props) {
    super(props);
    const value = props.value || null;
    this.state = {
      value
    };
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
    const { children, ...rest } = this.props;
    const { value } = this.state;
    return (
      <div {...rest}>
        {React.Children.toArray(children).map((el, ind) => {
          return React.cloneElement(el, {
            key: ind,
            checked: el.props.value === value,
            onChange: this.handleChange
          });
        })}
      </div>
    );
  }
}

RedioGroup.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any
};

export default RedioGroup;
