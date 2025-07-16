(function () {
  const li = document.querySelectorAll('.Menu-li')
  const block = document.querySelectorAll('.Block')
  const btn = document.querySelector('.Btn-burguer')
  const btnNav = document.querySelector('.Btn-nav')
  const home = document.querySelector('main')
  const chat = document.querySelector('.Block-chat')
  const liChat = document.querySelector('.Menu-li--chat')
  const btnChat = document.querySelector('.Btn-chat')
  const responsiveChat = document.querySelector('.Block-chat--responsive')
  const alertButton = document.querySelector('.Home-button')
  const tasksImportant = document.querySelector('.Tasks-dl--important')
  const clientsButton = document.querySelector('.Home-client')
  const listClients = document.querySelector('.Clients-ul')
  const arrow = document.querySelector('.Clients-arrow')
  const clients = document.querySelector('.Clients')
  const management = document.querySelector('.Management-link')
  const homeManagement = document.querySelector('.Home-management--projects')
  let statusArrow = 0

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




  // Calendar 

  class Calendar {
    constructor() {
      this.currentDate = new Date();
      this.events = {};
      this.activeFormDate = null;
      this.newEvent = { title: "", startTime: "", endTime: "" };

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
        const dateStr = date.toISOString().split("T")[0];

        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");

        const dayNumber = document.createElement("div");
        dayNumber.classList.add("calendar-day-number");
        dayNumber.textContent = day;

        const eventsContainer = document.createElement("div");
        if (this.events[dateStr]) {
          this.events[dateStr].forEach(event => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("calendar-event");
            eventElement.textContent = `${event.title} (${event.startTime} - ${event.endTime})`;
            eventsContainer.appendChild(eventElement);
          });
        }

        const addEventButton = document.createElement("div");
        addEventButton.classList.add("add-event");
        addEventButton.textContent = "Add Event";
        addEventButton.addEventListener("click", () => this.toggleForm(dateStr));

        if (this.activeFormDate === dateStr) {
          const form = this.createEventForm(dateStr);
          dayElement.appendChild(form);
        }

        dayElement.appendChild(dayNumber);
        dayElement.appendChild(eventsContainer);
        dayElement.appendChild(addEventButton);
        calendarGrid.appendChild(dayElement);
      }
    }

    toggleForm(dateStr) {
      this.activeFormDate = this.activeFormDate === dateStr ? null : dateStr;
      this.newEvent = { title: "", startTime: "", endTime: "" };
      this.generateDays();
    }

    createEventForm(dateStr) {
      const form = document.createElement("div");
      form.classList.add("event-form");

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.placeholder = "Title";
      titleInput.value = this.newEvent.title;
      titleInput.addEventListener("input", e => this.newEvent.title = e.target.value);

      const startTimeInput = document.createElement("input");
      startTimeInput.type = "time";
      startTimeInput.value = this.newEvent.startTime;
      startTimeInput.addEventListener("input", e => this.newEvent.startTime = e.target.value);

      const endTimeInput = document.createElement("input");
      endTimeInput.type = "time";
      endTimeInput.value = this.newEvent.endTime;
      endTimeInput.addEventListener("input", e => this.newEvent.endTime = e.target.value);

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", () => this.addEvent(dateStr));

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", () => this.toggleForm(null));

      form.appendChild(titleInput);
      form.appendChild(startTimeInput);
      form.appendChild(endTimeInput);
      form.appendChild(saveButton);
      form.appendChild(cancelButton);

      return form;
    }

    addEvent(dateStr) {
      if (!this.events[dateStr]) this.events[dateStr] = [];
      this.events[dateStr].push({ ...this.newEvent });
      this.toggleForm(null);
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



