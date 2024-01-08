import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import RightSidebar from "@/components/shared/RightSidebar";
import TopbarUsers from "@/components/shared/TopbarUsers";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();

  return (
    <>
      <div className="flex w-full h-full">
        <div className="home-container relative">
          <div className="home-posts">
            <TopbarUsers />
            <div className="w-full flex justify-between mt-7">
              <h2 className="h3-bold md:h-2-bold text-left w-full">
                Home Feed
              </h2>
              <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                <p className="small-medium md:base-medium text-light-2">All</p>
                <img
                  src="/assets/icons/filter.svg"
                  alt="filter"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.documents.map((post: Models.Document) => (
                  <PostCard post={post} key={post.caption} />
                ))}
              </ul>
            )}
          </div>
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default Home;
