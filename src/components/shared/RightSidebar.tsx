import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import { useUserContext } from "@/context/AuthContext";

const RightSidebar = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(6);
  const { user } = useUserContext();
  if (isUserLoading) {
    return <Loader />;
  } else if (isErrorCreators) {
    <h2>Error</h2>;
  }else{
     return (
    <nav className="rightsidebar overflow-y-scroll custom-scrollbar">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-white col-span-1 m-5">
          Top Creator
        </h1>
        <div className="grid grid-cols-2 content-start items-center gap-5">
          {creators?.documents.map((pro) => {
            if (pro.email === user.email) {
              return;
            } else {
              return (
                <div
                  key={pro.email}
                  className=" flex flex-col items-center px-10 py-3 rounded-3xl border border-light-4 border-opacity-25"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={pro.imageUrl}
                      alt="profile"
                      className="h-9 w-9 rounded-full"
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
    </nav>
  );
  }

 
};

export default RightSidebar;
