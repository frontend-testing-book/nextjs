import { GetMyPostsReturn } from "@/services/server/MyPosts";
import clsx from "clsx";
import Link from "next/link";
import { useId } from "react";
import styles from "./styles.module.css";

export const PostItem = ({ post }: { post: GetMyPostsReturn["posts"][0] }) => {
  const titleId = useId();
  return (
    <li className={clsx(styles.item, !post.published && styles.draft)}>
      <Link href={`/my/posts/${post.id}`} passHref legacyBehavior>
        {/* TODO: legacyBehavior 不要でも aria属性が適用できるようになれば a要素は削除する */}
        <a aria-labelledby={titleId}>
          {post.imageUrl && <img src={post.imageUrl} alt="" />}
          <div className={styles.content}>
            <p className={styles.title} id={titleId}>
              {post.title}
            </p>
            <p className={styles.description}>{post.description}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};
