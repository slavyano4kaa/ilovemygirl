const wrapper = document.getElementById("wrapper");
const blocks = document.querySelectorAll(".block");
const heartContainer = document.getElementById("transition-heart-container");

let current = 0;
let scrolling = false;
const delay = 1500; // задержка для плавности анимации

/* ---- красные сердца при переходе ---- */
/* ---- красные сердца при переходе ---- */
function spawnTransitionHearts(count = 20) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = Math.random() * 100 + "vw";
        // задаём случайное начальное положение по вертикали внизу экрана
        heart.style.top = (80 + Math.random() * 20) + "vh";
        heart.style.animationDuration = (1.4 + Math.random() * 0.8) + "s";
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
}

/* ---- мягкие сердечки цвета блока ---- */
function startSoftHearts() {
    stopSoftHearts();
    const accent = getComputedStyle(blocks[current]).getPropertyValue("--accent");
    window.softTimer = setInterval(() => {
        const h = document.createElement("div");
        h.className = "soft-heart";
        h.style.left = Math.random() * 100 + "vw";
        // случайная вертикальная позиция в нижней половине экрана
        h.style.top = (70 + Math.random() * 30) + "vh";
        h.style.setProperty("--accent", accent);
        heartContainer.appendChild(h);
        setTimeout(() => h.remove(), 6000);
    }, 350);
}


function stopSoftHearts() {
    clearInterval(window.softTimer);
}

/* ---- инициализация: показываем первый блок ---- */
document.addEventListener("DOMContentLoaded", () => {
    blocks[current].classList.add("active");
    startSoftHearts();
});

/* ---- функция переключения блоков ---- */
function scrollToBlock(next) {
    if (scrolling || next < 0 || next >= blocks.length || next === current) return;

    scrolling = true;
    spawnTransitionHearts(); // красные сердца при переходе

    // убираем старый блок
    blocks[current].classList.remove("active");
    blocks[current].classList.add("slide-out");

    // показываем новый блок
    blocks[next].classList.add("slide-in");
    blocks[next].classList.add("active");

    // через delay чистим классы и запускаем мягкие сердечки
    setTimeout(() => {
        blocks[current].classList.remove("slide-out");
        blocks[next].classList.remove("slide-in");

        current = next;
        startSoftHearts();
        scrolling = false;
    }, delay);
}

/* ---- слушаем колесо мыши для вертикального скролла ---- */
window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) scrollToBlock(current + 1);
    else scrollToBlock(current - 1);
});

/* ---- стрелки вверх/вниз на клавиатуре ---- */
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") scrollToBlock(current + 1);
    if (e.key === "ArrowUp") scrollToBlock(current - 1);
});
