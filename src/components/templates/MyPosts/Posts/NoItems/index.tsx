import { LinkButton } from "@/components/atoms/LinkButton";
import styles from "./styles.module.css";

export const NoItems = () => {
  return (
    <div className={styles.noitems}>
      <h3 className={styles.heading}>投稿記事がありません</h3>
      <p>
        <LinkButton href={"/my/posts/create"}>
          はじめての記事を書いてみましょう
        </LinkButton>
      </p>
    </div>
  );
};
