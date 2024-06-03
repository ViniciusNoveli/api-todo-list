import datetime
from typing import List, Annotated
from fastapi import FastAPI, status, HTTPException, Query
from pydantic import BaseModel, EmailStr, SecretStr
from fastapi.middleware.cors import CORSMiddleware


id = 2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Register(BaseModel):
    username: str
    password: str
    email: EmailStr

class Todo(BaseModel):
    title: str
    description: str | None = None
    date_date: datetime.date
    date_time: datetime.time
    status: Annotated[str, Query(pattern="Done|Todo")]

class User(BaseModel):
    user_data: Register
    todo_list: List[Todo] = []

loaded = [
    {'username':'Vinicius', 'password':'abc', 'email':'askdad@gmail.com',
     'todo_list': [{'title':'pagamento',
                    'description':'pagar contas',
                    'date_date': datetime.date(2024,10,22),
                    'date_time': datetime.time(10,30),
                    'status': 'todo'
        },{'title': 'casamento',
                    'description': 'casar',
                    'date_date': datetime.date(2024, 11, 12),
                    'date_time': datetime.time(17, 30),
                    'status': 'todo'
                    }
        ]
     },
    {'username':'Lucas', 'password':'cde', 'email':'pindamonhangaba@gmail.com',
     'todo_list': [{'title':'jogar lol',
                    'description':'pegar diamante',
                    'date_date': datetime.date(2025,1,20),
                    'date_time': datetime.time(5,40),
                    'status': 'todo'
        }]}
]

@app.get("/")
def home():
    return "Api no ar"

#Retorna usuario sem exibir a senha e todas suas tasks
@app.get("/user/{userId}")
def getUserById(userId: int):
    newdict = dict(loaded[userId])
    del newdict['password']
    return newdict

#Retorna task de um User usando o title da task
@app.get("/user/{userId}/{taskName}")
def getTaskByName(userId: int, taskName: str):
    newdict = dict(loaded[userId])
    task = newdict['todo_list']
    if len(task) == 0:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='you dont have any tasks')
    else:
        for k in task:
            if k['title'] == taskName:
                return k
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='You dont have any task with this name')

#cria tarefa
@app.post("/user/{userId}")
def insertTaskOnList(userId: int, taskPosted: Todo):
    newdict = dict(loaded[userId])
    task = newdict['todo_list']
    task.append(dict(taskPosted))
    return task

@app.delete("/user/{userId}/{taskName}")
def deleteTaskByName(userId: int, taskName: str):
    newdict = dict(loaded[userId])
    task = newdict['todo_list']
    if len(task) == 0:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='you dont have any tasks')
    else:
        aux = 0
        for k in task:
            if k['title'] == taskName:
                del loaded[userId]['todo_list'][aux]
                return task
            aux = aux + 1
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='You dont have tasks with this name')

@app.put("/user/{userId}/{taskName}")
def updateByTaskName(userId: int, taskName: str, taskUpdated: Todo):
    newdict = dict(loaded[userId])
    task = newdict['todo_list']
    if len(task) == 0:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='you dont have any tasks')
    else:
        aux = 0
        for k in task:
            if k['title'] == taskName:
                loaded[userId]['todo_list'][aux] = dict(taskUpdated)
                return task
            aux = aux + 1
    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='You dont have tasks with this name')

