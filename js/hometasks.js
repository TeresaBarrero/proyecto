(function () {
    const li = document.querySelectorAll('.Menu-li')
    const block = document.querySelectorAll('.Block')
    const btn = document.querySelector('.Btn-burguer')
    const btnNav = document.querySelector('.Btn-nav')
    const home = document.querySelector('main')
    const btnChat = document.querySelector('.Btn-chat')
    const responsiveChat = document.querySelector('.Block-chat--responsive')

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



    // Declaro variables

    // En dailyTasks creo FILTER
    // Pido que me devuelva tasks que cumpla filtro
    // FILTER = coinciden con DÍA ACTUAL y NO COMPLETE

    // En MonthTasks creo FILTER
    // Pido que me devuelva tasks que cumpla filtros
    // FILTER = coinciden con mes actual pero NO DÍA ACTUAL y NO COMPLETE

    // En completeTasks creo FILTER
    // Pido que me duevuelva tasks que tengan propiedad COMPLETE = TRUE

    // En importantTasks creo FILTER
    // Pido que me devuelva tasks que tengan propiedad IMPORTANT = TRUE
    // y COMPLETE == FALSE

    // Defino FUNCTION getTasks
    // Obtengo tasks almacenadas en localStorage
    //Renderizamos en un bucle las tareas que correspondan en el día de hoy

    // Defino FUNCTION getMonthTasks
    //Renderizamos las tareas que correspondan con el mes actual pero no con el día de hoy

    // Defino FUNCTION getCompleteTasks
    //Renderizamos las tareas completas de la lista

    // Defino FUNCTION getImportantTasks
    //Renderizamos las tareas importantes de la lista

    // Defino FUNCTION getYearTasks 
    // Renderizamos las tareas que correspondan con el resto del año sin incluir el mes en curso 

    let tasksDaily = document.querySelector('.Tasks-dl--daily')
    let tasksMonthPending = document.querySelector('.Tasks-dl--pending')
    let tasksYear = document.querySelector('.Tasks-dl--year')
    let taskCompleted = document.querySelector('.Tasks-dl--ok')
    let moment = new Date()
    let tasks = getTask()
    const dailyTasks = tasks.filter((task) => {
        return task.date === `${moment.getFullYear()}-${String(moment.getMonth() + 1).padStart(2, '0')}-${String(moment.getDate()).padStart(2, '0')}`
            && task.completed === false && task.important === false
    })
    const monthTasks = tasks.filter((task) => {
        return task.date >= `${moment.getFullYear()}-${String(moment.getMonth() + 1).padStart(2, '0')}-01` &&
            task.date <= `${moment.getFullYear()}-${String(moment.getMonth() + 1).padStart(2, '0')}-${new Date(moment.getFullYear(), moment.getMonth() + 1, 0).getDate()}` &&
            task.date !== `${moment.getFullYear()}-${String(moment.getMonth() + 1).padStart(2, '0')}-${String(moment.getDate()).padStart(2, '0')}`
            && task.completed === false
            && task.important === false;
    });
    const yearTasks = tasks.filter((task) => {
        return task.date >= `${moment.getFullYear()}-01-01` &&
            task.date <= `${moment.getFullYear()}-12-31` &&
            !task.date.startsWith(`${moment.getFullYear()}-${String(moment.getMonth() + 1).padStart(2, '0')}`) &&
            task.completed === false &&
            task.important === false;
    });

    const completeTasks = tasks.filter((task) => { return task.completed === true });
    const importantTasks = tasks.filter((task) => { return task.important === true && task.completed === false });
    let statusArrow = 0
    function getTask() {
        if (!localStorage.getItem('taskJSON')) {
            localStorage.setItem('taskJSON', '[]')
        }
        return JSON.parse(localStorage.getItem('taskJSON'))
    }
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

        requestAnimationFrame(() => {
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
                importantSvgClone.setAttribute('data-id', task._id);
                listTask.appendChild(completedSvgClone);
                listTask.appendChild(deleteSvgClone);
                listTask.appendChild(importantSvgClone);

                completedSvgClone.addEventListener('click', function () {
                    completeTask(task._id);
                });
                deleteSvgClone.addEventListener('click', function () {
                    deleteTask(task._id);
                });
                importantSvgClone.addEventListener('click', function () {
                    importantTask(task._id);
                });
            }))
        })
    }
    function getMonthTask() {
        const monthCompletedSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="month-Tasks-svg-ok"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>`
        const monthImportantSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="month-Tasks-important-svg" viewBox="0 0 16 16">
                        <path
                            d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>`
        const monthDeleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="month-Tasks-delete-svg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>`
        const completedSvgElement = new DOMParser().parseFromString(monthCompletedSvgCode, 'image/svg+xml').documentElement
        const importantSvgElement = new DOMParser().parseFromString(monthImportantSvgCode, 'image/svg+xml').documentElement
        const deleteSvgElement = new DOMParser().parseFromString(monthDeleteSvgCode, 'image/svg+xml').documentElement

        monthTasks.forEach((task => {
            const listTask = document.createElement('dd')
            listTask.textContent = task.desc
            listTask.classList.add('Tasks-dd')
            tasksMonthPending.appendChild(listTask)
            const completedSvgClone = completedSvgElement.cloneNode(true);
            completedSvgClone.setAttribute('data-id', task._id);
            const deleteSvgClone = deleteSvgElement.cloneNode(true);
            deleteSvgClone.setAttribute('data-id', task._id);
            const importantSvgClone = importantSvgElement.cloneNode(true);
            importantSvgClone.setAttribute('data-id', task._id);
            listTask.appendChild(completedSvgClone);
            listTask.appendChild(deleteSvgClone);
            listTask.appendChild(importantSvgClone);

            completedSvgClone.addEventListener('click', function () {
                completeTask(task._id);
            });
            deleteSvgClone.addEventListener('click', function () {
                deleteTask(task._id);
            });
            importantSvgClone.addEventListener('click', function () {
                importantTask(task._id);
            });
        }))
    }
    function getYearTask() {
        const yearCompletedSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="year-Tasks-svg-ok"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>`;
        const yearImportantSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="year-Tasks-important-svg" viewBox="0 0 16 16">
                        <path
                            d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>`;
        const yearDeleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="year-Tasks-delete-svg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>`;
        const completedSvgElement = new DOMParser().parseFromString(yearCompletedSvgCode, 'image/svg+xml').documentElement;
        const importantSvgElement = new DOMParser().parseFromString(yearImportantSvgCode, 'image/svg+xml').documentElement;
        const deleteSvgElement = new DOMParser().parseFromString(yearDeleteSvgCode, 'image/svg+xml').documentElement;

        yearTasks.forEach((task) => {
            const listTask = document.createElement('dd');
            listTask.textContent = task.desc;
            listTask.classList.add('Tasks-dd');
            tasksYear.appendChild(listTask);

            const completedSvgClone = completedSvgElement.cloneNode(true);
            completedSvgClone.setAttribute('data-id', task._id);
            const deleteSvgClone = deleteSvgElement.cloneNode(true);
            deleteSvgClone.setAttribute('data-id', task._id);
            const importantSvgClone = importantSvgElement.cloneNode(true);
            importantSvgClone.setAttribute('data-id', task._id);

            listTask.appendChild(completedSvgClone);
            listTask.appendChild(deleteSvgClone);
            listTask.appendChild(importantSvgClone);

            completedSvgClone.addEventListener('click', function () {
                completeTask(task._id);
            });
            deleteSvgClone.addEventListener('click', function () {
                deleteTask(task._id);
            });
            importantSvgClone.addEventListener('click', function () {
                importantTask(task._id);
            });
        });
    }

    function getCompleteTask() {
        const completeDeleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="complete-Tasks-delete-svg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>`;
        const deleteSvgElement = new DOMParser().parseFromString(completeDeleteSvgCode, 'image/svg+xml').documentElement;

        completeTasks.forEach((task => {
            const listTask = document.createElement('dd');
            listTask.textContent = task.desc;
            listTask.classList.add('Tasks-dd');
            listTask.classList.add('Tasks-dd--ok');
            taskCompleted.appendChild(listTask);

            const deleteSvgClone = deleteSvgElement.cloneNode(true);
            deleteSvgClone.setAttribute('data-id', task._id);
            listTask.appendChild(deleteSvgClone);

            deleteSvgClone.addEventListener('click', function () {
                deleteTask(task._id);
            });
        }));
    }

    function getImportantTask() {
        const importantCompletedSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="important-Tasks-svg-ok"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                    </svg>`
        const importantDeleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="important-Tasks-delete-svg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>`
        const completedSvgElement = new DOMParser().parseFromString(importantCompletedSvgCode, 'image/svg+xml').documentElement
        const deleteSvgElement = new DOMParser().parseFromString(importantDeleteSvgCode, 'image/svg+xml').documentElement


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


            completedSvgClone.addEventListener('click', function () {
                completeTask(task._id);
            });

            deleteSvgClone.addEventListener('click', function () {
                deleteTask(task._id);
            });
        }))
    }
    //Le paso el id de la task para encontrarla en el array de objetos task y le cambio la propiedad a completed true
    function completeTask(id) {
        let result = tasks.find((task) => task._id === id)
        result.completed = true;
        localStorage.setItem('taskJSON', JSON.stringify(tasks))
        window.location.reload();
    }
    //Le paso el id de la task para encontrarla en el array de objetos task y eliminarla
    function deleteTask(id) {
        let result = tasks.findIndex((task) => task._id === id)
        tasks.splice(result, 1)
        localStorage.setItem('taskJSON', JSON.stringify(tasks))
        window.location.reload();
    }
    //Le paso el id de la task para encontrarla en el array de objetos task y le cambio la propiedad a important true
    function importantTask(id) {
        let result = tasks.find((task) => task._id === id)
        result.important = true;
        localStorage.setItem('taskJSON', JSON.stringify(tasks))
        window.location.reload();
    }
    getDailyTask()
    getMonthTask()
    getYearTask()
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
                    if (!block[i].classList.contains('Block-chat' || 'Block-chat--responsive')) {
                        block[i].classList.remove('isActive')
                        if (li[i] != undefined) {
                            li[i].classList.remove('isActive')
                        }
                    }
                })
            })
        })
    }



    // Cuando CLICK en .Home-button
    // tasksImportant TOGGLE isActive

    if (alertButton != null) {
        alertButton.addEventListener('click', () => {
            requestAnimationFrame(() => {
                tasksImportant.classList.toggle('isActive')
                console.log(alertButton)
            })
        })
    }


    // Calendar 

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




    // Cuando hago scroll hacia abajo, 
    // .Button-slide le ADD `isInvisible
    // .Button-slide isInvisible a MITAD de la ventana

    const buttonSlide = document.querySelector('.Home-slide');

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            let { scrollY, innerHeight } = window
            let { offsetTop } = buttonSlide

            const puntoActivacion = scrollY >= offsetTop - innerHeight / 2

            if (puntoActivacion) {
                buttonSlide.classList.remove('isInvisible')
            }
            else {
                buttonSlide.classList.add('isInvisible')
            }
        })
    })



    // Cuando CLICK en .Button-slide
    // scrollY arriba

    buttonSlide.addEventListener(`click`, () => {
        window.scrollTo({ top: 0, behavior: `smooth` })
    })




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