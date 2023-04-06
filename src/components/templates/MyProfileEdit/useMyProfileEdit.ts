import { useLoginUserInfoAction } from "@/components/providers/LoginUserInfo";
import { useToastAction } from "@/components/providers/ToastProvider";
import { PutInput } from "@/pages/api/my/profile/edit";
import { updateMyProfileEdit } from "@/services/client/MyProfileEdit";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Props } from ".";

export function useMyProfileEdit({ profile }: Props) {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PutInput>({
    defaultValues: profile,
  });
  const { showToast } = useToastAction();
  const { updateProfile } = useLoginUserInfoAction();
  const onSubmit = handleSubmit(async (input) => {
    try {
      showToast({ message: "保存中…", style: "busy" });
      await updateMyProfileEdit({ input });
      await router.push("/my/posts");
      showToast({ message: "保存に成功しました", style: "succeed" });
      updateProfile();
    } catch (err) {
      showToast({ message: "保存に失敗しました", style: "failed" });
    }
  });
  return { register, setValue, onSubmit, control, errors };
}
