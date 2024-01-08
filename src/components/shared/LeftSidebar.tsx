import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAcount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthContext"
import { sidebarLinks } from "@/constants"
import { INavLink } from "@/types"
  
  

const LeftSidebar = () => {
  const {pathname} = useLocation()
  const {mutate: signOut, isSuccess} = useSignOutAcount()
  const {user} = useUserContext();
  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess) navigate(0) 
  }, [isSuccess])

  return (
    <nav className="leftsidebar max-w[100px]">
      <div className="flex flex-col gap-7">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            width={160}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 mt-3 items-center">
          <img src={user.imageUrl || '/assets/images/profile.png'} alt="profile" className="h-12 w-12 rounded-full"/>
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
              <p className="small-regular text-light-3">
                @ {user.username}
              </p>
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route
            return (
              <li key={link.label}  className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
              <NavLink to={link.route} className='flex gap-3 items-center p-3'>
                <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                {link.label}
              </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      <Button variant="ghost" className="shad_button_ghost gap-2 mt-8 hover:bg-rose-500" onClick={()=>signOut()}>
        <img src="/assets/icons/logout.svg" alt="" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar
