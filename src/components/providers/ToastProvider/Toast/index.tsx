import { useToastAction } from "@/components/providers/ToastProvider/hooks";
import { ToastStyle } from "@/components/providers/ToastProvider/ToastContext";
import { useState } from "react";
import { useTimeoutFn } from "react-use";
import Failed from "./assets/failed.svg";
import Succeed from "./assets/succeed.svg";
import styles from "./styles.module.css";

type Props = { message: string; style: ToastStyle };

export const Toast = ({ message, style }: Props) => {
  const [isMount, setIsMount] = useState(false);
  const { hideToast } = useToastAction();
  useTimeoutFn(() => {
    setIsMount(true);
  }, 50);
  useTimeoutFn(() => {
    hideToast();
  }, 2000);
  return (
    <p
      role="alert"
      className={styles.module}
      data-style={style}
      data-mounted={isMount}
    >
      {style === "succeed" ? (
        <Succeed role="presentation" />
      ) : (
        <Failed role="presentation" />
      )}
      {message}
    </p>
  );
};
