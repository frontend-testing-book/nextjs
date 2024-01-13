import { render, screen } from '@testing-library/react';

import { getPostData } from '@/services/server/Post/__mock__/fixture';

import { Post } from './';

test('見出しの表示', () => {
  render(<Post post={getPostData} user={null} />);
  expect(
    screen.getByRole('heading', { name: 'Frontend Testing Example' }),
  ).toBeInTheDocument();
});

test('「Like」ボタンの表示', () => {
  render(<Post post={getPostData} user={null} />);
  expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
});
