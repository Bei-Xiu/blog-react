import { use } from 'react'; 
import PostCard from '../components/PostCard';
import UserPanel from '../components/UserPanel'; 
import './HomePage.css'; 

const HomePage = ({ postsPromise }) => {
  const posts = use(postsPromise);

  return (
    // 佈局
    <div className="homepage-layout"> 
      
      {/* 左側：部落格文章列表 */}
      <div className="post-list-area">
        {/* <h1 className="main-title">title</h1> */}
        <div className="card-container">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      
      {/* 右側：照片與簡介面板 */}
      <div className="sidebar-area">
        <UserPanel />
      </div>

    </div>
  );
};

export default HomePage;