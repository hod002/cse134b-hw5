/* Creates a post to the endpoint */
function createPost(event) {
  event.preventDefault();
  let endpoint = "https://httpbin.org/post";
  let name = document.getElementById("article_name");
  let body = document.getElementById("article_body");
  let formData = {
    name: name.value,
    body: body.value,
  };

  const request = new Request(endpoint, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  console.log("post");
  fetch(request)
    .then((response) => {
      return response.text().then(function (text) {
        text = JSON.parse(text);
        for (let property in text) {
          document.getElementById(
            "output"
          ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
          document.getElementById("output").innerHTML += "<br>";
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
  let name = document.getElementById("article_name");
  let body = document.getElementById("article_body");
  let id = window.prompt("Enter ID");
  if (id != null && id != "") {
    id = Number(id);
  }

  let formData = {
    name: name.value,
    body: body.value,
    id: id,
  };

  const request = new Request(`${endpoint}/${id}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  fetch(request)
    .then((response) => {
      return response.text().then(function (text) {
        text = JSON.parse(text);
        for (let property in text) {
          document.getElementById(
            "output"
          ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
          document.getElementById("output").innerHTML += "<br>";
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
  let id = window.prompt("Enter ID");

  if (id != null && id != "" && !Number.isNaN(Number(id))) {
    id = Number(id);
    const request = new Request(`${endpoint}/${id}`, {
      method: "GET",
      headers: new Headers(),
    });

    console.log(request);

    fetch(request)
      .then((response) => {
        if (response.status == "404") {
          throw new Error("Network Error: 404");
        }
        return response.text().then(function (text) {
          text = JSON.parse(text);
          for (let property in text) {
            document.getElementById(
              "output"
            ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
            document.getElementById("output").innerHTML += "<br>";
          }
        });
      })
      .then((data) => {
        console.log("got data");
      })
      .catch((error) => {
        console.log("caught error");
        document.getElementById("output").innerHTML = error;
      });
  }
}

/* Deletes post at endpoint */
function deletePost(event) {
  event.preventDefault();
  let endpoint = "https://httpbin.org/delete";
  let id = window.prompt("Enter record id:");

  if (id != null && id != "" && !Number.isNaN(Number(id))) {
    id = Number(id);
    const request = new Request(`${endpoint}/${id}`, {
      method: "DELETE",
    });

    fetch(request)
      .then((response) => {
        if (response.status == "404") {
          throw new Error("Network Error: 404");
        }
        return response.text().then(function (text) {
          text = JSON.parse(text);
          for (let property in text) {
            document.getElementById(
              "output"
            ).innerHTML += `${property}: ${JSON.stringify(text[property])}`;
            document.getElementById("output").innerHTML += "<br>";
          }
        });
      })
      .then((data) => data)
      .catch((error) => {
        document.getElementById("output").innerHTML = error;
      });
  }
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
