
const li = document.querySelectorAll('.Menu-li');
const block = document.querySelectorAll('.Block');
const home = document.querySelector('main');
const chat = document.querySelector('.Block-chat');
const liChat = document.querySelector('.Menu-li--chat');
const successButton = document.querySelector('.Form-button');
const specifyProject = getProject(localStorage.getItem('idProject'));
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
};

function getProject(id) {
    const data = JSON.parse(localStorage.getItem('projectJSON'));
    return data.find((project) => project._id === id);
}

function submitForm() {
    if (!project.projectName.value && !project.client.value && !project.startDate.value && !project.endDate.value && !project.description.value && !project.statusProjects.value && !project.priority.value && !project.budget.value && !project.resources.value && !project.expenses.value && !project.information.value && !project.labelProject.value) {
        return alert("Completa todos los campos");
    }

    const data = JSON.parse(localStorage.getItem('projectJSON'));
    const projectToUpdate = data.find((project) => project._id === specifyProject._id);

    if (projectToUpdate) {
        projectToUpdate.projectName = project.projectName.value;
        projectToUpdate.client = project.client.value;
        projectToUpdate.startDate = project.startDate.value;
        projectToUpdate.endDate = project.endDate.value;
        projectToUpdate.description = project.description.value;
        projectToUpdate.statusProjects = project.statusProjects.value;
        projectToUpdate.priority = project.priority.value;
        projectToUpdate.budget = project.budget.value;
        projectToUpdate.resources = project.resources.value;
        projectToUpdate.expenses = project.expenses.value;
        projectToUpdate.information = project.information.value;
        projectToUpdate.labelProject = project.labelProject.value;
        localStorage.setItem('projectJSON', JSON.stringify(data));
        alert('Proyecto actualizado exitosamente');
        window.location.href = 'projects.html'
    } else {
        alert('No se pudo encontrar el proyecto para actualizar.');
    }
}

successButton.addEventListener('click', () => {
    submitForm();
});

document.addEventListener('DOMContentLoaded', () => {
    if (specifyProject) {
        project.projectName.value = specifyProject.proyectName;
        project.client.value = specifyProject.client;
        project.startDate.value = specifyProject.startDate;
        project.endDate.value = specifyProject.endDate;
        project.description.value = specifyProject.description;
        project.statusProjects.value = specifyProject.statusProjects;
        project.priority.value = specifyProject.priority;
        project.budget.value = specifyProject.budget;
        project.resources.value = specifyProject.resources;
        project.expenses.value = specifyProject.expenses;
        project.information.value = specifyProject.information;
        project.labelProject.value = specifyProject.labelProject;
    } else {
        alert('No se encontró el proyecto en el almacenamiento local.');
    }
});
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




