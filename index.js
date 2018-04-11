document.addEventListener("DOMContentLoaded", function(event) {
  let rendered = false;
  const list = document.getElementById("list");
  const profile = document.getElementById("profile");

  document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    if (rendered) emptyList();
    searchGit();
    rendered = true;
  });

  async function searchGit() {
    let x = document.getElementById("searchBar").value;
    const response = await fetch(`https://api.github.com/users/${x}/repos`);
    const userData = response.json();
    renderUserProfile(userData);
    ListView(userData);
  }

  function emptyList() {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    while (profile.firstChild) {
      profile.removeChild(profile.firstChild);
    }
  }

  function renderUserProfile(data) {
    data.then(function(res) {
      const avatar = document.createElement("img");
      avatar.setAttribute("id", "avatar");
      const username = document.createElement("h2");
      const usernameText = document.createTextNode(res[1].owner.login);
      username.setAttribute("id", "username");
      avatar.src = res[1].owner.avatar_url;
      avatar.style.width = "100px";
      avatar.style.height = "100px";
      avatar.style.padding = "5px";
      profile.appendChild(avatar);
      username.appendChild(usernameText);
      profile.appendChild(username);
    });
  }

  async function ListView(data) {
    let repoNameArr = [];
    await data.then(function(res) {
      if (res.message === "Not Found") {
        DoesNotExist();
      }
      res.map(repo => ListItem(repo.name, repo.html_url));
    });
    const box = document.getElementById("box");
    box.style.height = "700px";
  }

  function DoesNotExist() {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const message = document.createTextNode("Does Not Exist");
    h3.appendChild(message);
    li.appendChild(h3);
    li.classList.add("list-item");
    list.appendChild(li);
    box.style.height = "100px";
  }

  function ListItem(name, locationUrl) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const link = document.createElement("a");
    const nameText = document.createTextNode(name);
    link.href = locationUrl;
    h3.appendChild(nameText);
    link.appendChild(h3);
    li.appendChild(link);
    li.classList.add("list-item");
    list.appendChild(li);
  }
});
