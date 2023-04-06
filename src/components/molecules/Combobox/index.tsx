import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./styles.module.css";

type Props = {
  theme?: "dark" | "light";
  variant?: "small" | "medium" | "large";
} & React.ComponentPropsWithoutRef<"select">;

export const Combobox = forwardRef<HTMLSelectElement, Props>(function Combobox(
  { className, theme = "dark", variant = "medium", ...props },
  ref
) {
  return (
    <select
      {...props}
      ref={ref}
      className={clsx(className, styles.module)}
      data-theme={theme}
      data-variant={variant}
    />
  );
});
