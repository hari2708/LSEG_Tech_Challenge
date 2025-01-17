document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            "id": 1,
            "question": "What term refers to the practice of buying and selling the same stock multiple times in a single trading day?",
            "options": [
                { "key": "a", "text": "Swing trading" },
                { "key": "b", "text": "Long-term investing" },
                { "key": "c", "text": "Day trading" },
                { "key": "d", "text": "Value investing" }
            ],
            "answerKey": "c"
        },
        {
            "id": 2,
            "question": "Which financial statement provides information about a company’s revenues and expenses over a specific period?",
            "options": [
                { "key": "a", "text": "Balance sheet" },
                { "key": "b", "text": "Income statement" },
                { "key": "c", "text": "Cash flow statement" },
                { "key": "d", "text": "Statement of retained earnings" }
            ],
            "answerKey": "b"
        },
        {
            "id": 3,
            "question": "Which order type allows you to buy or sell a stock immediately at the best available price?",
            "options": [
                { "key": "a", "text": "Limit order" },
                { "key": "b", "text": "Market order" },
                { "key": "c", "text": "Stop order" },
                { "key": "d", "text": "Day order" }
            ],
            "answerKey": "b"
        },
        {
            "id": 4,
            "question": "What does the term “bull market” signify in the stock market?",
            "options": [
                { "key": "a", "text": "A market with declining prices" },
                { "key": "b", "text": "A market with increasing prices" },
                { "key": "c", "text": "A market with no significant price changes" },
                { "key": "d", "text": "A market with high volatility" }
            ],
            "answerKey": "b"
        },
        {
            "id": 5,
            "question": "Which term refers to the practice of borrowing shares from a broker to sell them with the expectation of buying them back at a lower price in the future?",
            "options": [
                { "key": "a", "text": "Short selling" },
                { "key": "b", "text": "Long position" },
                { "key": "c", "text": "Margin trading" },
                { "key": "d", "text": "Hedging" }
            ],
            "answerKey": "a"
        }
    ];

    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');
    const restartBtn = document.getElementById('restart-btn');

    function loadQuiz() {
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <h3>${index + 1}. ${q.question}</h3>
                <div class="options">
                    ${q.options.map(option => `
                        <label>
                            <input type="radio" name="question${index}" value="${option.key}">
                            ${option.text}
                        </label>
                    `).join('')}
                </div>
            `;
            quizForm.appendChild(questionDiv);
        });

        quizForm.addEventListener('change', () => {
            const allAnswered = [...quizForm.elements]
                .filter(el => el.type === 'radio')
                .filter(el => el.checked).length === questions.length;
            submitBtn.disabled = !allAnswered;
        });
    }

    function calculateResults() {
        let score = 0;
        const userAnswers = [...quizForm.elements]
            .filter(el => el.checked)
            .map(el => el.value);

        questions.forEach((q, index) => {
            if (q.answerKey === userAnswers[index]) {
                score++;
            }
        });

        return score;
    }

    function showResults(score) {
        resultDiv.innerHTML = `
            <h2>Your Score: ${score} / ${questions.length}</h2>
            <ul>
                ${questions.map((q, index) => `
                    <li>${q.question}
                        <br>Your Answer: ${q.options.find(option => option.key === quizForm.elements[`question${index}`].value).text}
                        <br>Correct Answer: ${q.options.find(option => option.key === q.answerKey).text}
                    </li>
                `).join('')}
            </ul>
        `;
        resultDiv.style.display = 'block';
        restartBtn.style.display = 'block';
    }

    function resetQuiz() {
        quizForm.innerHTML = '';
        resultDiv.style.display = 'none';
        restartBtn.style.display = 'none';
        submitBtn.disabled = true;
        loadQuiz();
    }

    loadQuiz();

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const score = calculateResults();
        showResults(score);
    });

    restartBtn.addEventListener('click', () => {
        resetQuiz();
    });
});
