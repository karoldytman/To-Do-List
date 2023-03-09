{
    let tasks = [];
    let hideDoneTasks = false;

    const toggleShowTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const doneTask = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex),
            {...tasks[taskIndex], done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map((task) => ({...task, done: true }));
        render();
    };

    const addnewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const clearFocus = () => {
        const newTask = document.querySelector(".js-newTask");
        newTask.value = "";
        newTask.focus();

    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                doneTask(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item ${task.done && hideDoneTasks === true ? "tasks__item--hiden" : ""}">
            <button class="js-done tasks__button tasks__button--done">${task.done ? "✔" : ""}</button>
            <span class="tasks__Content ${task.done ? "task__content--done" : ""}" >${task.content}</span> 
            <button class="js-remove tasks__button tasks__button--remove">🗑</button>
            </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const bindButtonsEvents = () => {
        const completeAllButton = document.querySelector(".js-completeAll");

        if (completeAllButton) {
            completeAllButton.addEventListener("click", completeAllTasks)
        }

        const hideShowButton = document.querySelector(".js-hideShow");

        if (hideShowButton) {
            hideShowButton.addEventListener("click", toggleShowTasks)
        };

    };

    const renderButtons = () => {
        let htmlButtonsString = "";

        if (tasks.length > 0) {


            htmlButtonsString += `
                <button class="js-hideShow buttons__button hideShowButton">
                ${hideDoneTasks === false ? "Ukryj" : "Pokaż"} ukończone
                </button>
                <button class="js-completeAll buttons__button completeAllButton"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}
                >
                Ukończ wszystkie
                </button>  
                `
        }

        document.querySelector(".js-buttons").innerHTML = htmlButtonsString;

    };


    const render = () => {
        renderTasks();
        bindEvents();
        renderButtons();
        bindButtonsEvents();
    };

    const oneFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value;
        if (newTaskContent === "") {
            return;
        }
        addnewTask(newTaskContent);
        clearFocus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", oneFormSubmit);
    };
    init();
}