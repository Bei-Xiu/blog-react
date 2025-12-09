import { use } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import './FullPost.css';

const FullPost = ({ postsPromise }) => {
  const { postId } = useParams(); // 從 URL 獲取 ID 參數
  const posts = use(postsPromise); // 讀取全部文章資料

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="error-404">
        <h2>文章不存在...</h2>
        <Link to="/blog-react" className="back-button">返回首頁</Link>
      </div>
    );
  }

  return (
    <div className="full-post-container">
      <Link to="/blog-react" className="back-button">← 返回首頁</Link>
      <h1>{post.title}</h1>
      <p className="post-date">發布於：{post.date}</p>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
};

export default FullPost;