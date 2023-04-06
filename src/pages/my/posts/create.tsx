import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { MyPostsCreate } from "@/components/templates/MyPostsCreate";
import { withLogin } from "@/lib/next/gssp";
import { NextPageWithLayout } from "@/lib/next/type";

const Page: NextPageWithLayout = () => {
  return <MyPostsCreate />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(() => "新規記事作成");

export const getServerSideProps = withLogin(async () => {
  return {};
});

export default Page;
