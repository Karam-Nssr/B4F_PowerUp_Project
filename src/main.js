import {
  getData,
  deleteData,
  patchData,
  postData,
} from "../core/http_methods.js";
import { base_url, todos, users } from "../core/endpoints.js";
import { User } from "./User.js";
import { Task } from "./Todo.js";
import { renderTasks } from "./lib.js";
// const ammar = new User("Ammar", "Farha", "MALE", 25, "IT");
// const karam = new User("Karam", "Nssr", "MALE", 21, "IT");
// const adnan = new User("Adnan", "Al-Sous", "MALE", 23, "IT");

// const ammarCreated = await postData(base_url + users, ammar);
// const karamCreated = await postData(base_url + users, karam);
// const adnanCreated = await postData(base_url + users, adnan);

// const todo = new Task(ammarCreated, "Create a Website");

// await postData(base_url + todos, todo);

// const users_list = await getData(base_url + users);
// const todos_list = await getData(base_url + todos);

// console.log(users_list);
// console.log(todos_list);
const users_list = await getData(base_url + users);
const todos_list = await getData(base_url + todos);
console.log("Users:", users_list);
console.log("Todos:", todos_list);
renderTasks(todos_list, users_list);
