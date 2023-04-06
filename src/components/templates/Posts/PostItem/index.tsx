import { GetPostsReturn } from "@/services/server/Posts";
import Link from "next/link";
import { useId } from "react";
import Like from "./assets/like.svg";
import styles from "./styles.module.css";

export const PostItem = ({ post }: { post: GetPostsReturn["posts"][0] }) => {
  const titleId = useId();
  return (
    <li key={post.id} className={styles.item}>
      <Link href={`/posts/${post.id}`} passHref legacyBehavior>
        <a aria-labelledby={titleId}>
          <img src={post.imageUrl || ""} alt="" />
          <div className={styles.content}>
            <div className={styles.description}>
              <p className={styles.title} id={titleId}>
                {post.title}
              </p>
              <p className={styles.authorName}>{post.authorName}</p>
            </div>
            <p className={styles.like}>
              {post.likeCount}
              <Like />
            </p>
          </div>
        </a>
      </Link>
    </li>
  );
};
