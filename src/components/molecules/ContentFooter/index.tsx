import clsx from "clsx";
import styles from "./styles.module.css";

type Props = React.ComponentPropsWithoutRef<"footer">;

export const ContentFooter = ({ className, ...props }: Props) => {
  return <footer className={clsx(className, styles.module)} {...props} />;
};
