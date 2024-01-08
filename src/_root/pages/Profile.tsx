import TopbarUsers from "@/components/shared/TopbarUsers";
import { useGetCurrentUser} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

const Profile = () => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img
          src={currentUser?.imageUrl}
          alt="profile"
          className="w-24 h-24 rounded-full"
        />
        <div className="flex flex-col max-md:items-center gap-5 pt-5">
          <div className="flex gap-3">
            <h1 className="text-4xl font-bold text-gray-100 dark:text-white">
              {currentUser?.name}
            </h1>
            <Link to={`/update-profile/${currentUser?.$id}`}>
              <div className="flex bg-dark-4 px-4 py-1 gap-2 items-center content-center rounded-xl cursor-pointer">
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit icon"
                  className="w-[20px]"
                />
                <button className="bg-transparent h-full text-[10px]">
                  Edit Profile
                </button>
              </div>
            </Link>          
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-slate-600 flex max-md:self-center">{currentUser?.email}</h1>
            <ul className="flex gap-6">
              <li className="flex flex-col items-center">
                <span className="text-blue-400">10</span>
                <p className="text[20px]">Following</p>
              </li>
              <span className=" text-slate-600">|</span>
              <li className="flex flex-col items-center">
                <span className="text-blue-400">230</span>
                <p className="text[20px]">Followers</p>
              </li>
              <span className=" text-slate-600">|</span>
              <li className="flex flex-col items-center">
                <span className="text-blue-400">500</span>
                <p className="text[20px]">Likes</p>
              </li>
            </ul>
          </div>
          <p className="text-indigo-400 w-[70%]">{currentUser?.bio}Bio texts Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum deleniti aut amet laudantium eius eum! Quidem est vero, esse veniam consectetur in iste rerum harum obcaecati dolorum eligendi praesentium facilis!</p>
          <div className="w-[70%]">
            <TopbarUsers />
          </div>
          <h2 className="text-[20px] text-indigo-400">Your Posts</h2>
          <div className="flex flex-wrap gap-8 w-[90%] max-md:self-center">
            {currentUser?.posts.map((postd: Models.Document)=>{
              return(
                <img src={postd.imageUrl} alt="postd by the you" className=" w-44 max-md:w-20 rounded-xl"/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
