import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Link } from "react-router-dom"
import { actions } from "./const"

const ProfileMenu = () => {

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
    }

    return (
        <>
            <Menubar className='border-none '>
                <MenubarMenu>
                    <MenubarTrigger className='m-0 p-0 rounded-full cursor-pointer'>
                        <Avatar>
                            <AvatarImage src="https://via.placeholder.com/150" alt="John Doe" className="" />
                            <AvatarFallback className="w-8 h-8 flex items-center justify-center bg-primary text-background text-sm font-bold">JD</AvatarFallback>
                        </Avatar>
                    </MenubarTrigger>
                    <MenubarContent>
                        {
                            actions.map((action, index) => (
                                <MenubarItem key={index}>
                                    {action.name === 'Log Out' ? 
                                    <button className='flex items-center p-2 space-x-2' onClick={handleLogout}>
                                        {action.icon}
                                        <span>{action.name}</span>
                                    </button> 
                                    :
                                        <Link to={`/profile${action.link}`} className='flex items-center p-2 space-x-2'>
                                            {action.icon}
                                            <span>{action.name}</span>
                                        </Link>}
                                </MenubarItem>
                            ))
                        }
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>



        </>
    )
}

export default ProfileMenu