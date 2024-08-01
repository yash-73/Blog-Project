import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import  {Container, PostCard} from '../Components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CultureCanvasLogo from '../assets/Culture_Canvas_transparent.png'
// import cinema_bg from '../assets/cinema_bg.jpg'


function Home() {

    const [posts , setPosts]= useState([])
    const authStatus = useSelector((state)=>state.auth.status);
    // const cinema_bg = 'https://wallpapercave.com/wp/wp8186561.jpg'
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if (posts){
                setPosts(posts.documents)
            }
        })
    }, [authStatus]);

    


    if (!authStatus) {
        return (
            <div className={`w-full  min-h-[80vh]  py-8 mt-4 flex items-center text-center`}>
            <Container>
                    <div className="p-2 w-full gap-4 flex flex-col items-center justify-center">
                        <img src={CultureCanvasLogo} alt="Culture Canvas" />
                        <h2 className=' absolute top-[450px] font-bold text-3xl '>Unveiling Stories, Frame by Frame..</h2>
                        <h2 className=" absolute top-[490px]  text-2xl font-bold hover:text-gray-500 hover:cursor-pointer w-[fit-content]">
                            <Link to='login'>Login to read posts</Link>
                        </h2>
                    </div>
            </Container>
        </div>
        )
    }
    else {
        if (posts.length === 0){
            return (
                <div className={`min-h-[80vh] w-full py-8 flex items-center`}>
            <Container>
                <div className='flex flex-wrap items-center justify-center w-full '>
                   No posts available  
                </div>
            </Container>
        </div>
            )   
        }
       
        let index = 0;
        let min_date = posts[0].$updatedAt; 
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].$updatedAt > min_date) {
                min_date = posts[i].$updatedAt ;
                index = i;
            }
        }

        const featuredPost = posts[index];
        // console.log(posts[0].$updatedAt);

    return (
        <div className={`min-h-[80vh] w-full py-8 flex flex-col items-center`}>
            <div className='w-full text-center mb-4 font-bold text-3xl border-b-[1px] pb-8 border-white'>Newest Post</div>
            <Container>
                <div className='flex flex-wrap justify-center items-center'>
                    {(posts.length !== 0) && 
                            <div key={featuredPost.$id} className='m-8 p-2 min-w-28 max-w-96 hover:scale-105 duration-200'>
                                <PostCard  {...featuredPost} />
                            </div>
                    }
                    
                </div>
            </Container>
            <Link  className='mt-8 pt-8 border-white border-b-2 duration-200 hover:text-gray-400 text-2xl  font-semibold' to='all-posts'>
                    See More Posts
            </Link>
                
            
        </div>
    )
}
}

export default Home
