// Sample quiz questions for software engineering exit exam
        let quizQuestions = [
            {
                question: "What is the time complexity of QuickSort in the average case?",
                options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                answer: 1,
                explanation: "QuickSort has an average case time complexity of O(n log n), making it efficient for large datasets.",
                course: "Algorithms"
            },
            {
                question: "Which principle of OOP emphasizes hiding internal implementation details?",
                options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
                answer: 2,
                explanation: "Encapsulation is the OOP principle that bundles data and methods together and restricts direct access to some components.",
                course: "Java Programming"
            },
            {
                question: "In database systems, what does ACID stand for?",
                options: [
                    "Atomicity, Consistency, Isolation, Durability",
                    "Association, Concurrency, Integration, Design",
                    "Access, Control, Integrity, Data",
                    "Analysis, Consistency, Integration, Durability"
                ],
                answer: 0,
                explanation: "ACID stands for Atomicity (transactions are all or nothing), Consistency (database remains consistent), Isolation (transactions don't interfere), and Durability (committed transactions persist).",
                course: "Database Systems"
            },
            {
                question: "What is the main difference between supervised and unsupervised learning?",
                options: [
                    "Supervised learning uses labeled data, unsupervised learning uses unlabeled data",
                    "Supervised learning is faster than unsupervised learning",
                    "Unsupervised learning requires more computational power",
                    "Supervised learning is for regression, unsupervised for classification"
                ],
                answer: 0,
                explanation: "Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data without predefined outcomes.",
                course: "Data Science"
            },
            {
                question: "Which data structure uses LIFO (Last-In-First-Out) principle?",
                options: ["Queue", "Stack", "Linked List", "Tree"],
                answer: 1,
                explanation: "A Stack follows the LIFO principle where the last element added is the first one to be removed.",
                course: "Data Structures"
            },
            {
                question: "What is the purpose of the 'finally' block in Java exception handling?",
                options: [
                    "To handle an exception",
                    "To throw an exception",
                    "To define code that always executes",
                    "To catch specific exceptions"
                ],
                answer: 2,
                explanation: "The 'finally' block always executes regardless of whether an exception is thrown or caught, making it ideal for cleanup code.",
                course: "Java Programming"
            },
            {
                question: "What does the HTTP status code 404 indicate?",
                options: [
                    "Server error",
                    "Authentication required",
                    "Page not found",
                    "Request successful"
                ],
                answer: 2,
                explanation: "The HTTP 404 status code indicates that the server cannot find the requested resource.",
                course: "Web Technologies"
            },
            {
                question: "Which normal form eliminates transitive dependencies?",
                options: [
                    "First Normal Form (1NF)",
                    "Second Normal Form (2NF)",
                    "Third Normal Form (3NF)",
                    "Boyce-Codd Normal Form (BCNF)"
                ],
                answer: 2,
                explanation: "Third Normal Form (3NF) eliminates transitive dependencies, requiring that all attributes depend only on the primary key.",
                course: "Database Systems"
            },
            {
                question: "What is the primary goal of the Scrum framework?",
                options: [
                    "To document all requirements upfront",
                    "To deliver value incrementally in iterations",
                    "To eliminate the need for testing",
                    "To create comprehensive documentation"
                ],
                answer: 1,
                explanation: "Scrum is an agile framework that focuses on delivering value to customers incrementally through short iterations called sprints.",
                course: "Software Engineering"
            },
            {
                question: "Which algorithm is used for shortest path finding in graphs?",
                options: [
                    "Bubble Sort",
                    "Dijkstra's Algorithm",
                    "Binary Search",
                    "QuickSort"
                ],
                answer: 1,
                explanation: "Dijkstra's algorithm finds the shortest path between nodes in a graph with non-negative edge weights.",
                course: "Algorithms"
            }
        ];

        // DOM Elements
        const registrationPage = document.getElementById('registration-page');
        const quizPage = document.getElementById('quiz-page');
        const resultsPage = document.getElementById('results-page');
        const registrationForm = document.getElementById('registration-form');
        const questionElement = document.getElementById('question');
        const courseTagElements = document.querySelectorAll('.course-tag');
        const cardNumberElements = document.querySelectorAll('.card-number');
        const showAnswerBtn = document.getElementById('show-answer-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitQuizBtn = document.getElementById('submit-quiz-btn');
        const currentCardElement = document.getElementById('current-card');
        const totalCardsElement = document.getElementById('total-cards');
        const progressFill = document.getElementById('progress-fill');
        const quizOptions = document.getElementById('quiz-options');
        const flashcard = document.getElementById('flashcard');
        const answerElement = document.getElementById('answer');
        const resultName = document.getElementById('result-name');
        const finalScore = document.getElementById('final-score');
        const correctAnswers = document.getElementById('correct-answers');
        const performance = document.getElementById('performance');
        const timeSpent = document.getElementById('time-spent');
        const futureEngineers = document.getElementById('future-engineers');
        const restartBtn = document.getElementById('restart-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const timerElement = document.getElementById('timer');
        const bottomTimerElement = document.getElementById('bottom-timer');
        const addQuestionForm = document.getElementById('add-question-form');
        const notification = document.getElementById('notification');

        // State variables
        let currentQuestionIndex = 0;
        let userAnswers = Array(quizQuestions.length).fill(null);
        let startTime = null;
        let studentData = null;
        let timerInterval = null;
        let elapsedTime = 0;

        // Initialize the application
        function initApp() {
            // Load custom questions from localStorage
            const savedQuestions = localStorage.getItem('customQuestions');
            if (savedQuestions) {
                const customQuestions = JSON.parse(savedQuestions);
                quizQuestions = [...quizQuestions, ...customQuestions];
            }
            
            // Load student data if available
            const savedData = localStorage.getItem('flashcardQuizData');
            if (savedData) {
                studentData = JSON.parse(savedData);
                // If student data exists, skip registration
                showPage(quizPage);
                startQuiz();
            }
            
            // Set up event listeners
            registrationForm.addEventListener('submit', handleRegistration);
            showAnswerBtn.addEventListener('click', showAnswer);
            prevBtn.addEventListener('click', showPreviousQuestion);
            nextBtn.addEventListener('click', showNextQuestion);
            submitQuizBtn.addEventListener('click', submitQuiz);
            restartBtn.addEventListener('click', restartQuiz);
            logoutBtn.addEventListener('click', logout);
            addQuestionForm.addEventListener('submit', handleAddQuestion);
        }

        // Handle registration form submission
        function handleRegistration(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const id = document.getElementById('id').value;
            const university = document.getElementById('university').value;
            const department = document.getElementById('department').value;
            
            studentData = {
                name,
                id,
                university,
                department,
                attempts: 0,
                bestScore: 0
            };
            
            // Save to localStorage
            localStorage.setItem('flashcardQuizData', JSON.stringify(studentData));
            
            // Start the quiz
            showPage(quizPage);
            startQuiz();
        }

        // Start the quiz
        function startQuiz() {
            startTime = new Date();
            currentQuestionIndex = 0;
            userAnswers = Array(quizQuestions.length).fill(null);
            elapsedTime = 0;
            
            // Start timer
            startTimer();
            
            displayQuestion();
        }

        // Start the timer
        function startTimer() {
            // Clear any existing timer
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            
            // Update timer immediately
            updateTimer();
            
            // Set interval to update timer every second
            timerInterval = setInterval(() => {
                elapsedTime++;
                updateTimer();
            }, 1000);
        }

        // Update timer display
        function updateTimer() {
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            const timeString = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            timerElement.textContent = timeString;
            bottomTimerElement.textContent = timeString;
        }

        // Display current question
        function displayQuestion() {
            const question = quizQuestions[currentQuestionIndex];
            
            // Update question text
            questionElement.textContent = question.question;
            
            // Update course tag
            courseTagElements.forEach(tag => {
                tag.textContent = question.course;
            });
            
            // Update card numbers
            cardNumberElements.forEach(el => {
                el.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
            });
            
            // Update progress indicators
            currentCardElement.textContent = currentQuestionIndex + 1;
            totalCardsElement.textContent = quizQuestions.length;
            progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
            
            // Create options
            quizOptions.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                if (userAnswers[currentQuestionIndex] === index) {
                    button.classList.add('selected');
                }
                button.textContent = option;
                button.addEventListener('click', () => selectAnswer(index));
                quizOptions.appendChild(button);
            });
            
            // Update answer text
            answerElement.textContent = question.explanation;
            
            // Reset card to front
            flashcard.classList.remove('flipped');
            showAnswerBtn.textContent = 'Show Answer';
            
            // Update navigation buttons state
            prevBtn.disabled = currentQuestionIndex === 0;
            nextBtn.disabled = currentQuestionIndex === quizQuestions.length - 1;
        }

        // Select an answer
        function selectAnswer(index) {
            userAnswers[currentQuestionIndex] = index;
            
            // Update UI to show selected answer
            const options = quizOptions.querySelectorAll('.option-btn');
            options.forEach((btn, i) => {
                btn.classList.remove('selected');
                if (i === index) {
                    btn.classList.add('selected');
                }
            });
        }

        // Show answer and evaluate selection
        function showAnswer() {
            const question = quizQuestions[currentQuestionIndex];
            const selectedAnswer = userAnswers[currentQuestionIndex];
            
            // Check if the card is already flipped
            if (flashcard.classList.contains('flipped')) {
                // If it is flipped, show the question side
                flashcard.classList.remove('flipped');
                showAnswerBtn.textContent = 'Show Answer';
            } else {
                // If it is not flipped, show the answer side
                flashcard.classList.add('flipped');
                showAnswerBtn.textContent = 'Show Question';
                
                // Mark the correct and incorrect answers
                const options = quizOptions.querySelectorAll('.option-btn');
                options.forEach((btn, index) => {
                    if (index === question.answer) {
                        btn.classList.add('correct');
                    } else if (index === selectedAnswer && index !== question.answer) {
                        btn.classList.add('incorrect');
                    }
                });
            }
        }

        // Show previous question
        function showPreviousQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion();
            }
        }

        // Show next question
        function showNextQuestion() {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            }
        }

        // Submit the quiz
        function submitQuiz() {
            // Stop the timer
            clearInterval(timerInterval);
            
            // Calculate score
            const score = calculateScore();
            
            // Update student data
            studentData.attempts++;
            if (score > studentData.bestScore) {
                studentData.bestScore = score;
            }
            
            // Save updated data
            localStorage.setItem('flashcardQuizData', JSON.stringify(studentData));
            
            // Calculate time spent
            const endTime = new Date();
            const timeDiff = (endTime - startTime) / 1000; // in seconds
            const minutes = Math.floor(timeDiff / 60);
            const seconds = Math.floor(timeDiff % 60);
            
            // Display results
            showResults(score, minutes, seconds);
        }

        // Calculate the quiz score
        function calculateScore() {
            let correctCount = 0;
            
            userAnswers.forEach((answer, index) => {
                if (answer === quizQuestions[index].answer) {
                    correctCount++;
                }
            });
            
            return (correctCount / quizQuestions.length) * 100;
        }

        // Display results
        function showResults(score, minutes, seconds) {
            // Update result elements
            resultName.textContent = studentData.name;
            finalScore.textContent = `${score.toFixed(1)}%`;
            
            const correctCount = userAnswers.filter((answer, index) => 
                answer === quizQuestions[index].answer).length;
            correctAnswers.textContent = `${correctCount}/${quizQuestions.length}`;
            
            // Set performance text based on score
            if (score >= 90) performance.textContent = "Excellent";
            else if (score >= 70) performance.textContent = "Good";
            else if (score >= 50) performance.textContent = "Average";
            else performance.textContent = "Needs Improvement";
            
            timeSpent.textContent = `${minutes}m ${seconds}s`;
            
            // Set future engineers count
            futureEngineers.textContent = "🧑‍💻";
            
            // Show results page
            showPage(resultsPage);
        }

        // Handle adding a new question
        function handleAddQuestion(e) {
            e.preventDefault();
            
            const newQuestion = document.getElementById('new-question').value;
            const option1 = document.getElementById('option1').value;
            const option2 = document.getElementById('option2').value;
            const option3 = document.getElementById('option3').value;
            const option4 = document.getElementById('option4').value;
            const correctOption = parseInt(document.getElementById('correct-option').value);
            const explanation = document.getElementById('explanation').value;
            const course = document.getElementById('question-course').value;
            
            const question = {
                question: newQuestion,
                options: [option1, option2, option3, option4],
                answer: correctOption,
                explanation: explanation,
                course: course
            };
            
            // Add to questions array
            quizQuestions.push(question);
            
            // Save to localStorage
            const savedQuestions = localStorage.getItem('customQuestions');
            let customQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];
            customQuestions.push(question);
            localStorage.setItem('customQuestions', JSON.stringify(customQuestions));
            
            // Show notification
            showNotification("Question added successfully!");
            
            // Reset form
            addQuestionForm.reset();
        }

        // Show notification
        function showNotification(message) {
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Restart the quiz
        function restartQuiz() {
            showPage(quizPage);
            startQuiz();
        }

        // Logout functionality
        function logout() {
            // Clear student data
            localStorage.removeItem('flashcardQuizData');
            studentData = null;
            
            // Stop timer if running
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            
            // Reset timer display
            timerElement.textContent = "Time: 00:00";
            bottomTimerElement.textContent = "Time: 00:00";
            
            // Show registration page
            showPage(registrationPage);
            
            // Reset registration form
            registrationForm.reset();
        }

        // Helper function to show a specific page
        function showPage(page) {
            // Hide all pages
            registrationPage.classList.remove('active');
            quizPage.classList.remove('active');
            resultsPage.classList.remove('active');
            
            // Show the requested page
            page.classList.add('active');
        }

        // Initialize the app when the page loads
        window.addEventListener('load', initApp);
