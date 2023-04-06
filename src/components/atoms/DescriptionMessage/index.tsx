import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./styles.module.css";

type Props = ComponentPropsWithoutRef<"p">;

export const DescriptionMessage = forwardRef<HTMLParagraphElement, Props>(
  function DescriptionMessage({ className, ...props }, ref) {
    return (
      <p {...props} ref={ref} className={clsx(className, styles.module)} />
    );
  }
);
