import { uploadImage, UploadImageData } from "@/services/client/UploadImage";
import { ChangeEvent, useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export function handleChangeFile(
  onValid: (result: ProgressEvent<FileReader>, file: File) => void,
  onInvalid?: (result: ProgressEvent<FileReader>, file: File) => void
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      onValid(event, file);
    };
    fileReader.onerror = (event) => {
      onInvalid?.(event, file);
    };
    fileReader.readAsDataURL(file);
  };
}

export function useUploadImage<T extends FieldValues>({
  name,
  defaultImageUrl,
  register,
  setValue,
  onResolved,
  onRejected,
}: {
  name: Path<T>;
  defaultImageUrl?: string | null;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  onResolved?: (data: UploadImageData) => void;
  onRejected?: (err: unknown) => void;
}) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  useEffect(() => {
    register(name);
  }, [register, name]);

  const onChangeImage = handleChangeFile((_, file) => {
    uploadImage({ file })
      .then((data) => {
        const imgPath = `${data.url}/${data.filename}` as PathValue<T, Path<T>>;
        setImageUrl(imgPath);
        setValue(name, imgPath);
        onResolved?.(data);
      })
      .catch(onRejected);
  });
  return { onChangeImage, imageUrl } as const;
}
