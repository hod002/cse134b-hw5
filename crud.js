/* Creates a post to the endpoint */
function createPost(event) {
  event.preventDefault();
  let endpoint = "https://httpbin.org/post";
  let date = (document.getElementById(
    "date"
  ).value = new Date().toLocaleDateString());
  let form = new FormData(document.getElementById("crud-form"));

  const request = new Request(endpoint, {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(form)),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  console.log("post");
  fetch(request)
    .then((response) => {
      return response.text().then(function (text) {
        text = JSON.parse(text);
        document.getElementById("response").innerHTML = "";
        for (let property in text) {
          document.getElementById(
            "response"
          ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
          document.getElementById("response").innerHTML += "<br>";
        }
      });
    })
    .then((data) => data)
    .catch((error) => error);
}

/* Edits post at endpoint */
function editPost(event) {
  event.preventDefault();
  let endpoint = "https://httpbin.org/put";
  let date = (document.getElementById(
    "date"
  ).value = new Date().toLocaleDateString());
  let form = new FormData(document.getElementById("crud-form"));

  const request = new Request(`${endpoint}`, {
    method: "PUT",
    body: JSON.stringify(Object.fromEntries(form)),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  fetch(request)
    .then((response) => {
      return response.text().then(function (text) {
        text = JSON.parse(text);
        document.getElementById("response").innerHTML = "";
        for (let property in text) {
          document.getElementById(
            "response"
          ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
          document.getElementById("response").innerHTML += "<br>";
        }
      });
    })
    .then((data) => data)
    .catch((error) => error);
}

/* Gets post at endpoint */
function getPost(event) {
  console.log("getPost");
  event.preventDefault();
  let endpoint = "https://httpbin.org/get";

  const request = new Request(`${endpoint}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  console.log(request);

  fetch(request)
    .then((response) => {
      if (response.status == "404") {
        throw new Error("Network Error: 404");
      }
      return response.text().then(function (text) {
        text = JSON.parse(text);
        document.getElementById("response").innerHTML = "";
        for (let property in text) {
          document.getElementById(
            "response"
          ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
          document.getElementById("response").innerHTML += "<br>";
        }
      });
    })
    .then((data) => {
      console.log("got data");
    })
    .catch((error) => {
      console.log("caught error");
      document.getElementById("response").innerHTML = error;
    });
}

/* Deletes post at endpoint */
function deletePost(event) {
  event.preventDefault();
  let endpoint = "https://httpbin.org/delete";
  let date = (document.getElementById(
    "date"
  ).value = new Date().toLocaleDateString());
  let form = new FormData(document.getElementById("crud-form"));

  const request = new Request(`${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(Object.fromEntries(form)),
  });

  fetch(request)
    .then((response) => {
      if (response.status == "404") {
        throw new Error("Network Error: 404");
      }
      return response.text().then(function (text) {
        text = JSON.parse(text);
        document.getElementById("response").innerHTML = "";
        for (let property in text) {
          document.getElementById(
            "response"
          ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
          document.getElementById("response").innerHTML += "<br>";
        }
      });
    })
    .then((data) => data)
    .catch((error) => {
      document.getElementById("response").innerHTML = error;
    });
}

let postBtn = document.getElementById("postBtn");
let putBtn = document.getElementById("putBtn");
let getBtn = document.getElementById("getBtn");
let deleteBtn = document.getElementById("deleteBtn");
getBtn.addEventListener("click", getPost);
deleteBtn.addEventListener("click", deletePost);

window.addEventListener("submit", handleEvent);
function handleEvent(event) {
  event.preventDefault();
  if (event.submitter.id == "postBtn") {
    createPost(event);
  } else if (event.submitter.id == "putBtn") {
    editPost(event);
  }
}
