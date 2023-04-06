import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { Error } from "@/components/templates/Error";
import { Post } from "@/components/templates/Post";
import { withoutLogin } from "@/lib/next/gssp";
import { NextPageWithGsspResult } from "@/lib/next/type";
import { LoginUser } from "@/lib/schema/LoginUser";
import { parseAsPositiveInt } from "@/lib/util";
import { getPost, GetPostReturn } from "@/services/server/Post";

type Props = {
  post: GetPostReturn;
  user: LoginUser | null;
};

const Page: NextPageWithGsspResult<Props> = ({ data, err }) => {
  return err ? <Error {...err} /> : <Post {...data} />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(({ data }) => data?.post.title);

export const getServerSideProps = withoutLogin<Props>(
  async ({ query, user }) => {
    const postId = parseAsPositiveInt(query.postId) || 0;
    const post = await getPost({ postId });
    return { post, user };
  }
);

export default Page;
