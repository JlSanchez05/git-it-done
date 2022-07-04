let userFormEl = document.querySelector('#user-form')
let nameInputEl = document.querySelector('#username')

let repoContainerEl =  document.querySelector("#repos-container");

let repoSearchTerm = document.querySelector("#repo-search-term")







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
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm
    
    
}





var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data,user);
      });
    });
  };
  
 userFormEl.addEventListener('submit',formSubmitHandler)
  




