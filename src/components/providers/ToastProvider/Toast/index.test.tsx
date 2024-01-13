import { render, screen } from '@testing-library/react';

import {
  ToastProvider,
  ToastState,
} from '@/components/providers/ToastProvider';

test('Succeed', () => {
  const state: ToastState = {
    isShown: true,
    message: '成功しました',
    style: 'succeed',
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole('alert')).toHaveTextContent(state.message);
});

test('Failed', () => {
  const state: ToastState = {
    isShown: true,
    message: '失敗しました',
    style: 'failed',
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole('alert')).toHaveTextContent(state.message);
});

test('Busy', () => {
  const state: ToastState = {
    isShown: true,
    message: '通信中…',
    style: 'busy',
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole('alert')).toHaveTextContent(state.message);
});
