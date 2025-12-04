import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import fetchPosts from './api/postsApi';
import HomePage from './pages/HomePage';
import FullPost from './pages/FullPost';
import LoadingFallback from './components/LoadingFallback';
import MatrixBackground from './components/MatrixBackground'; 

function App() {
  const postsPromise = useMemo(() => fetchPosts(), []); 

  return (
    <Router>
      {/* 放在最頂層作為背景 */}
      <MatrixBackground /> 

      <div className="content-container"> 
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage postsPromise={postsPromise} />} />
            <Route path="/post/:postId" element={<FullPost postsPromise={postsPromise} />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;