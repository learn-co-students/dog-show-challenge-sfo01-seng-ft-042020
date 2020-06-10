// document.addEventListener('DOMContentLoaded', () => {
//     fetchDogs();

// })

dogArray = []

fetch("http://localhost:3000/dogs")
.then(resObj => resObj.json())
.then(dogs => { 
    dogs.forEach((dog) => {
        dogArray.push(dog)
       const table = document.getElementById("table-body")
       
       
       table.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id="${dog.id}">Edit</button></td></tr>`
    })
});


const table = document.getElementById("table-body")

table.addEventListener('click', (e) => {
    
    if (e.target.tagName === 'BUTTON'){
        const clickedDog = dogArray.find(dog => {return dog.id === parseInt(e.target.id)})
        const form = document.getElementById('dog-form')
         form.dogid.value = clickedDog.id
         form.name.value = clickedDog.name
         form.breed.value = clickedDog.breed
         form.sex.value = clickedDog.sex
    }
  
})



const form = document.getElementById('dog-form')

form.addEventListener('submit', (e) => {
    
    
    e.preventDefault()
 


        fetch(`http://localhost:3000/dogs/${form.dogid.value}`, { 
  
            method: "PATCH",
            
            body: JSON.stringify({
                
                'name': form.name.value,
                'breed': form.breed.value,
                'sex': form.sex.value
            }),
            headers: {
                "Content-type": "application/json"
            },
          
        })
        
       
        
    
})








