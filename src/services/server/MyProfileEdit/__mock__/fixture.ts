import { GetMyProfileEditReturn, UpdateMyProfileEditReturn } from "../";

export const getMyProfileData: GetMyProfileEditReturn = {
  id: 1,
  name: "TaroYamada",
  bio: "フロントエンドエンジニア。TypeScript と UIコンポーネントのテストに興味があります。",
  twitterAccount: "taro-yamada",
  githubAccount: "taro-yamada",
  imageUrl: "/__mocks__/images/img01.jpg",
  email: "taroyamada@example.com",
};

export const updateMyProfileData: UpdateMyProfileEditReturn = {
  id: 1,
  name: "TaroYamada",
  imageUrl: "/__mocks__/images/img01.jpg",
};
