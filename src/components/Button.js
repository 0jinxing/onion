import React from "react";
import styles from './Button.css';

class Button extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return <button {...rest} className={styles.btn}>{children}</button>;
  }
}
export default Button;
