import { Button } from "@/components/atoms/Button";
import { useAlertDialogAction, useAlertDialogState } from "./hooks";
import styles from "./styles.module.css";

export const AlertDialog = () => {
  const { isShown, message, okButtonLabel, cancelButtonLabel } =
    useAlertDialogState();
  const { hideAlertDialog } = useAlertDialogAction();
  if (!isShown) return null;
  return (
    <div className={styles.module}>
      <div className={styles.alertdialog} role="alertdialog" aria-label="確認">
        <p className={styles.message}>{message}</p>
        <footer className={styles.footer}>
          {cancelButtonLabel && (
            <Button type="button" theme="light" onClick={hideAlertDialog}>
              {cancelButtonLabel}
            </Button>
          )}
          {okButtonLabel && <Button type="submit">{okButtonLabel}</Button>}
        </footer>
      </div>
    </div>
  );
};
