import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { Error } from "@/components/templates/Error";
import { MyPosts } from "@/components/templates/MyPosts";
import { withLogin } from "@/lib/next/gssp";
import { NextPageWithGsspResult } from "@/lib/next/type";
import { parseAsNonEmptyString, parseAsPositiveInt } from "@/lib/util";
import { getMyPosts, GetMyPostsReturn } from "@/services/server/MyPosts";

type Props = {
  posts: GetMyPostsReturn;
  authorName: string;
};

const Page: NextPageWithGsspResult<Props> = ({ data, err }) => {
  return err ? <Error {...err} /> : <MyPosts {...data} />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(
  ({ data }) => `${data?.authorName}さんの投稿記事一覧`
);

export const getServerSideProps = withLogin<Props>(async ({ query, user }) => {
  const page = parseAsPositiveInt(query.page) || 0;
  const status = parseAsNonEmptyString(query.status);
  const published =
    status === "public" ? true : status === "private" ? false : undefined;
  return {
    posts: await getMyPosts({ page, published, authorId: user.id }),
    authorName: user.name,
  };
});

export default Page;
