import { lawyers } from './data.js';

// 1. Отрисовка карточек юристов
const lawyerList = document.getElementById('lawyer-list');

lawyers.forEach(lawyer => {
    const card = `
        <div class="lawyer-card">
            <span>${lawyer.role}</span>
            <h3>${lawyer.name}</h3>
            <p>${lawyer.bio}</p>
            <div class="lawyer-case"><strong>Кейс:</strong> ${lawyer.case}</div>
        </div>
    `;
    lawyerList.innerHTML += card;
});

// 2. Логика Квиза
window.selectCategory = (cat) => {
    const expert = lawyers.find(l => l.category === cat);
    const resultBox = document.getElementById('quiz-result');
    
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <h4 style="color: #C5A059">Лучший выбор для вас:</h4>
        <p><strong>${expert.name}</strong> — ${expert.role}</p>
        <button class="cta-gold" style="margin-top:15px">Записаться к нему</button>
    `;
};

// 3. Калькулятор пошлины
const sumInput = document.getElementById('sum-input');
const resOutput = document.getElementById('calc-res');

sumInput.addEventListener('input', (e) => {
    const val = e.target.value;
    // Примерная логика: 4% от суммы иска
    const duty = val * 0.04;
    resOutput.innerText = Math.round(duty).toLocaleString();
});
