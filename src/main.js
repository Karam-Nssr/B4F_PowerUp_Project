import {
    getData,
    patchData,
    postData,
} from "../core/http_methods.js";
import {
    base_url,
    todos,
    users,
} from "../core/endpoints.js";
import { Task } from "./Todo.js";
import {
    renderTasks,
    renderEmployeeOptions,
} from "./lib.js";

let usersList = [];
let tasksList = [];
let editingTaskId = null;

async function loadData() {

    usersList =
        await getData(base_url + users);

    tasksList =
        await getData(base_url + todos);


    renderTasks(
        tasksList,
        usersList
    );


    renderEmployeeOptions(
        usersList
    );

}
await loadData();

document
    .getElementById("addTaskButton")
    .addEventListener("click", () => {

        editingTaskId = null;


        document
            .getElementById("taskModalLabel")
            .textContent = "Assign New Task";


        document
            .getElementById("taskSubmitButton")
            .textContent = "Add Task";


        document
            .getElementById("taskForm")
            .reset();


        renderEmployeeOptions(usersList);

    });

document
    .getElementById("taskForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();


        const employeeId =
            document.getElementById("employee").value;


        const taskDescription =
            document.getElementById("taskDescription").value.trim();


        if (!employeeId || !taskDescription) {
            return;
        }

        if (editingTaskId) {

            await patchData(

                `${base_url}${todos}/${editingTaskId}`,

                {
                    employee_id: employeeId,
                    task: taskDescription,
                }

            );

        }

        else {
            const newTask =
                new Task(
                    employeeId,
                    taskDescription
                );


            await postData(
                base_url + todos,
                newTask
            );

        }
        tasksList =
            await getData(base_url + todos);

        renderTasks(
            tasksList,
            usersList
        );

        e.target.reset();

        editingTaskId = null;

        const modalElement =
            document.getElementById("taskModal");


        const modal =
            bootstrap.Modal.getInstance(
                modalElement
            );


        modal.hide();

    });

document
    .getElementById("taskTableBody")
    .addEventListener("change", async (e) => {

        if (
            !e.target.classList.contains(
                "status-dropdown"
            )
        ) {
            return;
        }


        const select = e.target;


        const taskId =
            select.dataset.taskId;


        const newStatus =
            select.value;

        select.classList.remove(
            "bg-warning",
            "bg-info",
            "bg-success",
            "text-dark",
            "text-white"
        );


        if (newStatus === "pending") {

            select.classList.add(
                "bg-warning",
                "text-dark"
            );

        }


        else if (newStatus === "in-progress") {

            select.classList.add(
                "bg-info",
                "text-white"
            );

        }


        else if (newStatus === "completed") {

            select.classList.add(
                "bg-success",
                "text-white"
            );

        }

        await patchData(

            `${base_url}${todos}/${taskId}`,

            {
                status: newStatus
            }

        );

    });
document
    .getElementById("taskTableBody")
    .addEventListener("click", (e) => {

        if (
            !e.target.classList.contains(
                "edit-task"
            )
        ) {
            return;
        }


        const taskId =
            e.target.dataset.taskId;


        const task =
            tasksList.find(
                task => task.id === taskId
            );


        if (!task) {
            return;
        }
        editingTaskId =
            taskId;

        document
            .getElementById("taskModalLabel")
            .textContent = "Edit Task";


        document
            .getElementById("taskSubmitButton")
            .textContent = "Save Changes";

        renderEmployeeOptions(
            usersList
        );


        document
            .getElementById("employee")
            .value = task.employee_id;
        document
            .getElementById("taskDescription")
            .value = task.task;
        const modalElement =
            document.getElementById("taskModal");


        const modal =
            new bootstrap.Modal(
                modalElement
            );


        modal.show();

    });