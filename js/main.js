import { lawyers } from './data.js';

// Ждем полной загрузки структуры страницы
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ОТРИСОВКА КАРТОЧЕК ЮРИСТОВ
    const lawyerList = document.getElementById('lawyer-list');
    
    if (lawyerList) {
        lawyerList.innerHTML = ''; // Очищаем контейнер перед заполнением
        
        lawyers.forEach(lawyer => {
            const card = `
                <div class="lawyer-card reveal">
                    <div class="photo-wrap">
                        <img src="${lawyer.image}" alt="${lawyer.name}" onerror="this.src='https://via.placeholder.com'">
                    </div>
                    <span>${lawyer.role}</span>
                    <h3>${lawyer.name}</h3>
                    <p>${lawyer.bio}</p>
                    <div class="lawyer-case"><strong>Кейс:</strong> ${lawyer.case}</div>
                </div>
            `;
            lawyerList.innerHTML += card;
        });
    }

    // 2. КАЛЬКУЛЯТОР ПОШЛИНЫ
    const sumInput = document.getElementById('sum-input');
    const resOutput = document.getElementById('calc-res');

    if (sumInput && resOutput) {
        sumInput.addEventListener('input', (e) => {
            const val = e.target.value;
            // Логика: 4% от суммы иска
            const duty = val * 0.04;
            resOutput.innerText = Math.round(duty).toLocaleString();
        });
    }

    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (REVEAL)
    const observerOptions = {
        threshold: 0.15 // Секция появится, когда 15% её площади будет в зоне видимости
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Применяем анимацию ко всем секциям и карточкам с классом .reveal
    document.querySelectorAll('.reveal, .section').forEach(el => {
        observer.observe(el);
    });
});

// 4. ЛОГИКА КВИЗА (Вынесена из DOMContentLoaded, чтобы кнопки в HTML её видели)
window.selectCategory = (cat) => {
    const expert = lawyers.find(l => l.category === cat);
    const resultBox = document.getElementById('quiz-result');
    
    if (resultBox && expert) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
            <div style="animation: fadeIn 0.5s ease forwards; padding: 20px; border: 1px solid #C5A059;">
                <h4 style="color: #C5A059; font-weight: 800; text-transform: uppercase; margin-bottom: 10px;">
                    Ваш персональный эксперт:
                </h4>
                <p style="font-size: 22px; font-weight: 700; margin-bottom: 5px;">${expert.name}</p>
                <p style="color: #888; margin-bottom: 20px;">${expert.role}</p>
                <button class="cta-gold" onclick="alert('Заявка отправлена! Мы свяжемся с вами.')">
                    Записаться к нему
                </button>
            </div>
        `;
        // Плавно скроллим к результату, чтобы пользователь его увидел
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};
