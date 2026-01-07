//新增一個組件的 JS 檔 MatrixBackground.js

//從 React 引入 useRef（取得 DOM）與 useEffect（生命週期）
//由於 React 無法直接操作 DOM，因此需要使用 useRef 來取得 canvas 元素的參考
import { useRef, useEffect } from 'react';

//引入對應的 CSS 樣式
import './MatrixBackground.css';

//建立 MatrixBackground 元件
const MatrixBackground = () => {

    //useRef：用來取得真正的 canvas DOM 元素
    const canvasRef = useRef(null);

    //用來儲存 requestAnimationFrame 的 ID，方便清理
    let animationFrameId = null;

    //useEffect：在元件掛載後初始化 Canvas 與動畫
    useEffect(() => {

        //取得 canvas DOM 與 2D 繪圖環境
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        //每個字的大小，會影響整體密度
        const FONT_SIZE = 16;

        //columns：畫面中可以容納幾列文字雨
        let columns;

        //drops：紀錄每一列目前掉到第幾格
        let drops;

        //可隨機出現的字元內容
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+=-[]{};:,.<>/?|`~';

        //設定 Canvas 尺寸，並在視窗 resize 時重新計算
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            //根據畫面寬度計算文字列數
            columns = Math.floor(canvas.width / FONT_SIZE);

            //初始化每一列雨滴的位置
            drops = Array.from({ length: columns }).fill(1);
        };

        //監聽視窗大小變化
        window.addEventListener('resize', resizeCanvas);

        //初始化 Canvas 設定
        resizeCanvas();

        //draw：Matrix 動畫主迴圈
        const draw = () => {

            //使用半透明背景製造拖影效果
            ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //設定文字樣式
            ctx.fillStyle = '#39FF14';
            ctx.font = `${FONT_SIZE}px Monospace`;

            //逐列繪製文字雨
            for (let i = 0; i < drops.length; i++) {
                const x = i * FONT_SIZE;
                const y = drops[i] * FONT_SIZE;

                //隨機選擇一個字元
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                ctx.fillText(text, x, y);

                //當雨滴超出底部時，以隨機機率回到頂部
                if (y > canvas.height && Math.random() > 0.985) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            //請瀏覽器在下一幀再次執行 draw
            animationFrameId = requestAnimationFrame(draw);
        };

        //啟動動畫
        draw();

        //清理：移除事件監聽並停止動畫
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    //回傳 JSX，包含 canvas 與遮罩
    return (
        <div className='matrix-background-wrapper'>
            <canvas ref={canvasRef} className='matrix-canvas' />
            <div className='matrix-overlay'></div>
        </div>
    );
};

export default MatrixBackground;