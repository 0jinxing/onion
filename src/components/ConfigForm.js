import React from "react";
import { createForm } from "rc-form";
import Input from './Input';

class ConfigForm extends React.Component {
  render() {
    return <Input />;
  }
}

export default createForm()(ConfigForm);
