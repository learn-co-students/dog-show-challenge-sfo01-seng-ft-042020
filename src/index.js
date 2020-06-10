const ROOT_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
  init();
})


function init() {
  getDogs();
}

const getDogs = () => {
  console.log("I WAS CALLED")
  fetch(ROOT_URL)
  .then(res=>res.json())
  .then(obj => renderDogs(obj));
}

const renderDogs = (dogs) => {
  document.querySelector('#table-body').innerHTML = ""
  dogs.forEach(dog => {
    createDogRow(dog);
  })
}

const createDogRow = (dog) => {
  const table = document.querySelector('#table-body');
  const tableRow = document.createElement('tr');
  tableRow.setAttribute("dog-id", dog.id);
  const dogName = document.createElement('td');
  dogName.innerText = dog.name;
  const dogBreed = document.createElement('td')
  dogBreed.innerText = dog.breed;
  const dogSex = document.createElement('td');
  dogSex.innerText = dog.sex;
  const edit = document.createElement('button');
  edit.innerText = "edit";
  edit.dataset.id = dog.id
  edit.addEventListener('click', (e) => editDog(e, dog))
  tableRow.append(dogName, dogBreed, dogSex, edit);
  table.append(tableRow);
  
}

const editDog = (event, dog) => {
  // console.dir(event.target)
  populateForm(dog);
  // const dogId = event.target.dataset.id
  // console.log(dogId);
  
}

const populateForm = (dog) => {
  const form = document.querySelector('#dog-form');
  form.name.value = dog.name;
  form.breed.value = dog.breed;
  form.sex.value = dog.sex;
  form.dataset.id = dog.id;
  document.addEventListener('submit', (e) => {
    updateDog(e)
    .then(obj => updateRow(obj))
  })
}

function updateDog(e) {
  e.preventDefault();
  const dogId = e.target.dataset.id;
  const dogFields = {
    name: e.target.name.value,
    breed: e.target.breed.value,
    sex: e.target.sex.value
  }
 
  return fetch(`${ROOT_URL}/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dogFields)
  }).then(res => res.json())
  // .catch(err => console.log(err))
  // console.dir(e.target);
  // console.log(e.target.name.value)
  // console.log(e.target.dataset.id)
}

function updateRow(dog) {
  const row = document.querySelector(`[dog-id="${dog.id}"]`);
  console.log(row);
  console.log(dog)
  row.children[0].innerText = dog.name;
  row.children[1].innerText = dog.breed;
  row.children[2].innerText = dog.sex;
  
}