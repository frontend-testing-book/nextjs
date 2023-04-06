import Link from "next/link";
import Pen from "./assets/Pen.svg";
import styles from "./styles.module.css";

export const Heading = () => {
  return (
    <h1 className={styles.heading}>
      <Link href={`/`} legacyBehavior>
        <a>
          <span className={styles.icon}>
            <Pen />
          </span>
          Tech Posts
        </a>
      </Link>
    </h1>
  );
};
