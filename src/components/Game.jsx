import React from "react";

import styles from "./Game.less";

export default props => (
  <div className={styles.base}>
    <div style={{ margin: "10px", fontSize: "30px" }}>
      <Emoji type="collision" />
      <span style={{ margin: "0 20px" }}>Minesweeper</span>
      <Emoji type="collision" />
    </div>
    {props.children}
  </div>
);
