import clsx from "clsx";
import styles from "./styles.module.css";
import { useLikeButton } from "./useLikeButton";

export type Props = {
  likeCount: number;
  liked: boolean;
  isMyPost: boolean;
  isLoggedIn: boolean;
};
export const LikeButton = (props: Props) => {
  const { isLiked, isDisabled, localLikeCount, onSubmit } =
    useLikeButton(props);
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <button
        aria-label="Like"
        className={clsx(
          styles.button,
          isLiked && styles.liked,
          props.isMyPost && styles.myPost
        )}
        disabled={isDisabled}
      >
        {localLikeCount}
      </button>
      <p data-testid="likeStatus">
        {props.isMyPost ? "" : isLiked ? "Liked" : "Like"}
      </p>
    </form>
  );
};
