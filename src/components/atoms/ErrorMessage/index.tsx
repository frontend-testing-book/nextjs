import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css";

type Props = ComponentPropsWithoutRef<"p">;

export const ErrorMessage = forwardRef<HTMLParagraphElement, Props>(
  function ErrorMessage({ className, ...props }, ref) {
    return (
      <p
        {...props}
        role="alert"
        aria-live="off"
        ref={ref}
        className={clsx(className, styles.module)}
      />
    );
  }
);
