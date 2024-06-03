const userAction = async () => {
    const response = await fetch('http://127.0.0.1:8080/user/0')
    const myjson = await response.json()

    let tasks = myjson.todo_list

    appendJson(tasks)
}

function appendJson(t){
    t.forEach(e => {
        document.getElementById("principal").innerHTML += `
        <div class="menu-principal"><p class="grid-item"> ${e.title} </p> <p class="grid-item"> ${e.description} </p> <p class="grid-item"> ${e.date_date} </p> <p class="grid-item"> ${e.status} </p> </div>
    `
    });
}


