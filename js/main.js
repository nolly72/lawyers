import { lawyers } from './data.js';

// Ждем полной загрузки структуры страницы
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ОТРИСОВКА КАРТОЧЕК ЮРИСТОВ
    const lawyerList = document.getElementById('lawyer-list');
    
    if (lawyerList) {
        // Используем map и join для более чистого рендеринга
        lawyerList.innerHTML = lawyers.map(lawyer => `
            <div class="lawyer-card reveal">
                <div class="photo-wrap">
                    <img src="${lawyer.image}" alt="${lawyer.name}" onerror="this.src='https://via.placeholder.com'">
                </div>
                <span>${lawyer.role}</span>
                <h3>${lawyer.name}</h3>
                <p>${lawyer.bio}</p>
                <div class="lawyer-case"><strong>Кейс:</strong> ${lawyer.case}</div>
            </div>
        `).join('');
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

    // 3. ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ (НОВОЕ)
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Чтобы страница не перезагружалась
            const name = document.getElementById('user-name').value;
            const phone = document.getElementById('user-phone').value;
            
            // Здесь будет имитация отправки
            console.log(`Заявка: ${name}, Телефон: ${phone}`);
            
            alert(`Благодарим, ${name}! Ваша заявка на экспресс-анализ принята. Наш адвокат свяжется с вами в течение 15 минут.`);
            leadForm.reset(); // Очищаем поля
        });
    }

    // 4. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (REVEAL)
    const observerOptions = {
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Применяем анимацию ко всем секциям и карточкам
    document.querySelectorAll('.reveal, .section').forEach(el => {
        observer.observe(el);
    });
});

// 5. ЛОГИКА КВИЗА (Глобальная функция)
window.selectCategory = (cat) => {
    const expert = lawyers.find(l => l.category === cat);
    const resultBox = document.getElementById('quiz-result');
    
    if (resultBox && expert) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
            <div class="result-animate" style="padding: 30px; border: 2px solid #C5A059; background: #0a0a0a;">
                <h4 style="color: #C5A059; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px;">
                    Ваш персональный эксперт:
                </h4>
                <p style="font-size: 24px; font-weight: 900; margin-bottom: 5px; color: #fff;">${expert.name}</p>
                <p style="color: #888; font-weight: 700; text-transform: uppercase; font-size: 13px; margin-bottom: 25px;">${expert.role}</p>
                <button class="cta-gold" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                    Записаться на прием
                </button>
            </div>
        `;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};
