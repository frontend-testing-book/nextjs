import { CreateMyPostInput } from "@/lib/schema/MyPosts";
import { getPagination, getPaginationSrc } from "@/lib/util/pagination";
import { handlePrismaError, prisma } from "..";

export async function getMyPosts({
  page,
  authorId,
  published,
}: {
  page: number;
  authorId: number;
  published?: boolean;
}) {
  try {
    const { take, skip, currentPage } = getPaginationSrc({ page });
    const [hitCount, data] = await Promise.all([
      prisma.post.count({ where: { published, authorId } }),
      prisma.post.findMany({
        take,
        skip,
        where: { published, authorId },
        orderBy: { updatedAt: "desc" },
      }),
    ]);
    return {
      posts: data.map(({ createdAt, updatedAt, ...data }) => data),
      ...getPagination({
        take,
        skip,
        currentPage,
        hitCount,
      }),
    };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type GetMyPostsReturn = Awaited<ReturnType<typeof getMyPosts>>;

export async function createMyPost(
  input: CreateMyPostInput & { authorId: number }
) {
  try {
    const data = await prisma.post.create({ data: input });
    const { createdAt, updatedAt, ...res } = data;
    return res;
  } catch (err) {
    handlePrismaError(err);
  }
}
export type CreateMyPostReturn = Awaited<ReturnType<typeof createMyPost>>;
