document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const envelope = document.getElementById('envelope');
    const flap = document.getElementById('flap');
    const card = document.getElementById('card');
    const stage1 = document.getElementById('stage1');
    const stage2 = document.getElementById('stage2');
    const finalScreen = document.getElementById('final');
    const catImage = document.getElementById('catImage');
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const btnThanks = document.getElementById('btnThanks');
    const wishText = document.getElementById('customWish');
    
    // Твоё пожелание ✍️
    wishText.textContent = 'С каждым днём я люблю тебя всё сильнее. Ты - самое лучшее, что случалось в моей жизни. Спасибо, что ты есть! 💕';
    
    let envelopeClickCount = 0;
    let isOpened = false;
    
    // Текст для кнопки "нет"
    let noButtonTexts = [
        "нет...",
        "ты уверена? :(", 
        "точно? :(", 
        "может всё таки передумаешь? :(", 
        "ну ладненько :("
    ];
    let currentTextIndex = 0;
    
    // Устанавливаем начальную позицию кнопки "нет"
    setTimeout(() => {
        if (btnNo) {
            btnNo.style.position = 'absolute';
            btnNo.style.left = '60%';
            btnNo.style.top = '50%';
            btnNo.style.transform = 'translateY(-50%)';
        }
    }, 100);
    
    // ===== КОНВЕРТ (10 кликов) =====
    envelope.addEventListener('click', function() {
        if (isOpened) return;
        
        if (envelopeClickCount < 9) {
            envelopeClickCount++;
            envelope.classList.add('shake');
            setTimeout(() => {
                envelope.classList.remove('shake');
            }, 300);
        } 
        else if (envelopeClickCount === 9) {
            envelopeClickCount++;
            envelope.classList.add('shake');
            
            // Открываем клапан
            flap.classList.add('open');
            
            setTimeout(() => {
                envelope.classList.remove('shake');
                envelope.style.display = 'none';
                card.style.display = 'block';
                isOpened = true;
                
                // Обновляем позицию кнопки после появления открытки
                setTimeout(() => {
                    if (btnNo) {
                        btnNo.style.left = '60%';
                        btnNo.style.top = '50%';
                    }
                }, 100);
            }, 500);
        }
    });
    
    // ===== Функция движения кнопки от курсора =====
    function moveButtonAway(e) {
        if (!btnNo) return;
        
        const btnRect = btnNo.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) + 
            Math.pow(mouseY - btnCenterY, 2)
        );
        
        const safeRadius = 150;
        
        if (distance < safeRadius) {
            const angle = Math.atan2(btnCenterY - mouseY, btnCenterX - mouseX);
            
            const container = document.querySelector('.button-container');
            const containerRect = container.getBoundingClientRect();
            
            let newLeft = btnNo.offsetLeft + Math.cos(angle) * 20;
            let newTop = btnNo.offsetTop + Math.sin(angle) * 20;
            
            // Ограничиваем движение
            newLeft = Math.max(5, Math.min(containerRect.width - btnRect.width - 5, newLeft));
            newTop = Math.max(5, Math.min(containerRect.height - btnRect.height - 5, newTop));
            
            btnNo.style.left = newLeft + 'px';
            btnNo.style.top = newTop + 'px';
        }
    }
    
    // Функция проверки наведения на кнопку
    function isMouseOverButton(e) {
        if (!btnNo) return false;
        const btnRect = btnNo.getBoundingClientRect();
        return (
            e.clientX >= btnRect.left &&
            e.clientX <= btnRect.right &&
            e.clientY >= btnRect.top &&
            e.clientY <= btnRect.bottom
        );
    }
    
    // ===== Движение мыши =====
    document.addEventListener('mousemove', (e) => {
        if (!isOpened || !btnNo) return;
        if (isMouseOverButton(e)) return;
        moveButtonAway(e);
    });
    
    // ===== Функция "закрытия" страницы =====
    function closePage() {
        // Создаем белый экран
        const closingDiv = document.createElement('div');
        closingDiv.className = 'page-closing';
        closingDiv.textContent = '💔';
        document.body.innerHTML = '';
        document.body.appendChild(closingDiv);
        
        // Просто белый экран с сердечком
        // Никакого about:blank, никаких сообщений
    }
    
    // ===== КЛИК НА КНОПКУ "НЕТ" =====
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (currentTextIndex < noButtonTexts.length - 1) {
            currentTextIndex++;
            btnNo.textContent = noButtonTexts[currentTextIndex];
            catImage.src = 'sadkitten.gif';
            
            btnNo.style.transform = 'scale(0.95) translateY(-50%)';
            setTimeout(() => {
                btnNo.style.transform = 'translateY(-50%)';
            }, 200);
        } else {
            // Последний клик - "закрываем" страницу
            closePage();
        }
    });
    
    // ===== НАВЕДЕНИЕ НА КНОПКУ "НЕТ" =====
    btnNo.addEventListener('mouseenter', () => {
        catImage.src = 'sadkitten.gif';
    });
    
    // ===== НАВЕДЕНИЕ НА КНОПКУ "ДА" =====
    btnYes.addEventListener('mouseenter', () => {
        catImage.src = 'happykitten.gif';
    });
    
    // ===== КЛИК НА "ДА!!!!" =====
    btnYes.addEventListener('click', () => {
        stage1.style.display = 'none';
        stage2.style.display = 'flex';
    });
    
    // ===== КНОПКА "Спасибоооо, люблю тебя!!!" =====
    btnThanks.addEventListener('click', () => {
        card.style.display = 'none';
        finalScreen.style.display = 'flex';
        createHearts();
    });
    
    // ===== Функция создания сердечек =====
    function createHearts() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.opacity = Math.random() * 0.6 + 0.4;
            heart.style.animation = `float ${Math.random() * 3 + 2}s infinite ease-in-out`;
            heart.style.zIndex = '1001';
            heart.style.pointerEvents = 'none';
            
            finalScreen.appendChild(heart);
        }
    }
});