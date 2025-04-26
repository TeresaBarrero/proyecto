(function () {
    const li = document.querySelectorAll('.Menu-li');
    const block = document.querySelectorAll('.Block');
    const home = document.querySelector('main');
    const btn = document.querySelector('.Btn-burguer');
    const btnNav = document.querySelector('.Btn-nav');
    const btnChat = document.querySelector('.Btn-chat')
    const chat = document.querySelector('.Block-chat');
    const responsiveChat = document.querySelector('.Block-chat--responsive');
    const liChat = document.querySelector('.Menu-li--chat');
    const successButton = document.querySelector('.Form-button');
    //Obtenemos el id alacenado en el localStorage para obtener la data de este
    const specifyProject = getProject(localStorage.getItem('idProject'));
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
    };
    const priorities = {
        low: document.querySelector('.Form-low'),
        medium: document.querySelector('.Form-medium'),
        high: document.querySelector('.Form-high'),
        critical: document.querySelector('.Form-critical')
    }
    const statusProjects = {
        planning: document.querySelector('.Form-planning'),
        progressing: document.querySelector('.Form-progressing'),
        complete: document.querySelector('.Form-complete'),
    }
    //Paso el id como parametro y con un .find traigo el objeto cuyo id pasado por parametro sea igual y devuelvo el objeto
    function getProject(id) {
        const data = JSON.parse(localStorage.getItem('projectJSON'));
        return data.find((project) => project._id === id);
    }
    //Una vez clicado el botón guardar, valido que ninguno de los campos obligatorios esté vacío
    function submitForm() {
        if (!project.projectName.value && !project.client.value && !project.startDate.value && !project.endDate.value && !project.description.value && !project.statusProjects.value && !project.priority.value && !project.budget.value && !project.resources.value && !project.expenses.value && !project.information.value && !project.labelProject.value) {
            return alert("Completa todos los campos");
        }
        //Obtengo el array de objetos completo
        const data = JSON.parse(localStorage.getItem('projectJSON'));
        //Encuentro mediante id el objeto que quiero
        const projectToUpdate = data.find((project) => project._id === specifyProject._id);
        //Actualizo la data del objeto
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
    //Añado la funcionalidad de submitForm al botón de guardado
    successButton.addEventListener('click', () => {
        submitForm();
    });
    //Actualizo la información en el diseño de la data obtenida mediante el id
    document.addEventListener('DOMContentLoaded', () => {
        if (specifyProject) {
            project.projectName.value = specifyProject.projectName;
            project.client.value = specifyProject.client;
            project.startDate.value = specifyProject.startDate;
            project.endDate.value = specifyProject.endDate;
            project.description.value = specifyProject.description;
            project.statusProjects.value = specifyProject.statusProjects;
            project.priority.value = specifyProject.priority;
            validateChecks(project.priority.value, project.statusProjects.value);
            project.budget.value = specifyProject.budget;
            project.resources.value = specifyProject.resources;
            project.expenses.value = specifyProject.expenses;
            project.information.value = specifyProject.information;
            project.labelProject.value = specifyProject.labelProject;

        } else {
            alert('No se encontró el proyecto en el almacenamiento local.');
        }
    });

    // Función para mostrar option selected 
    // si option tiene atributo 'selected'
    // STYLE padding 20px
    function validateChecks(priority, statusProject) {
        if (priority) {
            if (priority.toLowerCase() === 'low') {
                priorities.low.setAttribute('selected', true)
                requestAnimationFrame(() => {
                    priorities.low.style.padding = "20px"
                })
            }
            if (priority.toLowerCase() === 'medium') {
                priorities.medium.setAttribute('selected', true)
                requestAnimationFrame(() => {
                    priorities.medium.style.padding = "20px"
                })
            }
            if (priority.toLowerCase() === 'high') {
                priorities.high.setAttribute('selected', true)
                requestAnimationFrame(() => {
                    priorities.high.style.padding = "20px"
                })
            }
            if (priority.toLowerCase() === 'critical') {
                priorities.critical.setAttribute('selected', true)
                requestAnimationFrame(() => {
                    priorities.critical.style.padding = "20px"
                })
            }
        }
        if (statusProject) {
            if (statusProject.toLowerCase() === 'planning') {
                statusProjects.planning.setAttribute('selected', true)
                requestAnimationFrame(() => {
                    statusProjects.planning.style.padding = '20px'
                })
            }
            if (statusProject.toLowerCase() === 'progressing') {
                statusProjects.progressing.setAttribute('selected', true)
                requestAnimationFrame(() => {
                    statusProjects.progressing.style.padding = '20px'
                })
            }
            if (statusProject.toLowerCase() === 'complete') {
                statusProjects.complete.setAttribute('selected', true)
                requestAnimationFrame(() => {
                    statusProjects.complete.style.padding = '20px'
                })
            }
        }
    }





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
                requestAnimationFrame(() => {
                    li.forEach((_, i) => {
                        li[i].classList.remove('isActive')
                        block[i].classList.remove('isActive')
                    })
                    if (!li[i].classList.contains('Menu-li--wrapper')) {
                        li[i].classList.add('isActive')
                    }
                    block[i].classList.add('isActive')
                })
            })
        }
        else {
            li[i].addEventListener('click', () => {
                requestAnimationFrame(() => {
                    //liChat.classList.toggle('isActive')
                    chat.classList.toggle('isActive')
                    li.forEach((_, i) => {
                        if (!li[i].classList.contains('Menu-li--chat') && !li[i].classList.contains('Block-chat')) {
                            li[i].classList.remove('isActive')
                            block[i].classList.remove('isActive')
                        }
                    })
                })
            })
        }
    })


    // Cuando CLICK en .Btn-burguer
    // Btn-nav TOGGLE isActive
    btn.addEventListener('click', () => {
        requestAnimationFrame(() => {
            btnNav.classList.toggle('isActive')
        })
    })


    // Cuando CLICK en .Btn-chat
    // Block-chat le TOGGLE 'isActive'
    btnChat.addEventListener('click', () => {
        requestAnimationFrame(() => {
            chat.classList.toggle('isActive')
            console.log(btnChat)
        })
    })
    btnChat.addEventListener('click', () => {
        requestAnimationFrame(() => {
            responsiveChat.classList.toggle('isActive')
            console.log(btnChat)
        })
    })


    // Cuando MOUSEOVER home
    // Si NO contains class 'Block-chat'
    // TODOS .Block[i] REMOVE isActive
    // TODOS li REMOVE is Active

    if (home != null) {
        home.addEventListener('mouseover', () => {
            requestAnimationFrame(() => {
                block.forEach((_, i) => {
                    if (!block[i].classList.contains('Block-chat') && !block[i].classList.contains('Block-chat--responsive')) {
                        block[i].classList.remove('isActive')
                        if (li[i] != undefined) {
                            li[i].classList.remove('isActive')
                        }
                    }
                })
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

            requestAnimationFrame(() => {
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
            })
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


    // Función realizada con ayuda de ChatGpt y de documentación oficial (MDN y W3S)


    // Declaro variables de Chat
    // Cuando CLICK en sendButton
    // envía un mensaje
    // Cuando CLICK en una tecla en messageImput
    // Si es 'Enter' se envía el mensaje

    //Al send mensaje
    // Si es distinto que "", pasa a otra función
    // Si en setTimeout NO REPLY,  
    // Devuelve un mensaje (por defecto) y recibo addMensage '¡Hola! ¿Cómo puedo ayudarte?'


    // La función addMensaje crea un nuevo elemento 'messageElement'
    // Añado la clase 'message' y el valor 'sender'
    // El texto de messageElement tiene el valor de 'text'
    // Se añade messageElement como hijo de 'chatMessages'


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

        requestAnimationFrame(() => {
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
    }


})();

