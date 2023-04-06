import * as ApiMyProfile from "@/pages/api/my/profile";

export const getMyProfileData: ApiMyProfile.GetReturn = {
  id: 1,
  name: "TaroYamada",
  bio: "フロントエンドエンジニア。TypeScript と UIコンポーネントのテストに興味があります。",
  twitterAccount: "taro-yamada",
  githubAccount: "taro-yamada",
  imageUrl: "/__mocks__/images/img01.jpg",
  email: "taroyamada@example.com",
  likeCount: 1,
};
