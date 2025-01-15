
const li = document.querySelectorAll('.Menu-li')
const block = document.querySelectorAll('.Block')
const home = document.querySelector('main')
const chat = document.querySelector('.Block-chat')
const liChat = document.querySelector('.Menu-li--chat')
const alertButton = document.querySelector('.Home-button')
const tasksImportant = document.querySelector('.Tasks-dl--important')
const clientsButton = document.querySelector('.Home-client')
const listClients = document.querySelector('.Clients-ul')
const arrow = document.querySelector('.Clients-arrow')
const clients = document.querySelector('.Clients')
const management = document.querySelector('.Management-link')
const homeManagement = document.querySelector('.Home-management--projects')
let tasksDaily = document.querySelector('.Tasks-dl-daily')
let tasksMonthPending = document.querySelector('.Tasks-dl-pending')
let taskCompleted = document.querySelector('.Tasks-dl--ok')
let moment = new Date()
let tasks = getTask()
//De las tasks, filtro por aquellas que coincidan con el día actual y que no estén completas
const dailyTasks = tasks.filter((task) => {
    return task.date === `${moment.getFullYear()}-${String(moment.getMonth() + 1).padStart(2, '0')}-${String(moment.getDate()).padStart(2, '0')}`
        && task.completed === false && task.important === false
})
//De las tasks, filtro por aquellas que coincidan con el mes actual pero que no coincida con el día actual y que no estén completas
const MonthTasks = tasks.filter((task) => {
    return task.date >= `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01` &&
        task.date <= `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}` &&
        task.date !== `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
        && task.completed === false
        && task.important === false;
});
//De las tasks, filtro por aquellos que tengan la propiedad completed como true
const completeTasks = tasks.filter((task) => { return task.completed === true });
//De las tasks, filtro por aquellas que tengan la propiedad important como true pero que no estén completas
const importantTasks = tasks.filter((task) => { return task.important === true && task.completed === false });
let statusArrow = 0
//Obtengo las tareas almacenadas en el localStorage
function getTask() {
    if (!localStorage.getItem('taskJSON')) {
        localStorage.setItem('taskJSON', '[]')
    }
    return JSON.parse(localStorage.getItem('taskJSON'))
}//Renderizamos en un bucle las tareas que correspondan en el día de hoy
function getDailyTask() {
    const dailycompletedSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="daily-Tasks-svg-ok"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>`
    const dailyimportantSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="daily-Tasks-important-svg" viewBox="0 0 16 16">
                        <path
                            d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>`
    const dailydeleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="daily-Tasks-delete-svg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>`
    const completedSvgElement = new DOMParser().parseFromString(dailycompletedSvgCode, 'image/svg+xml').documentElement
    const importantSvgElement = new DOMParser().parseFromString(dailyimportantSvgCode, 'image/svg+xml').documentElement
    const deleteSvgElement = new DOMParser().parseFromString(dailydeleteSvgCode, 'image/svg+xml').documentElement

    dailyTasks.forEach((task => {
        const listTask = document.createElement('dd')
        listTask.textContent = task.desc
        listTask.classList.add('Tasks-dd')
        tasksDaily.appendChild(listTask)
        const completedSvgClone = completedSvgElement.cloneNode(true);
        completedSvgClone.setAttribute('data-id', task._id); 
        const deleteSvgClone = deleteSvgElement.cloneNode(true);
        deleteSvgClone.setAttribute('data-id', task._id);
        const importantSvgClone = importantSvgElement.cloneNode(true);
        importantSvgClone.setAttribute('data-id',task._id);
        listTask.appendChild(completedSvgClone);
        listTask.appendChild(deleteSvgClone);
        listTask.appendChild(importantSvgClone);
        
        completedSvgClone.addEventListener('click', function() {
            completeTask(task._id); 
        });
        deleteSvgClone.addEventListener('click', function() {
            deleteTask(task._id); 
        });
        importantSvgClone.addEventListener('click', function() {
            importantTask(task._id); 
        });
    }))
}
//Renderizamos las tareas que correspondan con el mes actual pero no con el día de hoy
function getMonthTask() {
    const monthcompletedSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="month-Tasks-svg-ok"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>`
    const monthimportantSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="month-Tasks-important-svg" viewBox="0 0 16 16">
                        <path
                            d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>`
    const monthdeleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="month-Tasks-delete-svg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>`
    const completedSvgElement = new DOMParser().parseFromString(monthcompletedSvgCode, 'image/svg+xml').documentElement
    const importantSvgElement = new DOMParser().parseFromString(monthimportantSvgCode, 'image/svg+xml').documentElement
    const deleteSvgElement = new DOMParser().parseFromString(monthdeleteSvgCode, 'image/svg+xml').documentElement

    MonthTasks.forEach((task => {
        const listTask = document.createElement('dd')
        listTask.textContent = task.desc
        listTask.classList.add('Tasks-dd')
        tasksMonthPending.appendChild(listTask)
        const completedSvgClone = completedSvgElement.cloneNode(true);
        completedSvgClone.setAttribute('data-id', task._id); 
        const deleteSvgClone = deleteSvgElement.cloneNode(true);
        deleteSvgClone.setAttribute('data-id', task._id);
        const importantSvgClone = importantSvgElement.cloneNode(true);
        importantSvgClone.setAttribute('data-id',task._id);
        listTask.appendChild(completedSvgClone);
        listTask.appendChild(deleteSvgClone);
        listTask.appendChild(importantSvgClone);
        
        completedSvgClone.addEventListener('click', function() {
            completeTask(task._id); 
        });
        deleteSvgClone.addEventListener('click', function() {
            deleteTask(task._id); 
        });
        importantSvgClone.addEventListener('click', function() {
            importantTask(task._id); 
        });
    }))
}
//Renderizamos las tareas completas de la lista
function getCompleteTask() {
    completeTasks.forEach((task => {
        const listTask = document.createElement('dd')
        listTask.textContent = task.desc
        listTask.classList.add('Tasks-dd')
        listTask.classList.add('Tasks-dd--ok')
        taskCompleted.appendChild(listTask)
    }))
}
//Renderizamos las tareas importantes de la lista
function getImportantTask() {
    const importantcompletedSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="important-Tasks-svg-ok"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>`
    const importantdeleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="important-Tasks-delete-svg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>`
    const completedSvgElement = new DOMParser().parseFromString(importantcompletedSvgCode, 'image/svg+xml').documentElement
    const deleteSvgElement = new DOMParser().parseFromString(importantdeleteSvgCode, 'image/svg+xml').documentElement


    importantTasks.forEach((task => {
        const listTask = document.createElement('dd')
        listTask.textContent = task.desc
        listTask.classList.add('Tasks-dd')
        listTask.classList.add('Tasks-dd--important')
        tasksImportant.appendChild(listTask)
        
        const completedSvgClone = completedSvgElement.cloneNode(true);
        completedSvgClone.setAttribute('data-id', task._id); 
        const deleteSvgClone = deleteSvgElement.cloneNode(true);
        deleteSvgClone.setAttribute('data-id', task._id);

        
        listTask.appendChild(completedSvgClone);
        listTask.appendChild(deleteSvgClone);

        
        completedSvgClone.addEventListener('click', function() {
            completeTask(task._id); 
        });

        deleteSvgClone.addEventListener('click', function() {
            deleteTask(task._id); 
        });
    }))
}
//Le paso el id de la task para encontrarla en el array de objetos task y le cambio la propiedad a completed true
function completeTask(id) {
    let result = tasks.find((task) => task._id === id)
    result.completed = true;
    localStorage.setItem('taskJSON',JSON.stringify(tasks))
    window.location.reload();
}
//Le paso el id de la task para encontrarla en el array de objetos task y eliminarla
function deleteTask(id){
    let result = tasks.findIndex((task) => task._id === id)
    tasks.splice(result,1)
    localStorage.setItem('taskJSON',JSON.stringify(tasks))
    window.location.reload();
}
//Le paso el id de la task para encontrarla en el array de objetos task y le cambio la propiedad a important true
function importantTask(id) {
    let result = tasks.find((task) => task._id === id)
    result.important = true;
    localStorage.setItem('taskJSON',JSON.stringify(tasks))
    window.location.reload();
}
getDailyTask()
getMonthTask()
getCompleteTask()
getImportantTask()
// Recorre TODOS elementos li
// Si NO contains class 'Menu-li--Chat'
// Cuando MOUSEOVER en li 
// TODOS .Menu-li REMOVE isActive
// TODOS .Block REMOVE is Active
// .Menu-li [POSICION] ADD isActive
// .Block [POSICION] ADD isActive

// SI contains class 'Menu-li--Chat'
// Cuando CLICK en liChat
// chat TOGGLE 'isActive'
// Recorre TODOS li 
// Si NO contains class 'Menu-li--Chat' o 'Block-Chat'
// TODOS li REMOVE isActive

// SI NO contains class 'Menu-li--wrapper`
// TODOS li[i] ADD 'isActive'

li.forEach((_, i) => {
    if (!li[i].classList.contains('Menu-li--chat')) {
        li[i].addEventListener('mouseover', () => {
            li.forEach((_, i) => {
                li[i].classList.remove('isActive')
                block[i].classList.remove('isActive')
            })
            if (!li[i].classList.contains('Menu-li--wrapper')) {
                li[i].classList.add('isActive')
            }
            block[i].classList.add('isActive')
        })
    }
    else {
        li[i].addEventListener('click', () => {
            //liChat.classList.toggle('isActive')
            chat.classList.toggle('isActive')
            li.forEach((_, i) => {
                if (!li[i].classList.contains('Menu-li--chat' || 'Block-chat')) {
                    li[i].classList.remove('isActive')
                    block[i].classList.remove('isActive')
                }
            })

        })
    }
})


// Cuando MOUSEOVER home
// Si NO contains class 'Block-chat'
// TODOS .Block[i] REMOVE isActive
// TODOS li REMOVE is Active

if (home != null) {
    home.addEventListener('mouseover', () => {
        block.forEach((_, i) => {
            if (!block[i].classList.contains('Block-chat')) {
                block[i].classList.remove('isActive')
                li[i].classList.remove('isActive')
            }
        })
    })
}



// Cuando CLICK en .Home-button
// tasksImportant TOGGLE isActive

if (alertButton != null) {
    alertButton.addEventListener('click', () => {
        tasksImportant.classList.toggle('isActive')

        console.log(alertButton)
    })
}

// Cuando CLICK en .Home-client
// listClients TOBBLE isActive
if (clientsButton != null) {

    clientsButton.addEventListener('click', () => {
        listClients.classList.toggle('isActive')
    })
}


// Cuando CLICK en .Clients
// arrow le STYLE transform rotate (90deg)
if (clients != null) {

    clients.addEventListener('click', () => {
        if (statusArrow === 0) {
            arrow.style.transform = 'rotate(90deg)'
            statusArrow = 1
        }
        else {
            arrow.style.transform = 'rotate(0deg)'
            statusArrow = 0
        }
        console.log(arrow)
    })
}

// Cuando CLICK en .Management-link
// homeManagement TOGGLE isActive
if (management != null) {

    management.addEventListener('click', () => {
        homeManagement.classList.toggle('isActive')
        console.log(management)
    })
}



// Calendar recurso aportado parte por ChatGpt

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.init();
    }

    init() {
        this.renderHeader();
        this.generateDays();
        document.getElementById("prevMonth").addEventListener("click", () => this.prevMonth());
        document.getElementById("nextMonth").addEventListener("click", () => this.nextMonth());
    }

    renderHeader() {
        const monthYear = document.getElementById("monthYear");
        const options = { month: "long", year: "numeric" };
        monthYear.textContent = this.currentDate.toLocaleDateString("es-ES", options);
    }

    generateDays() {
        const calendarGrid = document.getElementById("calendarGrid");
        calendarGrid.innerHTML = "";

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);

            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");

            const dayNumber = document.createElement("div");
            dayNumber.classList.add("calendar-day-number");
            dayNumber.textContent = day;

            dayElement.appendChild(dayNumber);
            calendarGrid.appendChild(dayElement);
        }
    }

    prevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderHeader();
        this.generateDays();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderHeader();
        this.generateDays();
    }
}

