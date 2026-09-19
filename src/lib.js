import { patchData } from "../core/http_methods.js";
import { base_url, todos } from "../core/endpoints.js";


export function renderTasks(tasks, users) {

    const tableBody =
        document.getElementById("taskTableBody");

    tableBody.innerHTML = "";


    tasks.forEach((task, index) => {

        const employee =
            users.find(
                user => user.id === task.employee_id
            );


        if (!employee) {
            return;
        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <th scope="row">
                ${index + 1}
            </th>


            <td>
                ${employee.fname}
            </td>


            <td>
                ${employee.lname}
            </td>


            <td class="task-desc">
                ${task.task}
            </td>


            <td>

                <select
                    class="form-select form-select-sm status-dropdown ${getStatusClass(task.status)}"
                    data-task-id="${task.id}">

                    <option
                        value="pending"
                        ${task.status === "pending" ? "selected" : ""}>

                        Pending

                    </option>


                    <option
                        value="in-progress"
                        ${task.status === "in-progress" ? "selected" : ""}>

                        In Progress

                    </option>


                    <option
                        value="completed"
                        ${task.status === "completed" ? "selected" : ""}>

                        Completed

                    </option>

                </select>

            </td>


            <td>

                <button
                    class="btn btn-sm btn-outline-primary edit-task"
                    data-task-id="${task.id}">

                    Edit

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


function getStatusClass(status) {

    if (status === "pending") {

        return "bg-warning text-dark";

    }


    if (status === "in-progress") {

        return "bg-info text-white";

    }


    if (status === "completed") {

        return "bg-success text-white";

    }


    return "";

}



export function renderEmployeeOptions(users) {

    const employeeSelect =
        document.getElementById("employee");


    employeeSelect.innerHTML = `

        <option
            value=""
            selected
            disabled>

            Select employee

        </option>

    `;


    users.forEach(user => {

        const option =
            document.createElement("option");


        option.value = user.id;


        option.textContent =
            `${user.fname} ${user.lname}`;


        employeeSelect.appendChild(option);

    });

}