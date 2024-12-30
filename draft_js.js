document.addEventListener('DOMContentLoaded', () => {
        const questions = [
            {
                question: "What does LAN stand for?",
                options: [
                    { text: "Local Area Network", correct: true },
                    { text: "Large Area Network", correct: false },
                    { text: "Limited Area Network", correct: false },
                    { text: "Linked Area Network", correct: false }
                ]
            },
            {
                question: "Which of the following is a networking device?",
                options: [
                    { text: "Printer", correct: false },
                    { text: "Router", correct: true },
                    { text: "Monitor", correct: false },
                    { text: "Scanner", correct: false }
                ]
            },
            {
                question: "What does IP stand for in networking?",
                options: [
                    { text: "Internet Protocol", correct: true },
                    { text: "Internal Protocol", correct: false },
                    { text: "Internet Process", correct: false },
                    { text: "Internal Process", correct: false }
                ]
            },
            {
                question: "What does HTTP stand for?",
                options: [
                    { text: "Hypertext Transfer Protocol", correct: true },
                    { text: "Hightext Transfer Protocol", correct: false },
                    { text: "Hyperlink Transfer Protocol", correct: false },
                    { text: "Highlink Transfer Protocol", correct: false }
                ]
            },
            {
                question: "What is the function of a switch in a network?",
                options: [
                    { text: "To connect multiple devices", correct: true },
                    { text: "To transmit data to a single device", correct: false },
                    { text: "To amplify signals", correct: false },
                    { text: "To secure the network", correct: false }
                ]
            },
            {
                question: "What is the primary purpose of a firewall?",
                options: [
                    { text: "To block unauthorized access", correct: true },
                    { text: "To speed up data transfer", correct: false },
                    { text: "To store network data", correct: false },
                    { text: "To configure IP addresses", correct: false }
                ]
            },
            {
                question: "What does DNS stand for?",
                options: [
                    { text: "Domain Name System", correct: true },
                    { text: "Domain Network Server", correct: false },
                    { text: "Digital Name Service", correct: false },
                    { text: "Data Network System", correct: false }
                ]
            },
            {
                question: "What is the primary function of the Domain Name System (DNS)?",
                options: [
                    { text: "To assign IP addresses to devices", correct: false },
                    { text: "To translate domain names into IP addresses", correct: true },
                    { text: "To manage email delivery", correct: false },
                    { text: "To secure network communications", correct: false }
                ]
            },
            {
                question: "Which protocol is used for secure communication over the internet?",
                options: [
                    { text: "FTP", correct: false },
                    { text: "HTTP", correct: false },
                    { text: "HTTPS", correct: true },
                    { text: "SMTP", correct: false }
                ]
            },
            {
                question: "What does MAC stand for in networking?",
                options: [
                    { text: "Media Access Control", correct: true },
                    { text: "Multiple Access Channel", correct: false },
                    { text: "Memory Address Correlation", correct: false },
                    { text: "Machine Access Code", correct: false }
                ]
            }
        ];
        // Add more questions as needed

    let currentQuestion = 0;
    let score = 0;
    let lives = 3;
    let canAnswer = true;

    const currentNumberElement = document.getElementById('current-number');
    const totalQuestionsElement = document.getElementById('total-questions');

    const scoreElement = document.getElementById('score');
    const questionElement = document.getElementById('question-text');
    const optionsContainer = document.querySelector('.options');
    const hearts = document.querySelectorAll('.heart');
    const progressBar = document.querySelector('.progress');

    function updateProgressBar() {
        const progress = (currentQuestion / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function updateQuestion() {
        const question = questions[currentQuestion];
        questionElement.textContent = question.question;
        // Update question counter
        currentNumberElement.textContent = currentQuestion + 1;
        totalQuestionsElement.textContent = questions.length;
        
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option.text;
            button.dataset.correct = option.correct;
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
        });

        updateProgressBar();
        canAnswer = true;
    }

    function selectOption(e) {
        if (!canAnswer) return;
        canAnswer = false;

        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === "true";

        if (correct) {
            selectedButton.classList.add('correct');
            selectedButton.title = "Correct!";
            score += 10;
            scoreElement.textContent = score;
        } else {
            selectedButton.classList.add('wrong');
            selectedButton.title = "Wrong!";
            // Find and highlight the correct answer
            optionsContainer.querySelectorAll('.option').forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add('correct');
                }
            });
            // Reduce lives
            if (lives > 0) {
                hearts[lives - 1].style.opacity = "0.2";
                lives--;
            }
        }

        // Disable all options after selection
        optionsContainer.querySelectorAll('.option').forEach(button => {
            button.classList.add('disabled');
        });

        // Automatically move to next question after 1.5 seconds
        setTimeout(() => {
            if (currentQuestion < questions.length - 1 && lives > 0) {
                currentQuestion++;
                updateQuestion();
            } else {
                // Update progress bar to 100% at the end
                progressBar.style.width = "100%";
                // Game Over
                questionElement.textContent = lives > 0 ? "Congratulations! Quiz Complete!" : "Game Over!";
                optionsContainer.innerHTML = `<div style="color: white; font-size: 24px; text-align: center;">Final Score: ${score}</div>`;
            }
        }, 1500);
    }

    // Initialize the game
    updateQuestion();
});