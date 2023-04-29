import { InputFileButton } from "@/components/atoms/InputFileButton";
import { useUploadImage } from "@/components/hooks/useUploadImage";
import { useToastAction } from "@/components/providers/ToastProvider";
import { PutInput } from "@/pages/api/my/posts/[postId]";
import clsx from "clsx";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import ImageIcon from "./assets/image.svg";
import styles from "./styles.module.css";

type Props<T extends FieldValues = PutInput> = {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  defaultImageUrl?: string | null;
  error?: string;
};

export const PostFormHeroImage = (props: Props) => {
  const { showToast } = useToastAction();
  const { onChangeImage, imageUrl } = useUploadImage({
    ...props,
    onRejected: () => {
      showToast({
        message: `画像のアップロードに失敗しました`,
        style: "failed",
      });
    },
  });
  return (
    <div className={styles.module}>
      {imageUrl && <img src={imageUrl} alt="" />}
      <InputFileButton
        className={clsx(styles.button, imageUrl && styles.hasImage)}
        buttonProps={{
          theme: props.error ? "error" : "dark",
          children: (
            <>
              <ImageIcon />
              <br />
              {props.error ? (
                <span>{props.error}</span>
              ) : (
                <span>
                  {imageUrl ? "イメージを変更する" : "イメージを選択する"}
                </span>
              )}
            </>
          ),
          type: "button",
          variant: "small",
        }}
        inputProps={{
          "data-testid": "file",
          accept: "image/png, image/jpeg",
          onChange: onChangeImage,
        }}
      />
    </div>
  );
};
