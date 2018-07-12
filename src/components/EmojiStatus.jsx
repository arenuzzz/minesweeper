import React from "react";

import Emoji from "./Emoji.jsx";

import styles from "./EmojiStatus.less";

export default props => {
  const { status, mapper, restartGame } = props;

  return (
    <div className={styles.base} onClick={restartGame}>
      <Emoji type={mapper[status]} />
    </div>
  );
};
