import clsx from "clsx";
import { useWatch } from "react-hook-form";
import styles from "./styles.module.css";

type Props = {
  max: number;
  name: string;
  control: any;
  className?: string;
};

export const WatchCounter = ({ max, name, control, className }: Props) => {
  const value = useWatch({ name, control });
  const length = value?.length || 0;
  return (
    <span
      className={clsx(className, styles.module)}
      data-invalid={length > max}
    >
      {length} / {max}
    </span>
  );
};
