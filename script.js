const introSound = new Audio('intro.mp3');
const clickSound = new Audio('click.mp3');

const unlocker = document.getElementById('audio-unlocker');
const blastText = document.getElementById('blast-text');

document.body.classList.add('preload');

function triggerEyeOpening(e) {
    console.log("點擊已觸發");

    // 播放點擊音效
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("音效錯誤:", e));

    // 觸發效果 (請確認你有這個函數，如果沒有請直接刪除這兩行)
    if (typeof createPurpleFire === 'function') {
        createPurpleFire(e.clientX, e.clientY);
    }

    if (unlocker) {
        unlocker.classList.add('unlocked');
        const prompt = document.querySelector('.unlock-prompt');
        if (prompt) prompt.style.display = 'none';
    }

    if (blastText) blastText.classList.add('active');

    setTimeout(() => {
        introSound.currentTime = 0;
        introSound.play().catch(e => console.log("音效錯誤:", e));
    }, 300);

    setTimeout(() => {
        if (unlocker) unlocker.style.display = 'none';
        document.body.classList.remove('preload');
    }, 1200);

    setTimeout(() => {
        const stamp = document.querySelector('.stamp-seal');
        if (stamp) {
            stamp.classList.add('animate-stamp');
        }
    }, 3000);

    window.removeEventListener('click', triggerEyeOpening);
}

window.addEventListener('click', triggerEyeOpening);