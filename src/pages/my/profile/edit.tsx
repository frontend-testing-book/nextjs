import { BasicLayout } from "@/components/layouts/BasicLayout";
import { PageTitle } from "@/components/meta";
import { Error } from "@/components/templates/Error";
import { MyProfileEdit } from "@/components/templates/MyProfileEdit";
import { withLogin } from "@/lib/next/gssp";
import { NextPageWithGsspResult } from "@/lib/next/type";
import {
  getMyProfileEdit,
  GetMyProfileEditReturn,
} from "@/services/server/MyProfileEdit";

export type Props = {
  profile: GetMyProfileEditReturn;
  authorName: string;
};

const Page: NextPageWithGsspResult<Props> = ({ data, err }) => {
  return err ? <Error {...err} /> : <MyProfileEdit {...data} />;
};
Page.getLayout = BasicLayout;
Page.getPageTitle = PageTitle(
  ({ data }) => `${data?.authorName}さんのプロフィール編集`
);

export const getServerSideProps = withLogin<Props>(async ({ user }) => {
  return {
    profile: await getMyProfileEdit({ id: user.id }),
    authorName: user.name,
  };
});

export default Page;