new Calendar();





// Cuando hago scroll hacia abajo, 
// .Button-slide le ADD `isActive´
// .Button-slide isVisible a MITAD de la ventana

const buttonSlide = document.querySelector('.Home-slide');

window.addEventListener('scroll', () => {

    let { scrollY, innerHeight } = window
    let { offsetTop } = buttonSlide

    const puntoActivacion = scrollY >= offsetTop - innerHeight / 2

    if (puntoActivacion) {
        buttonSlide.classList.add('isVisible')
    }
    else {
        buttonSlide.classList.remove('isVisible')
    }
})


// Cuando CLICK en .Button-slide
// scrollY arriba

buttonSlide.addEventListener(`click`, () => {
    window.scrollTo({ top: 0, behavior: `smooth` })
})


// Cuando scrollY esté arriba
// .Button-Slide REMOVE `isVisible´

window.addEventListener(`scroll`, () => {

    let { scrollY, innerHeight } = window
    let { offsetTop } = buttonSlide

    const puntoActivacion = scrollY <= offsetTop

    if (puntoActivacion) {
        buttonSlide.classList.remove(`isVisible`)
    }
    else {
        buttonSlide.classList.add(`isVisible`)
    }
})


const chatMessages = document.getElementById('Chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = messageInput.value.trim();

  if (message !== '') {
    addMessage(message, 'user');

    setTimeout(() => {
       addMessage('¡Hola! ¿Cómo puedo ayudarte?', 'bot');
     }, 1000);

    messageInput.value = '';
     }
 }

function addMessage(text, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
     messageElement.textContent = text;

     chatMessages.appendChild(messageElement);

     chatMessages.scrollTop = chatMessages.scrollHeight;
}
 





