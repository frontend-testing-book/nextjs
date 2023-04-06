import { WatchCounter } from "@/components/atoms/WatchCounter";
import { TextareaWithInfo } from "@/components/molecules/TextareaWithInfo";
import { TextboxWithInfo } from "@/components/molecules/TextboxWithInfo";
import { PutInput } from "@/pages/api/my/posts/[postId]";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import styles from "./styles.module.css";

type Props<T extends FieldValues = PutInput> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
};

export const PostFormInfo = ({ register, control, errors }: Props) => {
  return (
    <div className={styles.info}>
      <TextboxWithInfo
        {...register("title")}
        title="記事タイトル"
        className={styles.title}
        maxLength={64}
        info={<WatchCounter max={64} name="title" control={control} />}
        error={errors.title?.message}
      />
      <TextareaWithInfo
        {...register("description")}
        title="記事概要"
        className={styles.description}
        rows={2}
        maxLength={128}
        info={<WatchCounter max={128} name="description" control={control} />}
        error={errors.description?.message}
      />
    </div>
  );
};
