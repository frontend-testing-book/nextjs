import clsx from "clsx";
import styles from "./styles.module.css";

type Props = {
  title: string;
  description?: string | null;
  className?: string;
};

export const ContentHeader = ({ title, description, className }: Props) => {
  return (
    <header className={clsx(styles.module, className)}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
};
