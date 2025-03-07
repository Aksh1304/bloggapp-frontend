import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  
  
  useEffect(() => {
    const fetchPost = async () => {
      
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          console.log('post',post);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
          

      

        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
  //       const data = await res.json();
  
  //       if (!res.ok || !data.posts || data.posts.length === 0) {
  //         // Handle error when post is not found
  //         setError(true);
  //         setLoading(false);
  //         console.log('Post not found or error in fetching post');
  //         return;
  //       }
  
  //       // Post is found, updating state
  //       setPost(data.posts[0]); // Accessing the first post from the returned posts array
  //       setLoading(false);
  //       setError(false);
  //       console.log('Fetched post:', data.posts[0]); // Logging the post for debugging
  //     } catch (error) {
  //       setError(true);
  //       setLoading(false);
  //       console.error('Error fetching post:', error);
  //     }
  //   };
  
  //   fetchPost();
  // }, [postSlug]);
  

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);
  

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
     
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
        
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>

      {/* console.log(post) */}

      {post ? <CommentSection postId={post._id} /> : <p>Loading...</p>}


      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}