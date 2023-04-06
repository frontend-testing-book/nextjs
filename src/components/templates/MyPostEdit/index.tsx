import { AlertDialog } from "@/components/organisms/AlertDialog";
import { GetMyPostReturn } from "@/services/server/MyPost";
import { PostForm } from "./PostForm";
import { useMyPostEdit } from "./useMyPostEdit";

type Props = {
  post: GetMyPostReturn;
};

export const MyPostEdit = ({ post }: Props) => {
  const { onClickSave, onClickDelete, onValid, onInvalid } = useMyPostEdit({
    id: post.id,
  });
  return (
    <PostForm
      title="記事編集"
      defaultValues={{ ...post }}
      onClickSave={onClickSave}
      onClickDelete={onClickDelete}
      onValid={onValid}
      onInvalid={onInvalid}
    >
      <AlertDialog />
    </PostForm>
  );
};
