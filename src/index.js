document.addEventListener('DOMContentLoaded', () => {
fetchDogs();
})

// fetch all dogs from the dog show in the content loader



function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(json => renderAllDogs(json));
}

function renderAllDogs(dogs){
    dogs.forEach((dog) => {
        renderSingleDog(dog);
    });
}


function renderSingleDog(dog){
    
//    let name = `${dog.name}`;
    let tableContainer = document.querySelector('#table-body')  
    
 tableContainer.innerHTML += `<tr><td>${dog.name}</td> <td>*${dog.breed}*</td> <td>${dog.sex}</td> <td><button>Edit</button></td></tr>`

  

}


document.querySelectorAll()