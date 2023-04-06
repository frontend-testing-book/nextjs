import { Button } from "@/components/atoms/Button";
import { WatchCounter } from "@/components/atoms/WatchCounter";
import { ContentFooter } from "@/components/molecules/ContentFooter";
import { ContentHeader } from "@/components/molecules/ContentHeader";
import { TextareaWithInfo } from "@/components/molecules/TextareaWithInfo";
import { TextboxWithInfo } from "@/components/molecules/TextboxWithInfo";
import { GetMyProfileEditReturn } from "@/services/server/MyProfileEdit";
import { Avatar } from "./Avatar";
import styles from "./styles.module.css";
import { useMyProfileEdit } from "./useMyProfileEdit";

export type Props = {
  profile: GetMyProfileEditReturn;
};

export const MyProfileEdit = (props: Props) => {
  const { register, setValue, onSubmit, control, errors } =
    useMyProfileEdit(props);
  return (
    <form className={styles.module} onSubmit={onSubmit}>
      <ContentHeader
        title="プロフィール編集"
        description="登録されたプロフィールは一般公開され、誰でも閲覧できます"
        className={styles.contentHeader}
      />
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Avatar
            register={register}
            setValue={setValue}
            name={"imageUrl"}
            defaultImageUrl={props.profile.imageUrl}
          />
        </div>
        <div className={styles.profile}>
          <TextboxWithInfo
            {...register("name")}
            title="ユーザー名"
            className={styles.name}
            maxLength={32}
            info={<WatchCounter max={32} name="name" control={control} />}
            error={errors.name?.message}
          />
          <TextareaWithInfo
            {...register("bio")}
            title="自己紹介文"
            className={styles.bio}
            maxLength={128}
            rows={3}
            info={<WatchCounter max={128} name="bio" control={control} />}
            error={errors.bio?.message}
          />
          <div className={styles.accounts}>
            <TextboxWithInfo
              {...register("twitterAccount")}
              title="Twitter"
              className={styles.twitter}
              maxLength={64}
            />
            <TextboxWithInfo
              {...register("githubAccount")}
              title="GitHub"
              className={styles.github}
              maxLength={64}
            />
          </div>
        </div>
      </div>
      <ContentFooter className={styles.contentFooter}>
        <Button variant="large">プロフィールを変更する</Button>
      </ContentFooter>
    </form>
  );
};
