export class Task {
  constructor(employee_id, task) {
    this.employee_id = employee_id;
    this.status = "pending";
    this.task = task;
  }
}
