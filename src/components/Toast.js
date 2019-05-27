import React from "react";
import classNames from "classnames";

import styles from "./Toast.css";

class Toast extends React.Component {
  state = {
    type: "info",
    message: "",
    visible: false,
    first: true
  };

  show = ({ type, message }) => {
    this.setState({ type, message, visible: true, first: false });
    setTimeout(() => {
      this.setState({ visible: false });
    }, 3000);
  };

  render() {
    const { type, visible, message, first } = this.state;
    return visible || !first ? (
      <div className={classNames(styles.toast, { [styles.hide]: !visible })}>
        <div className={styles.container}>
          <i className={classNames(styles.icon, styles[type])} />
          {message}
        </div>
      </div>
    ) : null;
  }
}

export default Toast;
