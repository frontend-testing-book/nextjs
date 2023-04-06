import { AlertDialog } from "@/components/organisms/AlertDialog";
import { useAlertDialogAction } from "@/components/organisms/AlertDialog/hooks";
import { useToastAction } from "@/components/providers/ToastProvider";
import { createMyPosts } from "@/services/client/MyPosts";
import { useRouter } from "next/router";
import { PostForm } from "./PostForm";

export const MyPostsCreate = () => {
  const router = useRouter();
  const { showToast } = useToastAction();
  const { showAlertDialog, hideAlertDialog } = useAlertDialogAction();
  return (
    <PostForm
      title="新規記事"
      onClickSave={(isPublish) => {
        if (!isPublish) return;
        showAlertDialog({ message: "記事を公開します。よろしいですか？" });
      }}
      onValid={async (input) => {
        const status = input.published ? "公開" : "保存";
        if (input.published) {
          hideAlertDialog();
        }
        try {
          showToast({ message: "保存中…", style: "busy" });
          const { id } = await createMyPosts({ input });
          await router.push(`/my/posts/${id}`);
          showToast({ message: `${status}に成功しました`, style: "succeed" });
        } catch (err) {
          showToast({ message: `${status}に失敗しました`, style: "failed" });
        }
      }}
      onInvalid={() => {
        hideAlertDialog();
      }}
    >
      <AlertDialog />
    </PostForm>
  );
};
