const url = "http://localhost:8080/api/logs";
const logTableBody = document.querySelector(".log-table-body");
// console.log(logTableBody)

const inputData = (data, idx) => {
  const sample = `
    <tr>
      <th scope="row">${idx}</th>
      <td>
        <div class="alert alert-primary" role="alert">${data.message}</div>
      </td>
      <td>${data.level}</td>
      <td>${data.timestamp}</td>
    </tr>
  `;
  return sample;
};

const changeAlertColor = () => {
  logTableBody.querySelectorAll(".alert").forEach((element) => {
    if (element.innerHTML.includes("warn")) {
      element.classList.remove("alert-primary");
      element.classList.add("alert-warning");
    }
    if (element.innerHTML.includes("info")) {
      element.classList.remove("alert-primary");
      element.classList.add("alert-info");
    }
    if (element.innerHTML.includes("error")) {
      element.classList.remove("alert-primary");
      element.classList.add("alert-danger");
    }
  });
};

const getData = async () => {
  try {
    await axios.post(url);
    const response = await axios.get(url);
    if (response.data) {
      let trTags = "";
      response.data.map((data, idx) => {
        let trTag = inputData(data, idx);
        trTags += trTag;
      });
      logTableBody.innerHTML = trTags;
      changeAlertColor();
    }
  } catch (error) {
    console.log(error);
  }
};

getData();