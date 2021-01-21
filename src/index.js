document.addEventListener('DOMContentLoaded', () => {
   fetchAllDogs() 
})

let form = document.querySelector('#dog-form')
form.addEventListener('submit', (e) => handleSubmit(e))

//fetch data
function fetchAllDogs() {
    fetch(`http://localhost:3000/dogs`)
    .then(res => res.json())
    // .then(console.log)
    .then(dogs => dogs.forEach(dog => buildDogs(dog)))
}




//DOM
function buildDogs(dog) {
    console.log(dog)
    let tableBody = document.querySelector('#table-body')
    let tableRow = document.createElement('tr')
    let name = document.createElement('td')
    let breed = document.createElement('td')
    let sex = document.createElement('td')
    let btn = document.createElement('button')

    name.textContent = dog.name
    breed.textContent = dog.breed
    sex.textContent = dog.sex
    btn.textContent = 'Edit Dog'

    
    tableRow.append(name, breed, sex, btn)
    tableBody.appendChild(tableRow)

    btn.addEventListener('click', () => populateForm(dog))
}

function populateForm(dog) {
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.dataset.id = dog.id
}

//Handlers
function handleSubmit(e) {
    e.preventDefault()
    let id = e.target.dataset.id
    let tableBody = document.getElementById('table-body')
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        })
    })
    .then(res => res.json())
    .then(() => {
        tableBody.textContent = ""
        fetchAllDogs()
    })
}

