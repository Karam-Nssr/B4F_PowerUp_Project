export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postData = async (url, data) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const result = await resp.json();
    console.log("Post successful:", result);
    return result;
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const patchData = async (url, data) => {
  try {
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const result = await resp.json();
    console.log("Patch successful:", result);
    return result;
  } catch (error) {
    console.error("Error patching data:", error);
  }
};

export const deleteData = async (url) => {
  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const result = resp.status !== 204 ? await resp.json() : { success: true };
    console.log("Delete successful:", result);
    return result;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
