import { useToastAction } from "@/components/providers/ToastProvider";
import { parseAsPositiveInt } from "@/lib/util";
import { postLike } from "@/services/client/Like";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Props } from "./";

export const useLikeButton = ({
  likeCount,
  liked,
  isMyPost,
  isLoggedIn,
}: Props) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const { query } = useRouter();
  const { handleSubmit, formState } = useForm();
  const { showToast } = useToastAction();
  const postId = Number(parseAsPositiveInt(query.postId));
  const isDisabled =
    formState.isSubmitting || isLiked || isMyPost || !isLoggedIn;
  const onSubmit = handleSubmit(async () => {
    try {
      await postLike({ postId });
      setIsLiked(true);
      setLocalLikeCount((prev) => prev + 1);
    } catch (err) {
      showToast({ message: "エラーが発生しました", style: "failed" });
    }
  });
  return { isLiked, isDisabled, localLikeCount, onSubmit };
};
