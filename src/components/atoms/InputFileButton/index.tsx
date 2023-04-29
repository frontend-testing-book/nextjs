import { Button } from "@/components/atoms/Button";
import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";
import styles from "./styles.module.css";

type Props = {
  buttonProps: ComponentProps<typeof Button>;
  inputProps: ComponentProps<"input"> & {
    [K in `data-${string}`]: string;
  };
  className?: string;
};

export const InputFileButton = forwardRef<HTMLInputElement, Props>(
  function InputFileButtonBase({ buttonProps, inputProps, className }, ref) {
    return (
      <div className={clsx(styles.module, className)}>
        <input aria-label="画像選択" {...inputProps} type="file" ref={ref} />
        <Button {...buttonProps} />
      </div>
    );
  }
);
