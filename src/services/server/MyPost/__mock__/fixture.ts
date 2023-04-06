import { DeleteMyPostReturn, GetMyPostReturn, UpdateMyPostReturn } from "../";

export const getMyPostData: GetMyPostReturn = {
  id: 1,
  title: "Frontend Testing Example",
  description: "post example text.",
  body: "post example text.",
  imageUrl: "/__mocks__/images/img01.jpg",
  published: true,
  authorId: 1,
};

export const updateMyPostData: UpdateMyPostReturn = {
  id: 1,
};

export const deleteMyPostData: DeleteMyPostReturn = {
  id: 1,
};
