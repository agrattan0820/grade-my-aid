async function getData() {
  let response = await fetch("./universityData.json");
  let data = response.json();
  return data;
}

getData()
  .then((data) => console.log(data))
  .catch((reason) => console.log(reason.message));

const container = document.querySelector(".container");
