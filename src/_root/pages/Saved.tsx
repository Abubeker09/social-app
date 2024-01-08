import Loader from "@/components/shared/Loader"
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"


const Saved = () => {
  const { data: currentUser, isLoading: isUserLoading, isError: isErrorCreators } = useGetCurrentUser();


  return (
    <div className="flex flex-wrap gap-5 w-full overflow-auto custom-scrollbar p-10 content-start">
      <div className="flex items-center gap-3 w-full h-10">
        <img src="/assets/icons/save.svg" alt="icon" width={30} height={30}/>
        <h1 className=" text-[30px]">Saved posts</h1>
      </div>
      {isUserLoading || currentUser?.save.length === 0 ? (
        <div className="flex w-full h-full flex-col gap-16 mt-10 content-center items-center">
          <Loader />
          <p className="text-zinc-600">Ther is no saved hestory</p>
        </div>
        ) : isErrorCreators ? (
          <div className="text-10">An error occurred while fetching your saved posts
          <button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-70
          text-white font-semibold py-2 px-4 rounded">Try again</button>
          </div>
          ) : (
            <>
              {currentUser?.save.map((posts: any) => (
                <li key={posts.$id} className="w-[200px] h-48 rounded-xl overflow-hidden mt-10"> 
                  <img src={posts?.post.imageUrl} alt="post" className="w-full" />
                </li>
              ))}
            </>
          )}
            
    </div>
  )
}

export default Saved