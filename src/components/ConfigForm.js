import React from "react";
import { createForm } from "rc-form";

import Input from "./Input";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

class ConfigForm extends React.Component {
  render() {
    return (
      <>
        <label className="field">
          <h2>Proxy URI</h2>
          <div className="field-container">
            <Input placeholder="Enter Your Proxy URI" />
          </div>
        </label>
        <div className="field">
          <h2>User Rules</h2>
          <div className="field-container">
            <ul>
              <li>baidu.com</li>
            </ul>
          </div>
        </div>
        <style jsx>{`
          .h2 {
            font-size: 18px;
            text-decoration: underline;
          }
          .field :global(input) {
            font-size: 16px;
            color: #EC6A69;
          }
          .field {
            display: block;
            margin-bottom: 32px;
          }
        `}</style>
      </>
    );
  }
}

export default createForm()(ConfigForm);
