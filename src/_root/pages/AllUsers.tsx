import Loader from "@/components/shared/Loader";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(100000000);

  return (
    <div className="user-container overflow-auto custom-scrollbar p-6">
      <div className="flex p-5 gap-3">
        <img src="/assets/icons/people.svg" alt="icon" width={30} height={30}/>
        <h2 className=" text-[20px]">All Users</h2>
      </div>
      <div className="user-grid">
        {creators?.documents.map((pro) => {
          if (isUserLoading) {
            return <Loader />;
          } else if (isErrorCreators) {
            <h2>Error</h2>;
          } else {
            return (
              <div
                key={pro.email}
                className=" flex flex-col items-center px-10 py-3 rounded-3xl border border-light-4 border-opacity-25"
              >
                  <div className="flex flex-col items-center cursor-pointer">
                    <img
                      src={pro.imageUrl}
                      alt="profile"
                      className="h-11 w-11 rounded-full"
                    />
                    <h2 className="text-light-3 mt-2 text-center w-full">
                      {pro.name}
                    </h2>
                    <button className=" bg-indigo-500 p-4 py-2 rounded-xl mt-2 text-[10px]">
                      Follow
                    </button>
                  </div>
              </div>
            );
          }
        })}
      </div>
    </div>
      
  );
};

export default AllUsers;
