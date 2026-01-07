import { useMemo, Suspense } from 'react';

//引入 React Router，負責頁面路由切換
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//將文章資料帶入（API）
import fetchPosts from './api/postsApi';

//引入首頁組件
import HomePage from './pages/HomePage';

//引入文章完整頁面
import FullPost from './pages/FullPost';

//引入 Loading 畫面（Suspense fallback）
import LoadingFallback from './components/LoadingFallback';

//引入 Matrix 動態背景組件
import MatrixBackground from './components/MatrixBackground';

//App 為整個應用程式的根組件
function App() {

    //使用 useMemo 確保 fetchPosts 只執行一次
    const postsPromise = useMemo(() => fetchPosts(), []);

    //回傳整個應用程式的 JSX 結構
    return (

        //Router 為最外層，負責管理所有頁面路由
        <Router>

            {/*MatrixBackground 放在最上層*/}
            {/*作為整個網站的動態背景*/}
            <MatrixBackground />

            {/*主要內容區塊（會疊在背景之上*/}
            <div className='content-container'>

                {/*Suspense 負責等待資料載入*/}
                <Suspense fallback={<LoadingFallback />}>

                    <Routes>

                        {/*首頁路由*/}
                        <Route path='/blog-react' element={<HomePage postsPromise={postsPromise} />} />

                        {/*文章內容頁路由*/}
                        <Route path='/post/:postId' element={<FullPost postsPromise={postsPromise} />} />

                    </Routes>

                </Suspense>

            </div>

        </Router>
    );
}

//匯出 App 組件，供 index.js 使用
export default App;