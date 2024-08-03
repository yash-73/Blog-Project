import React , {useState ,  useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {Container , PostCard} from '../Components/index'
function AllPost() {

    const [posts, setPosts] = useState([]);
    useEffect(()=>{},[])
    appwriteService.getPosts([]).then((posts)=>{
        if (posts) {setPosts(posts.documents)}
        // console.log(posts.documents)
    })


    return (
        <div className="w-full py-8">
            <Container className='flex flex-row flex-wrap gap-4 max-md:items-center max-md:w-full justify-center'>
                {posts.map((post)=>(
                    <div className='p-2 m-2 min-w-28 max-w-96 rounded-3xl  hover:bg-[#ffffff36] hover:scale-105 duration-200 ' key={post.$id} >
                        <PostCard  {...post}/>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default AllPost
