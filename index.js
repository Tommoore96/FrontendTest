document.addEventListener("DOMContentLoaded", function(event) {
  let rendered = false;

  document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    if (rendered) emptyList();
    searchGit();
  });

  async function searchGit() {
    let x = document.getElementById("searchBar").value;
    const response = await fetch(`https://api.github.com/users/${x}/repos`);
    const userData = response.json();
    const list = document.getElementById("list");
    renderUserProfile(userData);
    renderUserRepos(userData);
  }

  function emptyList() {
    const list = document.getElementById("list");
    const profile = document.getElementById("profile");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    while (profile.firstChild) {
      profile.removeChild(profile.firstChild);
    }
    rendered = false;
  }

  function renderUserProfile(data) {
    data.then(function(res) {
      console.log(res);
      const profile = document.getElementById("profile");
      const avatar = document.createElement("img");
      avatar.setAttribute("id", "avatar");
      // const userName = document.createElement("h2");
      // const userNameText = document.createTextNode(data[1].owner.login);
      avatar.src = res[1].owner.avatar_url;
      avatar.style.width = "100px";
      avatar.style.height = "100px";
      avatar.style.padding = "5px";
      profile.appendChild(avatar);
      // userName.appendChild(userNameText);
      // profile.appendChild(username);
    });
  }

  async function renderUserRepos(data) {
    let repoNameArr = [];
    await data.then(function(res) {
      if (res.message === "Not Found") {
        DoesNotExist();
      }
      res.map(repo => ListItem(repo.name, repo.html_url));
    });
  }

  function DoesNotExist() {
    rendered = true;
    const list = document.getElementById("list");
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const message = document.createTextNode("Does Not Exist");
    h3.appendChild(message);
    li.appendChild(h3);
    li.classList.add("list-item");
    list.appendChild(li);
  }

  function ListItem(name, locationUrl) {
    rendered = true;
    const list = document.getElementById("list");
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const link = document.createElement("a");
    const nameText = document.createTextNode(name);
    link.href = locationUrl;
    h3.appendChild(nameText);
    link.appendChild(h3);
    li.appendChild(link);
    li.style.color = "pink";
    li.classList.add("list-item");
    list.appendChild(li);
  }
});
