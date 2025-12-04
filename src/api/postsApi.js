import postsData from '../data/posts.json';

const fetchPosts = () => {
  console.log("Fetching posts data...");
  return new Promise(resolve => {
      resolve(postsData);
  });
};

export default fetchPosts;