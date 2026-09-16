const add_btn = document.getElementById("add_btn");
const taskList = [];
document
  .getElementById("taskTableBody")
  .addEventListener("change", function (e) {
    if (e.target.classList.contains("status-dropdown")) {
      const select = e.target;
      select.classList.remove(
        "bg-warning",
        "bg-info",
        "bg-success",
        "text-dark",
        "text-white",
      );

      if (select.value === "pending") {
        select.classList.add("bg-warning", "text-dark");
      } else if (select.value === "in-progress") {
        select.classList.add("bg-info", "text-white");
      } else if (select.value === "completed") {
        select.classList.add("bg-success", "text-white");
      }
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
