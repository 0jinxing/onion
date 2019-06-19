import React from "react";
import styles from "./List.css";

class List extends React.Component {
  render() {
    const items = this.props.items;
    return items && items.length ? (
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className={styles.empty}>empty</p>
    );
  }
}
export default List;
