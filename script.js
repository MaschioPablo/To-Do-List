
document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");

    // Cargar tareas guardadas al cargar la página
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function (taskText) {
        const taskItem = createTaskElement(taskText);
        if (taskItem.classList.contains("completed")) {
            taskList.appendChild(taskItem);
        } else {
            taskList.insertBefore(taskItem, taskList.firstChild);
        }
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            const taskItem = createTaskElement(taskText);
            taskList.insertBefore(taskItem, taskList.firstChild);
            newTaskInput.value = "";

            // Guardar la lista de tareas en el almacenamiento local
            const tasks = [taskText, ...savedTasks];
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    newTaskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    addTaskButton.addEventListener("click", function () {
        addTask();
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
            taskItem.classList.toggle("completed");

            if (taskItem.classList.contains("completed")) {
                taskList.appendChild(taskItem);
            } else {
                taskList.insertBefore(taskItem, taskList.firstChild);
            }

            // Actualizar la lista de tareas en el almacenamiento local al completar una tarea
            const tasks = savedTasks.filter(task => task !== text);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        deleteButton.addEventListener("click", function () {
            taskItem.remove();
            // Actualizar la lista de tareas en el almacenamiento local al eliminar una tarea
            const tasks = savedTasks.filter(task => task !== text);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        moveUpButton.addEventListener("click", function () {
            if (taskItem.previousElementSibling) {
                taskList.insertBefore(taskItem, taskItem.previousElementSibling);
                // Actualizar la lista de tareas en el almacenamiento local al mover una tarea
                const tasks = moveTask(savedTasks, text, -1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        });

        moveDownButton.addEventListener("click", function () {
            if (taskItem.nextElementSibling) {
                taskList.insertBefore(taskItem.nextElementSibling, taskItem);
                // Actualizar la lista de tareas en el almacenamiento local al mover una tarea
                const tasks = moveTask(savedTasks, text, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
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

    function moveTask(tasks, taskText, direction) {
        const index = tasks.indexOf(taskText);
        const newIndex = index + direction;
        if (index >= 0 && newIndex >= 0 && newIndex < tasks.length) {
            const newTasks = [...tasks];
            newTasks.splice(index, 1);
            newTasks.splice(newIndex, 0, taskText);
            return newTasks;
        }
        return tasks;
    }
});
