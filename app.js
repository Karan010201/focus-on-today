document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".task input[type='text']");
    const buttons = document.querySelectorAll(".task div[id='radio']");
    const progressBar = document.querySelector(".progress-value");

    

    // Load tasks and progress from localStorage
    tasks.forEach((task, index) => {
        const savedTask = localStorage.getItem(`task${index}`);
        if (savedTask) {
            task.value = savedTask;
            if (localStorage.getItem(`completed${index}`) === "true") {
                buttons[index].classList.add("cut");
                task.classList.add("completed");
            }
        }
    });

    // Add event listeners to buttons and tasks
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => toggleTask(index));
    });

    tasks.forEach((task, index) => {
        task.addEventListener("input", () => saveTask(index, task.value));
    });

    // Toggle task completion
    function toggleTask(index) {
        buttons[index].classList.toggle("cut");
        tasks[index].classList.toggle("completed");

        const isCompleted = buttons[index].classList.contains("cut");
        localStorage.setItem(`completed${index}`, isCompleted);

        updateProgressBar();
    }

    // Save task value to localStorage
    function saveTask(index, value) {
        localStorage.setItem(`task${index}`, value);

        // Reset the radio button if task is modified
        buttons[index].classList.remove("cut");
        tasks[index].classList.remove("completed");
        localStorage.setItem(`completed${index}`, false);

        updateProgressBar();
    }

    // Update progress bar
    function updateProgressBar() {
        const completedTasks = Array.from(buttons).filter(button => button.classList.contains("cut")).length;
        const progress = (completedTasks / tasks.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;
    }

    // Initialize progress bar
    updateProgressBar();
});

