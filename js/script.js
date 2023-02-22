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
            <button class=".tasks__button--remove">🗑</button>
            ${task.content}
            </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const removeButtons = document.querySelectorAll(".tasks__button--remove");

    removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
            tasks.splice(index);
        });
    });

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value;

            if (newTaskContent === "") {
                return;
            }

            tasks.push({
                content: newTaskContent,
            });

            render();
        });
    };
    init();
}