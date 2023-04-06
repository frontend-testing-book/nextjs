import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { Textbox } from "@/components/atoms/Textbox";
import { ComponentProps, forwardRef, useId } from "react";
import styles from "./styles.module.css";

type Props = ComponentProps<typeof Textbox> & {
  error?: string;
};

export const TextboxWithError = forwardRef<HTMLInputElement, Props>(
  function TextboxWithError({ error, ...props }, ref) {
    const errorMessageId = useId();
    return (
      <>
        <Textbox
          {...props}
          ref={ref}
          aria-invalid={!!error}
          aria-errormessage={errorMessageId}
        />
        {error && (
          <ErrorMessage id={errorMessageId} className={styles.error}>
            {error}
          </ErrorMessage>
        )}
      </>
    );
  }
);
