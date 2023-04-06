みなさん、フロントエンド開発時のモックサーバーは何を使っていますか？モックサーバーといっても様々なアプローチがあると思いますが、最近活用している MSW が便利だったので紹介します。MSW（Mock Service Worker）はブラウザリクエストを Service Worker がインターセプトし、任意のレスポンスを返すことが出来るライブラリです。
https://mswjs.io/

次の様な Express 風ハンドラーで、モックレスポンスを表現することができます。なんとこのコードがブラウザで動いてしまいます。

```javascript
import { setupWorker, rest } from "msw";
const worker = setupWorker(
  rest.get("https://myapi.dev/csr", (req, res, ctx) => {
    return res(
      ctx.json({
        title: "CSR Source",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      })
    );
  })
);
worker.start();
```

本稿に掲載しているサンプルコードは以下のリポジトリで試すことができます。
https://github.com/taro-yamada/nextjs-msw-example

# SSR / CSR に両対応している

次の Component は直接 Native fetch 関数 で API を叩いているもので、useSWR も特別な使い方はしていません。先ほどの MSW ハンドラーを起動しているアプリにマウントするだけで、この Component はモックレスポンスを受け取ります。

```typescript
const Card = () => {
  const { data, error } = useSWR<Source>("csr", () =>
    fetch("https://myapi.dev/csr").then((res) => res.json())
  );
  if (error) return <>error!</>;
  if (!data) return <>...loading</>;
  return (
    <div>
      <h2 role="title">{data.title}</h2>
      <p>{data.text}</p>
    </div>
  );
};
```

ハンドラーは Service Worker（ブラウザ）だけでなく、Node プロセス（サーバー）でも動作します。次のコードは Next.js の page Component で、SSR / CSR を共存させている例です。

```typescript
import { Card } from "../components/organisms/Card";

const Home = (props: Props) => {
  return (
    <div>
      <h1>{props.data.title}</h1>
      <p>{props.data.text}</p>
      <Card />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data: Source = await fetch("https://myapi.dev/ssr").then((res) =>
    res.json()
  );
  return { props: { data } };
};

export default Home;
```

`https://myapi.dev/`へのリクエストは MSW がインターセプトしている間は、実際にリクエストが飛ぶことはありません。インターセプトの有無は環境変数で切り替えればよく、ハンドラー単位でも切り替え可能です。リクエストそのものを奪うため、BaaS などのモックも表現できます。

# ローカル開発・テスト・Storybook どこでも適用可能

これまで、テストや Storybook では fetch を再現するため、各々のコードにインラインモックを記述してきました。あるいは別途モックサーバープロセスを立ち上げ、それに依存してきました。MSW なら、この工数を一つにまとめることが出来ます。

サーバープロセスが不要になることで、一番恩恵を受けるのは Storybook をホスティングする様なシーンかもしれません。useSWR の様な Render-as-You-Fetch が紛れていても、ブラウザだけで完結するため、静的サイトとしてそのまま S3 や Netlify にデプロイできます。

先ほど紹介した Card Component の テスト・Storybook 例です。Card Component は useSWR で fetch をしているにも関わらず、次のコードで成立します。

```typescript
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { cache } from "swr";
import { server } from "../../../.mocks/server";
import { Card } from "./Card";

beforeEach(() => cache.clear());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("MSW and useSWR are in connect.", async () => {
  render(<Card />);
  await waitFor(() => screen.getByRole("title"));
  expect(screen.getByRole("title")).toHaveTextContent("CSR Source");
});
```

Storybook も Container / Presentational を意識する必要なく表現できてしまいます。

```typescript
import { Story } from "@storybook/react";
import React from "react";
import { Card } from "./Card";

const Template: Story = (args) => <Card {...args} />;

export const Index: Story = Template.bind({});
Index.storyName = "useSwr connected component";

export default {
  title: "Card",
};
```

このほか、MSW Storybook Addon などを使えば、追加で異常系の表現ができます。開発軸にもなりえる強力なツールだと感じているので、是非一度試してみてください。
