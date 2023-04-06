import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { Error } from "@/components/templates/Error";
import { Posts } from "@/components/templates/Posts";
import { withoutLogin } from "@/lib/next/gssp";
import { NextPageWithGsspResult } from "@/lib/next/type";
import { parseAsNonEmptyString, parseAsPositiveInt } from "@/lib/util";
import { getPosts, GetPostsReturn } from "@/services/server/Posts";

type Props = GetPostsReturn;

const Page: NextPageWithGsspResult<Props> = ({ data, err }) => {
  return err ? <Error {...err} /> : <Posts {...data} />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(() => "Tech Posts");

export const getServerSideProps = withoutLogin<Props>(async ({ query }) => {
  return await getPosts({
    page: parseAsPositiveInt(query.page),
    orderBy: parseAsNonEmptyString(query.orderBy),
  });
});

export default Page;
