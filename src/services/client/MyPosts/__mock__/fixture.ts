import * as ApiMyPosts from "@/pages/api/my/posts";

export const createMyPostsData = (id: string): ApiMyPosts.PostReturn => ({
  id: +id,
  title: "Frontend Testing Example",
  description: "post example text.",
  body: "post example text.",
  imageUrl: "/__mocks__/images/img01.jpg",
  published: true,
  authorId: 1,
});
