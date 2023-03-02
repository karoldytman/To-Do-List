{
    const tasks = [];
    let hideDoneTasks = false;

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item ${task.done & hideDoneTasks === true ? "tasks__button--done" : ""}">
            <button class="js-done tasks__button tasks__button--done">${task.done ? "✔" : ""}</button>
            <span class="tasks__Content ${task.done ? "task__content--done" : ""}" >${task.content}</span> 
            <button class="js-remove tasks__button tasks__button--remove">🗑</button>
            </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

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
    }
    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }
    const doneTask = (indexTask) => {
        tasks[indexTask].done = !tasks[indexTask].done;
        render();
    }

    const addnewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const oneFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask");
        const newTaskElement = newTaskContent.value;
        if (newTaskElement !== "") {
            addnewTask(newTaskElement);
            newTaskContent.value = "";
        };
        newTaskContent.focus();

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", oneFormSubmit);
    };
    init();
}