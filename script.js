document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");

    addTaskButton.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            const taskItem = createTaskElement(taskText);
            taskList.appendChild(taskItem);
            newTaskInput.value = "";
        }
    });

    function createTaskElement(text) {
        const taskItem = document.createElement("li");
        taskItem.className = "task";

        const taskText = document.createElement("input");
        taskText.type = "text";
        taskText.value = text;
        taskText.disabled = true;

        const completeButton = createButton("complete", "Completar");
        const deleteButton = createButton("delete", "Eliminar");
        const moveUpButton = createButton("move-up", "↑");
        const moveDownButton = createButton("move-down", "↓");

        completeButton.addEventListener("click", function () {
            taskText.disabled = !taskText.disabled;
            taskItem.classList.toggle("completed"); // Agrega o quita la clase 'completed'
        });

        deleteButton.addEventListener("click", function () {
            taskItem.remove();
        });

        moveUpButton.addEventListener("click", function () {
            if (taskItem.previousElementSibling) {
                taskList.insertBefore(taskItem, taskItem.previousElementSibling);
            }
        });

        moveDownButton.addEventListener("click", function () {
            if (taskItem.nextElementSibling) {
                taskList.insertBefore(taskItem.nextElementSibling, taskItem);
            }
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(moveUpButton);
        taskItem.appendChild(moveDownButton);

        return taskItem;
    }

    function createButton(className, text) {
        const button = document.createElement("button");
        button.className = className;
        button.textContent = text;
        return button;
    }
});
