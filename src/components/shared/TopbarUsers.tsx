import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import { Models } from "appwrite";

const TopbarUsers = () => {
  // const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(6);

  const { user } = useUserContext();
  if (isUserLoading) return <Loader />;
  else if (isErrorCreators) {
    console.error("Failed to load users");
  }
  return (
    <section className="flex pl-5 w-full max-md:mt-7p-3 overflow-x-scroll custom-scrollbar rounded-3xl bg-dark-1">
        <div className="flex gap-5 min-w-max">
          {creators?.documents.map((pro: Models.Document) => {
            return (
              <div
                key={pro.email}
                className="flex flex-col items-center content-center"
              >
                <div className="border-[2px] border-l-blue-600 border-t-blue-600 border-r-indigo-700 border-b-indigo-700 rounded-full">
                <img
                  src={pro.imageUrl}
                  alt="profile"
                  className="rounded-full w-10"
                />
                </div>
                <p>
                  {pro.name && pro.email === user.email && user.name
                    ? (pro.name = "My story")
                    : pro.name}
                </p>
              </div>
            );
          })}
        </div>
    </section>
  );
};

export default TopbarUsers;
