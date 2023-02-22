{
    const tasks = [{
            content: "zadanie 1",
            done: false,
        },
        {
            content: "zadanie 2",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li${task.done ? "" : ""}>
            <button class="js-done tasks__button--done">✔<?button> 
            <button class="js-remove tasks__button--remove">🗑</button>
            ${task.content}
            </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                remuveTask(index);
            });
        });
    };
    const remuveTask = (index) => {
        tasks.splice(index, 1);
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

        const newTaskContent = document.querySelector(".js-newTask").value;

        if (newTaskContent === "") {
            return;
        }

        addnewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", oneFormSubmit);
    };
    init();
}