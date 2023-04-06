import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./styles.module.css";

type Props = {
  variant?: "small";
} & Omit<React.ComponentPropsWithoutRef<"input">, "type" | "role">;

export const Switch = forwardRef<HTMLInputElement, Props>(function Switch(
  { className, ...props },
  ref
) {
  return (
    <span className={clsx(className, styles.module)}>
      <input {...props} ref={ref} type="checkbox" role="switch" />
      <span />
    </span>
  );
});
