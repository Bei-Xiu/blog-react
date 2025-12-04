import { useRef, useEffect } from 'react';
import './MatrixBackground.css';

const MatrixBackground = () => {
    const canvasRef = useRef(null);
    let animationFrameId = null;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // 矩陣雨的關鍵變量
        const FONT_SIZE = 16;
        let columns;
        let drops; // 儲存每列雨滴的 Y 座標

        // 包含所有可能的 ASCII 字符 (或可以簡化為只用數字/字母)
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+=-[]{};:,.<>/?|`~'; 

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // 根據寬度計算列數
            columns = Math.floor(canvas.width / FONT_SIZE);
            // 初始化雨滴，每列從 canvas 頂部開始
            drops = Array.from({ length: columns }).fill(1); 
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const draw = () => {
            // 1. 背景：每次用微透明的黑色覆蓋，產生拖影效果
            ctx.fillStyle = 'rgba(17, 24, 39, 0.05)'; // #111827 (深黑) 配合透明度
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. 字體設定：螢光綠，Monospace 確保對齊
            ctx.fillStyle = '#39FF14'; // 螢光綠
            ctx.font = `${FONT_SIZE}px Monospace`;

            // 3. 繪製每列的雨滴
            for (let i = 0; i < drops.length; i++) {
                const x = i * FONT_SIZE;
                const y = drops[i] * FONT_SIZE;
                
                // 隨機選擇一個字符
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // 繪製字符
                ctx.fillText(text, x, y);

                // 4. 判斷雨滴是否到底部
                // 如果到底部，或者隨機機會讓它重新開始
                if (y > canvas.height && Math.random() > 0.985) {
                    drops[i] = 0; // 重設回頂部
                }
                
                // 雨滴持續下落
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        // 清理函數：停止動畫和事件監聽
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="matrix-background-wrapper">
            <canvas ref={canvasRef} className="matrix-canvas" />
            {/* 放置一個半透明遮罩，以確保文字內容可讀 */}
            <div className="matrix-overlay"></div>
        </div>
    );
};

export default MatrixBackground;