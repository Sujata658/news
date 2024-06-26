import { useUser } from "@/context/userContext"

const MyProfile = () => {
    const {user} = useUser()



  return (
    <>
<div>
    {
        user ? <h1>{user.name}</h1> : <h1>Loading...</h1>
    
    }
</div>
    
    
    </>
  )
}

export default MyProfile