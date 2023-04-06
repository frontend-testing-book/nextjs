import { LinkButton } from "@/components/atoms/LinkButton";
import { GetMyProfileReturn } from "@/services/server/MyProfile";
import { Accounts } from "./Accounts";
import Star from "./assets/star.svg";
import styles from "./styles.module.css";

type Props = GetMyProfileReturn;

export const Profile = (props: Props) => {
  return (
    <section role="region" aria-label="プロフィール" className={styles.module}>
      <div className={styles.profile}>
        <p className={styles.avatar}>
          <img src={props.imageUrl} alt="" />
        </p>
        <div className={styles.info}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.likes}>
            <Star /> {props.likeCount}
          </p>
          <p className={styles.bio}>{props.bio}</p>
          <LinkButton href={`/my/profile/edit`}>変更する</LinkButton>
        </div>
      </div>
      <Accounts
        githubAccount={props.githubAccount}
        twitterAccount={props.twitterAccount}
      />
    </section>
  );
};
