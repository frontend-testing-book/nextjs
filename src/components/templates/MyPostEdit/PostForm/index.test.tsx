import { handleGetMyProfile } from '@/services/client/MyProfile/__mock__/msw';
import { mockUploadImage } from '@/services/client/UploadImage/__mock__/jest';
import { selectImageFile, setupMockServer } from '@/tests/jest';
import { composeStories } from '@storybook/testing-react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from './index.stories';

const { Default } = composeStories(stories);
const user = userEvent.setup();

function setup() {
  const onClickSave = jest.fn();
  const onClickDelete = jest.fn();
  const onValid = jest.fn();
  const onInvalid = jest.fn();
  render(
    <Default
      onClickSave={onClickSave}
      onClickDelete={onClickDelete}
      onValid={onValid}
      onInvalid={onInvalid}
    />,
  );
  async function typeTitle(title: string) {
    const textbox = screen.getByRole('textbox', { name: '記事タイトル' });
    await user.type(textbox, title);
  }
  async function saveAsPublished() {
    await user.click(screen.getByRole('switch', { name: '公開ステータス' }));
    await user.click(screen.getByRole('button', { name: '記事を公開する' }));
  }
  async function saveAsDraft() {
    await user.click(screen.getByRole('button', { name: '下書き保存する' }));
  }
  async function clickDelete() {
    await user.click(screen.getByRole('button', { name: '記事を削除する' }));
  }
  return {
    typeTitle,
    saveAsDraft,
    saveAsPublished,
    clickDelete,
    onClickSave,
    onClickDelete,
    onValid,
    onInvalid,
  };
}

setupMockServer(handleGetMyProfile());

test('不適正内容で保存を試みると、バリデーションエラーが表示される', async () => {
  const { saveAsDraft } = setup();
  await saveAsDraft();
  await waitFor(() =>
    expect(
      screen.getByRole('textbox', { name: '記事タイトル' }),
    ).toHaveErrorMessage('1文字以上入力してください'),
  );
});

test('不適正内容で保存を試みると、onInvalid イベントハンドラーが実行される', async () => {
  const { saveAsDraft, onClickSave, onValid, onInvalid } = setup();
  await saveAsDraft();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).not.toHaveBeenCalled();
  expect(onInvalid).toHaveBeenCalled();
});

test('適正内容で「下書き保存」を試みると、onValid イベントハンドラーが実行される', async () => {
  mockUploadImage();
  const { typeTitle, saveAsDraft, onClickSave, onValid, onInvalid } = setup();
  const { selectImage } = selectImageFile();
  await typeTitle('私の技術記事');
  await selectImage();
  await saveAsDraft();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).toHaveBeenCalled();
  expect(onInvalid).not.toHaveBeenCalled();
});

test('適正内容で「記事を公開」を試みると、onClickSave イベントハンドラーのみ実行される', async () => {
  const { typeTitle, saveAsPublished, onClickSave, onValid, onInvalid } =
    setup();
  await typeTitle('私の技術記事');
  await saveAsPublished();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).not.toHaveBeenCalled();
  expect(onInvalid).not.toHaveBeenCalled();
});

test('「記事を削除する」ボタンを押下すると、onClickDelete イベントハンドラーが実行される', async () => {
  const { clickDelete, onClickDelete } = setup();
  await clickDelete();
  expect(onClickDelete).toHaveBeenCalled();
});
