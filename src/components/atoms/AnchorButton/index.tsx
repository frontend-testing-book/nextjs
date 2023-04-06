import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./styles.module.css";

type Props = {
  theme?: "dark" | "light" | "transparent" | "blue" | "error";
  variant?: "small" | "medium" | "large";
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<"a">;

export const AnchorButton = forwardRef<HTMLAnchorElement, Props>(
  function AnchorButtonBase(
    { className, theme = "dark", variant = "medium", disabled, ...props },
    ref
  ) {
    return (
      <a
        {...props}
        ref={ref}
        className={clsx(className, styles.module)}
        aria-disabled={disabled}
        data-theme={theme}
        data-variant={variant}
      />
    );
  }
);
