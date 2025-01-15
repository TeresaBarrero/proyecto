
const li = document.querySelectorAll('.Menu-li')
const block = document.querySelectorAll('.Block')
const home = document.querySelector('main')
const chat = document.querySelector('.Block-chat')
const liChat = document.querySelector('.Menu-li--chat')
const successButton = document.querySelector('.Form-button')
//Objeto de project
const project = {
    projectName: document.getElementById('project-name'),
    client: document.getElementById('client'),
    startDate: document.getElementById('start-date'),
    endDate: document.getElementById('end-date'),
    description: document.getElementById('description'),
    statusProjects: document.getElementById('status'),
    priority: document.getElementById('priority'),
    budget: document.getElementById('budget'),
    resources: document.getElementById('resources'),
    expenses: document.getElementById('expenses'),
    information: document.getElementById('information'),
    labelProject: document.getElementById('label-project')
}
 // Creo el objeto con los datos del formulario
function submitForm() {
    if (!project.projectName.value && !project.client.value && !project.startDate.value && !project.endDate.value && !project.description.value && !project.statusProjects.value && !project.priority.value && !project.budget.value && !project.resources.value && !project.expenses.value && !project.information.value && !project.labelProject.value) {
        return alert("Completa todos los campos")
    }
    //Me traigo la data del localStorage y le añado el objeto que se crea en el
    const data = JSON.parse(localStorage.getItem('projectJSON'))
    data.push({
        _id: crypto.randomUUID(),
        projectName: project.projectName.value,
        client: project.client.value,
        startDate: project.startDate.value,
        endDate: project.endDate.value,
        description: project.description.value,
        statusProjects: project.statusProjects.value,
        priority: project.priority.value,
        budget: project.budget.value,
        resources: project.resources.value,
        expenses: project.expenses.value,
        information: project.information.value,
        labelProject: project.labelProject.value
    })
    //Guardo la información completa con el nuevo objeto en el localStorage
    localStorage.setItem('projectJSON', JSON.stringify(data))
    window.location.href= '../projects-html'
}
successButton.addEventListener('click' ,()=>{
    submitForm()
} )
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
 




