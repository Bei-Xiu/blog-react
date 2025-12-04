import { Link } from 'react-router-dom';
import './PostCard.css'; 

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p className="excerpt">{post.excerpt}</p>
      {/* 使用 Link 進行路由跳轉 */}
      <Link to={`/post/${post.id}`} className="read-more-button">
        覽閱全文
      </Link>
    </div>
  );
};

export default PostCard;