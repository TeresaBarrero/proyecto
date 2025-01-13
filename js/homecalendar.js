
const li = document.querySelectorAll('.Menu-li')
const block = document.querySelectorAll('.Block')
const home = document.querySelector('.Home-principal')
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

li.forEach( ( _, i )=>{
    if(!li[i].classList.contains('Menu-li--chat')){
        li[i].addEventListener('mouseover', ()=>{
            li.forEach( ( _ , i )=>{
                li[i].classList.remove('isActive')
                block[i].classList.remove('isActive')
            })
            if(!li[i].classList.contains('Menu-li--wrapper')){
                li[i].classList.add('isActive')
            }
            block[i].classList.add('isActive')
        })   
    }
    else{
        li[i].addEventListener('click', ()=>{
            //liChat.classList.toggle('isActive')
            chat.classList.toggle('isActive')
            li.forEach( ( _ , i )=>{
                if(!li[i].classList.contains('Menu-li--chat'||'Block-chat')){
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

if(home != null){
    home.addEventListener('mouseover' , ()=>{
        block.forEach( ( _ , i )=>{
            if(!block[i].classList.contains('Block-chat')){
                block[i].classList.remove('isActive')
                li[i].classList.remove('isActive')
            }
        })
    })
}



// Cuando CLICK en .Home-button
    // tasksImportant TOGGLE isActive
    
if(alertButton != null){
    alertButton.addEventListener('click' , ()=>{
        tasksImportant.classList.toggle('isActive')
    
        console.log(alertButton)
    })
}

// Cuando CLICK en .Home-client
    // listClients TOBBLE isActive
if(clientsButton != null){
    
    clientsButton.addEventListener('click' , ()=>{
        listClients.classList.toggle('isActive')
    })
}


// Cuando CLICK en .Clients
    // arrow le STYLE transform rotate (90deg)
if(clients != null){

    clients.addEventListener('click', ()=>{
        if(statusArrow === 0){
            arrow.style.transform = 'rotate(90deg)'
            statusArrow = 1
        }
        else{
            arrow.style.transform = 'rotate(0deg)'
            statusArrow = 0
        }
        console.log(arrow)
    })
}    

// Cuando CLICK en .Management-link
    // homeManagement TOGGLE isActive
if(management != null){

    management.addEventListener('click' , ()=>{
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
   
  