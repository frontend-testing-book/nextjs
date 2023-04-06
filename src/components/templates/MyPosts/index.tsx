import { useLoginUserInfoState } from "@/components/providers/LoginUserInfo";
import { GetMyPostsReturn } from "@/services/server/MyPosts";
import { Posts } from "./Posts";
import { Profile } from "./Profile";
import styles from "./styles.module.css";

type Props = {
  posts: GetMyPostsReturn;
};

export const MyPosts = ({ posts }: Props) => {
  const { value: profile } = useLoginUserInfoState();
  return (
    <div className={styles.module}>
      <div className={styles.profile}>
        {profile && <Profile {...profile} />}
      </div>
      <div className={styles.posts}>
        <Posts {...posts} />
      </div>
    </div>
  );
};
