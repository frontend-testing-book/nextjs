import { PostFormFooter } from "@/components/molecules/PostFormFooter";
import { PostFormHeroImage } from "@/components/molecules/PostFormHeroImage";
import { PostFormInfo } from "@/components/molecules/PostFormInfo";
import { TextareaWithInfo } from "@/components/molecules/TextareaWithInfo";
import { createMyPostInputSchema } from "@/lib/schema/MyPosts";
import { PostInput } from "@/pages/api/my/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styles from "./styles.module.css";

type Props<T extends FieldValues = PostInput> = {
  title: string;
  children?: React.ReactNode;
  onClickSave: (isPublish: boolean) => void;
  onValid: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
};

export const PostForm = (props: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(createMyPostInputSchema),
  });
  return (
    <form
      aria-label={props.title}
      className={styles.module}
      onSubmit={handleSubmit(props.onValid, props.onInvalid)}
    >
      <div className={styles.content}>
        <div className={styles.meta}>
          <PostFormInfo register={register} control={control} errors={errors} />
          <PostFormHeroImage
            register={register}
            setValue={setValue}
            name="imageUrl"
            error={errors.imageUrl?.message}
          />
        </div>
        <TextareaWithInfo
          {...register("body")}
          title="本文"
          rows={20}
          error={errors.body?.message}
        />
      </div>
      <PostFormFooter
        isSubmitting={isSubmitting}
        register={register}
        control={control}
        onClickSave={props.onClickSave}
      />
      {props.children}
    </form>
  );
};
