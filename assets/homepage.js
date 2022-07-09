let userFormEl = document.querySelector('#user-form')
let nameInputEl = document.querySelector('#username')

let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");






let formSubmitHandler = function(event){
    event.preventDefault()
let userName = nameInputEl.value.trim()

if (userName) {
    getUserRepos(userName);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
  

    console.log(event)
}


let displayRepos = function(repos, searchTerm){
  //check if api returned any repos
  if(repos.length === 0){
    repoContainerEl.textContent = 'No repositories foundß'
  }



    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm
    
    // loop over repos
for (var i = 0; i < repos.length; i++) {
  // format repo name
  var repoName = repos[i].owner.login + "/" + repos[i].name;

  // create a link for each repo
  var repoEl = document.createElement("a");
  repoEl.classList = "list-item flex-row justify-space-between align-center";
  repoEl.setAttribute('href','/single-repo.html?repo='+repoName)

  // create a span element to hold repository name
  var titleEl = document.createElement("span");
  titleEl.textContent = repoName;

  // append to container
  repoEl.appendChild(titleEl);

// create a status element
var statusEl = document.createElement("span");
statusEl.classList = "flex-row align-center";

// check if current repo has issues or not
if (repos[i].open_issues_count > 0) {
  statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}

// append to container
repoEl.appendChild(statusEl);


  // append container to the dom
  repoContainerEl.appendChild(repoEl);
}
    
}





var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a get request to url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
  }
  
  
 userFormEl.addEventListener('submit',formSubmitHandler)
  




