import {
  getData,
  deleteData,
  patchData,
  postData,
} from "../core/http_methods.js";
import { base_url, users } from "../core/endpoints.js";
import { Task } from "./Task.js";

const ammar = new Task("Ammar", "Farhat", "BLOBOBOBBOB");

const users_list = await getData(base_url + users);
console.log(users_list);
