import { PaginationInfo } from "@/components/atoms/PaginationInfo";
import { Pagination } from "@/components/molecules/Pagination";
import { GetMyPostsReturn } from "@/services/server/MyPosts";
import { Header } from "./Header";
import { NoItems } from "./NoItems";
import { PostItem } from "./PostItem";
import styles from "./styles.module.css";

const PostList = ({ posts }: { posts: GetMyPostsReturn["posts"] }) => {
  return (
    <section aria-label="記事一覧">
      <ul className={styles.list}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
};

export const Posts = ({
  posts,
  pagination,
  paginationInfo,
}: GetMyPostsReturn) => {
  return (
    <section aria-label="投稿記事一覧">
      <Header />
      {!posts.length ? (
        <NoItems />
      ) : (
        <>
          <PostList posts={posts} />
          <Pagination pagination={pagination} pathname="/my/posts" />
          <PaginationInfo {...paginationInfo} />
        </>
      )}
    </section>
  );
};
