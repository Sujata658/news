import { IoLogOutOutline, IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5"

import { BsSliders } from "react-icons/bs"


export const actions = [
    {
        name: 'Profile',
        link: '/me',
        icon: <IoPersonCircleOutline />
    },
    {
        name: 'Preferences',
        link: '/preferences',
        icon: <BsSliders />
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: <IoSettingsOutline />
    },
    {
        name: 'Log Out',
        link: '/logout',
        icon: <IoLogOutOutline />
    }
  
  ]