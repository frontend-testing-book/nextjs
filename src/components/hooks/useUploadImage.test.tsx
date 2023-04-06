import { UploadImageData } from "@/services/client/UploadImage";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { useUploadImage } from "./useUploadImage";

function TestComponent({
  onChange,
  onResolved,
  onRejected,
}: {
  onChange?: (path: string[]) => void;
  onResolved?: (data: UploadImageData) => void;
  onRejected?: (err: unknown) => void;
}) {
  const { register, setValue } = useForm();
  const { onChangeImage, imageUrl } = useUploadImage({
    register,
    setValue,
    onResolved,
    onRejected,
    name: "image",
  });
  return (
    <>
      {imageUrl && <p>selected</p>}
      <input
        type={"file"}
        data-testid="file"
        onChange={(event) => {
          onChangeImage(event);
          onChange?.([event.target.value]);
        }}
      />
    </>
  );
}

describe("useUploadImage", () => {
  test("画像を選択すると imageUrl の値が truty になる", async () => {
    mockUploadImage();
    const mock = jest.fn();
    render(<TestComponent onChange={mock} />);
    const { filePath, selectImage } = selectImageFile();
    await selectImage();
    expect(mock).toHaveBeenCalledWith(filePath);

    await waitFor(() =>
      expect(screen.getByText("selected")).toBeInTheDocument()
    );
  });

  test("アップロードに成功したとき、onResolved が呼ばれる", async () => {
    mockUploadImage();
    const handleResolved = jest.fn();
    render(<TestComponent onResolved={handleResolved} />);
    const { selectImage } = selectImageFile();
    await selectImage();
    await waitFor(() => expect(handleResolved).toHaveBeenCalled());
  });

  test("アップロードに失敗したとき、onRejected が呼ばれる", async () => {
    mockUploadImage(500);
    const handleRejected = jest.fn();
    render(<TestComponent onRejected={handleRejected} />);
    const { selectImage } = selectImageFile();
    await selectImage();
    await waitFor(() => expect(handleRejected).toHaveBeenCalled());
  });
});
