import { memo } from "react";
import styles from "./styles.module.css";

export const Footer = memo(function BaseFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>All rights reserved © Tech Posts</p>
    </footer>
  );
});
