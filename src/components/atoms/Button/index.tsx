import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./styles.module.css";

type Props = {
  theme?: "dark" | "light" | "transparent" | "blue" | "error";
  variant?: "small" | "medium" | "large";
} & React.ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, Props>(function ButtonBase(
  { className, theme = "dark", variant = "medium", ...props },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(className, styles.module)}
      data-theme={theme}
      data-variant={variant}
    />
  );
});
