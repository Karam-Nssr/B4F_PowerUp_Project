import { Task } from "./Task.js";

console.log("HELLO");
const url = "http://localhost:3000/users";

const ammar = new Task("Ammar", "Farhat", "BLOBOBOBBOB");
fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));

//
// fetch(url, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(ammar),
// })
//   .then((res) => res.json())
//   .then((data) => console.log("Task saved:", data))
//   .catch((err) => console.error("Error saving task:", err));
