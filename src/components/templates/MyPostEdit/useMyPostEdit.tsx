import { useAlertDialogAction } from "@/components/organisms/AlertDialog/hooks";
import { useToastAction } from "@/components/providers/ToastProvider";
import * as ApiMyPost from "@/pages/api/my/posts/[postId]";
import { deleteMyPost, updateMyPost } from "@/services/client/MyPost";
import { useRouter } from "next/router";
import { useState } from "react";

export function useMyPostEdit({ id }: { id: number }) {
  const router = useRouter();
  const [action, setAction] = useState<"delete" | "save">();
  const { showToast } = useToastAction();
  const { showAlertDialog, hideAlertDialog } = useAlertDialogAction();

  const onClickSave = (isPublish: boolean) => {
    if (!isPublish) return;
    setAction("save");
    showAlertDialog({ message: "記事を公開します。よろしいですか？" });
  };

  const onClickDelete = () => {
    setAction("delete");
    showAlertDialog({ message: "記事を削除します。よろしいですか？" });
  };

  const handleSave = async (input: ApiMyPost.PutInput) => {
    const status = input.published ? "公開" : "保存";
    try {
      showToast({ message: "保存中…", style: "busy" });
      await updateMyPost({ id, input });
      await router.push(`/my/posts/${id}`);
      showToast({ message: `${status}に成功しました`, style: "succeed" });
    } catch (err) {
      showToast({ message: `${status}に失敗しました`, style: "failed" });
    }
  };

  const handleDelete = async () => {
    try {
      showToast({ message: "削除中…", style: "busy" });
      await deleteMyPost({ id });
      await router.push(`/my/posts`);
      showToast({ message: "削除に成功しました", style: "succeed" });
    } catch (err) {
      showToast({ message: "削除に失敗しました", style: "failed" });
    }
  };

  const onValid = async (input: ApiMyPost.PutInput) => {
    hideAlertDialog();
    switch (action) {
      case "delete":
        await handleDelete();
        break;
      case "save":
        await handleSave(input);
        break;
      default:
        if (!input.published) {
          await handleSave(input);
        }
        break;
    }
  };

  const onInvalid = async () => {
    hideAlertDialog();
    switch (action) {
      case "delete":
        await handleDelete();
        break;
      case "save":
        hideAlertDialog();
        break;
    }
  };

  return {
    onClickSave,
    onClickDelete,
    onValid,
    onInvalid,
  };
}
