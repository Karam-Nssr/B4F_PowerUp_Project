export function renderUsers(users) {
    const tableBody =
        document.getElementById("userTableBody");


    tableBody.innerHTML = "";


    users.forEach((user, index) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <th scope="row">
                ${index + 1}
            </th>


            <td>
                ${user.fname}
            </td>


            <td>
                ${user.lname}
            </td>


            <td>
                ${user.gender}
            </td>


            <td>
                ${user.age}
            </td>


            <td>
                ${user.job_title}
            </td>


            <td>

                <button
                    class="btn btn-sm btn-outline-primary edit-user"
                    data-user-id="${user.id}">

                    Edit

                </button>

            </td>

        `;
        tableBody.appendChild(row);
    });
}