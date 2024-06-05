var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);
const url = "http://127.0.0.1:8080/user/0"

//FAZ UM GET AO CARREGAR A PÁGINA
const userAction = async () => {
    try {
        const response = await fetch(url)
        const myjson = await response.json()

        let tasks = myjson.todo_list

        console.log(tasks)

         appendJson(tasks)
    } catch (error) {
        window.alert(`${error}: NÃO FOI POSSIVEL CARREGAR A PÁGINA!`)
    }
}

/* ADICIONA O CONTEUDO DO GET DENTRO DA TABELA */
function appendJson(t){
    t.forEach(e => {
        let tbodyref = document.getElementById('table-main').getElementsByTagName('tbody')[0];
        let newrow = tbodyref.insertRow()
        let title = newrow.insertCell()
        let description = newrow.insertCell()
        let date = newrow.insertCell()
        let edit = newrow.insertCell()


        title.innerHTML = e.title
        description.innerHTML = e.description
        date.innerHTML = e.date_date
        edit.innerHTML = `<i class="fa-solid fa-pen"></i>`
    });
}

//Clicar no edit e aparecer o evento
document.addEventListener("click",function(){
    var items = document.querySelectorAll("td:last-child");
    items.forEach(function(elem)
    {
    	elem.addEventListener("click", function(){
      	
      	showModalEdit('modal1', 'rotate', this);
      });
      
    });
});


function showModalEdit(id, anim, cell) {

	// new stuff -- added 'cell' parameter
  var cell1 = cell.parentElement.cells[0].innerHTML;
  var cell2 = cell.parentElement.cells[1].innerHTML;
  var cell3 = cell.parentElement.cells[2].innerHTML;
  document.getElementById('modalname').innerHTML = cell1;
  document.getElementById('modaldate').innerHTML = cell2;
  document.getElementById('modalamt').innerHTML = cell3;

  var container = document.getElementById(id);
  var box = container.querySelector('.modalWindow');

  // inital value
  box.style.transition = 'none';
  if (anim == 'rotate')
    box.style.transform = 'rotateY(-70deg)';
  else
    box.style.transform = 'scale(0,0)';

  var ok = box.querySelector('.ok');

  ok.addEventListener('click', ()=>{
    makePutRequest(cell1)
  })

  requestAnimationFrame(function() {

    box.style.transition = 'all 0.5s ease';

    if (anim == 'rotate')
      box.style.transform = 'rotateY(0deg)';
    else
      box.style.transform = 'scale(1,1)';
  });

  container.style.pointerEvents = 'auto';
  container.style.opacity = 1;
}

function hideModal() {
  var container = document.querySelector('.modalWindow_container');
  container.style.opacity = 0;
  container.style.pointerEvents = 'none';
}

async function makePutRequest(titleTrue){
  const title = document.getElementById('modalname').innerHTML
  const description = document.getElementById('modaldate').innerHTML
  const date = document.getElementById('modalamt').innerHTML

  console.log(title,description,date)
  
  const body = {
    "title": title,
    "description": description,
    "date_date": date,
    "date_time": '00:00:00',
    "status": 'Todo'
  }
  console.log(body)
   const response = await fetch(`http://127.0.0.1:8080/user/0/${titleTrue}`,{
    method:'PUT',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
   })

   hideModal()

   const resData = await response.json()

   location.reload()
}

document.addEventListener("DOMContentLoaded", function(){
  const remove = document.getElementById("remove")
  console.log(remove)
  remove.addEventListener("click",function(){
    delRequest()
  })
})


async function delRequest(){
  let remover = prompt("Digite o nome do evento que sera excluido")
  const response = await fetch(`http://127.0.0.1:8080/user/0/${remover}`,{
    method:'DELETE',
    headers:{
      'Content-type': 'application/json'
    },
   })

   hideModal()

   location.reload()
}


document.addEventListener("DOMContentLoaded", function(){
  const remove = document.getElementById("add")
  console.log(remove)
  remove.addEventListener("click",function(){
    addRequest()
  })
})


async function addRequest(){
  let title = prompt("Digite o nome do evento")
  let description = prompt("Descrição do evento")
  let date = prompt("Digite a data")

  console.log(title,description,date)

  const body = {
    "title": title,
    "description": description,
    "date_date": date,
    "date_time": '00:00:00',
    "status": 'Todo'
  }

  const response = await fetch(`http://127.0.0.1:8080/user/0`,{
    method:'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
   })

   hideModal()

   location.reload()
}