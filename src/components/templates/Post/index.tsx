import { ContentHeader } from "@/components/molecules/ContentHeader";
import { Markdown } from "@/components/organisms/Markdown";
import { LoginUser } from "@/lib/schema/LoginUser";
import { GetPostReturn } from "@/services/server/Post";
import { LikeButton } from "./LikeButton";
import styles from "./styles.module.css";

type Props = {
  post: GetPostReturn;
  user: LoginUser | null;
};

export const Post = ({
  post: { title, description, imageUrl, body, authorId, likeCount, liked },
  user,
}: Props) => {
  return (
    <>
      <p
        className={styles.image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={styles.module}>
        <div className={styles.headGroup}>
          <ContentHeader
            title={title}
            description={description}
            className={styles.contentHeader}
          />
          <LikeButton
            likeCount={likeCount}
            liked={liked}
            isMyPost={authorId === user?.id}
            isLoggedIn={user !== null}
          />
        </div>
        <Markdown body={body!} />
      </div>
    </>
  );
};
