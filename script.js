// 1. 初始化開眼音效
const introSound = new Audio('intro.mp3'); // 改成英文檔名
const clickSound = new Audio('click.mp3'); // 這裡確保沒問題
// 取得 HTML 元件
const unlocker = document.getElementById('audio-unlocker');
const blastText = document.getElementById('blast-text');

// 預設先讓網頁所有背景組件動畫靜止
document.body.classList.add('preload');

// ==========================================
// 【終極電影級開場】
// ==========================================
function triggerEyeOpening() {
    // 1. 觸發 CSS 眼皮黑幕掀開動畫
    if (unlocker) {
unlocker.classList.add('unlocked');
    }

    // 2. 觸發 CSS 爆誕文字動畫
    if (blastText) {
        blastText.classList.add('active');
    }

    // 3. 延遲 300 毫秒播放音效，讓聲音在眼皮掀開那一刻炸出來
    setTimeout(() => {
        introSound.currentTime = 0;
        introSound.play().catch(err => console.log("音效播放失敗:", err));
    }, 300); 

    // 4. 等眼皮動畫跑完 (1.2秒)，移除黑幕層
    setTimeout(() => {
        if (unlocker) {
            unlocker.style.display = 'none';
            document.body.classList.remove('preload');
        }
    }, 1200);

    window.removeEventListener('click', triggerEyeOpening);
}

// 監聽全網頁的第一次點擊
window.addEventListener('click', triggerEyeOpening);


// ==========================================
// 2. 畫面點擊噴發「紫色火焰粒子」特效
// ==========================================
document.addEventListener('click', (e) => {
    clickSound.currentTime = 0; 
    clickSound.play().catch(err => console.log("點擊音效播放失敗:", err));
    // 如果眼皮黑幕還在，先不噴火焰
    if (unlocker && unlocker.style.display !== 'none') return;

    const particleCount = 12; 
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        const angle = Math.random() * Math.PI * 2; 
        const speed = Math.random() * 60 + 40;     
        
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        particle.style.setProperty('--vx', `${vx}px`);
        particle.style.setProperty('--vy', `${vy}px`);
        
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        document.body.appendChild(particle);
        
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
});