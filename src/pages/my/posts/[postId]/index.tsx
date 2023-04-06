import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { Error } from "@/components/templates/Error";
import { MyPost } from "@/components/templates/MyPost";
import { withLogin } from "@/lib/next/gssp";
import { NextPageWithGsspResult } from "@/lib/next/type";
import { parseAsPositiveInt } from "@/lib/util";
import { getMyPost, GetMyPostReturn } from "@/services/server/MyPost";

type Props = {
  post: GetMyPostReturn;
};

const Page: NextPageWithGsspResult<Props> = ({ data, err }) => {
  return err ? <Error {...err} /> : <MyPost {...data} />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(({ data }) => data?.post.title);

export const getServerSideProps = withLogin<Props>(async ({ query, user }) => {
  const postId = parseAsPositiveInt(query.postId) || 0;
  return { post: await getMyPost({ id: postId, authorId: user.id }) };
});

export default Page;
