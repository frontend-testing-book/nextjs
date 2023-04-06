import { Button } from "@/components/atoms/Button";
import { Switch } from "@/components/atoms/Switch";
import { ContentFooter } from "@/components/molecules/ContentFooter";
import { PutInput } from "@/pages/api/my/posts/[postId]";
import { Control, UseFormRegister, useWatch } from "react-hook-form";
import styles from "./styles.module.css";

const SaveButton = ({
  name,
  control,
  onClickSave,
}: {
  name: "published";
  control: Control<PutInput>;
  onClickSave: (isPublish: boolean) => void;
}) => {
  const isPublish = useWatch({ name, control });
  return (
    <Button
      type={isPublish ? "button" : "submit"}
      variant="large"
      theme={isPublish ? "blue" : "dark"}
      onClick={() => {
        onClickSave(isPublish);
      }}
    >
      {isPublish ? "記事を公開する" : "下書き保存する"}
    </Button>
  );
};

export const PostFormFooter = ({
  control,
  isSubmitting,
  register,
  onClickSave,
  onClickDelete,
}: {
  control: Control<PutInput>;
  isSubmitting: boolean;
  register: UseFormRegister<any>;
  onClickSave: (isPublish: boolean) => void;
  onClickDelete?: () => void;
}) => {
  const name = "published";
  return (
    <ContentFooter>
      <fieldset className={styles.module} disabled={isSubmitting}>
        <div className={styles.save}>
          <SaveButton name={name} control={control} onClickSave={onClickSave} />
        </div>
        <div className={styles.status}>
          <label htmlFor={name}>公開ステータス</label>
          <Switch {...register(name)} id={name} />
        </div>
        {onClickDelete && (
          <div className={styles.delete}>
            <Button
              type="button"
              variant="large"
              theme="transparent"
              onClick={onClickDelete}
            >
              記事を削除する
            </Button>
          </div>
        )}
      </fieldset>
    </ContentFooter>
  );
};
