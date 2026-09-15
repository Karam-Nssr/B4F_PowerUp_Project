const add_btn=document.getElementById("add_btn");
const taskList=[];
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
export const postData=async (url,data)=>{
    try {
        const resp=await fetch(url, {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
});
if(!resp.ok){
    throw new Error(resp.status);
}
const result =await resp.json();
console.log(result)
    } catch (error) {
        console.log(error);
    }
}