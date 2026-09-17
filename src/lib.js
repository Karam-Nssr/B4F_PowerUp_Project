import { patchData } from "../core/http_methods.js";
import { base_url, todos } from "../core/endpoints.js";
const add_btn = document.getElementById("add_btn");
const taskList = [];
document
  .getElementById("taskTableBody")
  .addEventListener("change", async function (e) {
    if (e.target.classList.contains("status-dropdown")) {
      const select = e.target;

      const taskId = select.dataset.taskId;
      const newStatus = select.value;

      select.classList.remove(
        "bg-warning",
        "bg-info",
        "bg-success",
        "text-dark",
        "text-white",
      );

      if (newStatus === "pending") {
        select.classList.add("bg-warning", "text-dark");
      } else if (newStatus === "in-progress") {
        select.classList.add("bg-info", "text-white");
      } else if (newStatus === "completed") {
        select.classList.add("bg-success", "text-white");
      }

      await patchData(`${base_url}${todos}/${taskId}`, {
        status: newStatus,
      });
    }
  });
export function renderTasks(tasks, users) {
  const tableBody = document.getElementById("taskTableBody");

  tableBody.innerHTML = "";

  tasks.forEach((task, index) => {
    const employee = users.find((user) => user.id === task.employee_id);

    if (!employee) return;

    const row = document.createElement("tr");

    row.innerHTML = `
            <th scope="row">${index + 1}</th>

            <td>${employee.fname}</td>

            <td>${employee.lname}</td>

            <td class="task-desc">
                ${task.task}
            </td>

            <td>
                <select
                    class="form-select form-select-sm status-dropdown ${getStatusClass(task.status)}"
                    data-task-id="${task.id}"
                >
                    <option value="pending" ${task.status === "pending" ? "selected" : ""}>
                        Pending
                    </option>

                    <option value="in-progress" ${task.status === "in-progress" ? "selected" : ""}>
                        In Progress
                    </option>

                    <option value="completed" ${task.status === "completed" ? "selected" : ""}>
                        Completed
                    </option>
                </select>
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
