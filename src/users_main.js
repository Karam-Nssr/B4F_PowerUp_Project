import {
    getData,
    patchData,
    postData,
} from "../core/http_methods.js";
import {
    base_url,
    users,
} from "../core/endpoints.js";
import { renderUsers } from "./users_lib.js";

let usersList = [];

let editingUserId = null;
async function loadUsers() {

    usersList =
        await getData(
            base_url + users
        );


    renderUsers(
        usersList
    );

}
await loadUsers();

document
    .getElementById("addUserButton")
    .addEventListener("click", () => {

        editingUserId = null;


        document
            .getElementById("userModalLabel")
            .textContent =
            "Add New Employee";


        document
            .getElementById("userSubmitButton")
            .textContent =
            "Add Employee";


        document
            .getElementById("userForm")
            .reset();

    });

document
    .getElementById("userForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        const userData = {
            fname:
                document
                    .getElementById("fname")
                    .value
                    .trim(),

            lname:
                document
                    .getElementById("lname")
                    .value
                    .trim(),

            gender:
                document
                    .getElementById("gender")
                    .value,

            age:
                Number(
                    document
                        .getElementById("age")
                        .value
                ),

            job_title:
                document
                    .getElementById("job_title")
                    .value
                    .trim(),

        };
        if (editingUserId) {
            await patchData(
                `${base_url}${users}/${editingUserId}`,
                userData
            );

        }
        else {
            await postData(base_url + users,userData);
        }
        await loadUsers();
        e.target.reset();
        editingUserId = null;
        const modalElement =
            document.getElementById("userModal");

        const modal =
            bootstrap.Modal.getInstance(
                modalElement
            );
        modal.hide();
    });

document
    .getElementById("userTableBody")
    .addEventListener("click", (e) => {

        if (
            !e.target.classList.contains(
                "edit-user"
            )
        ) {
            return;
        }


        const userId =
            e.target.dataset.userId;


        const user =
            usersList.find(
                user => user.id === userId
            );


        if (!user) {
            return;
        }

        editingUserId =
            userId;
        document
            .getElementById("userModalLabel")
            .textContent =
            "Edit Employee";


        document
            .getElementById("userSubmitButton")
            .textContent =
            "Save Changes";

        document
            .getElementById("fname")
            .value =
            user.fname;


        document
            .getElementById("lname")
            .value =
            user.lname;


        document
            .getElementById("gender")
            .value =
            user.gender;


        document
            .getElementById("age")
            .value =
            user.age;


        document
            .getElementById("job_title")
            .value =
            user.job_title;

        const modalElement =
            document.getElementById("userModal");


        const modal =
            new bootstrap.Modal(
                modalElement
            );
        modal.show();
    });