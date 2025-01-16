
const li = document.querySelectorAll('.Menu-li')
const block = document.querySelectorAll('.Block')
const home = document.querySelector('main')
const chat = document.querySelector('.Block-chat')
const liChat = document.querySelector('.Menu-li--chat')
const successButton = document.querySelector('.Form-button')

            // Función realizada con ayuda de documentación oficial (MDN y W3S) y ChatGpt

// Defino objeto 'contact' 
    // le ADD los datos de FORM

// Creo una función para enviar DATA obtenida del FORM
    // Me traigo la data del localStorage 
    //  ADD el objeto que se crea

// GUARDAR info con el nuevo objeto en el localStorage

// CLICK en successButton y se envía la info

const contact = {
    givenName: document.getElementById('fullName'),
    company: document.getElementById('company'),
    dni: document.getElementById('dni'),
    address: document.getElementById('address'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    fax: document.getElementById('fax'),
    label: document.getElementById('label'),
    observations: document.getElementById('observations'),
    clientType: document.getElementById('clientType'),
    clientStatus: document.getElementById('clientStatus')
}
function submitForm() {
    if (!contact.givenName.value && !contact.company.value && !contact.dni.value && !contact.address.value && !contact.email.value && !contact.phone.value && !contact.fax.value && !contact.label.value && !contact.clientType.value && !contact.clientStatus.value) {
        return alert("Completa todos los campos")
    }
    const data = JSON.parse(localStorage.getItem('contactJSON'))
    data.push({
        _id: crypto.randomUUID(),
        givenName: contact.givenName.value,
        company: contact.company.value,
        dni: contact.dni.value,
        address: contact.address.value,
        email: contact.email.value,
        phone: contact.phone.value,
        fax: contact.fax.value,
        label: contact.label.value,
        observations: contact.observations.value,
        clientType: contact.clientType.value,
        clientStatus: contact.clientStatus.value
    })
    localStorage.setItem('contactJSON', JSON.stringify(data))
    window.location.href= 'contacts.html'
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
    
         chatMessages.appendChild(messageElement);
    
         chatMessages.scrollTop = chatMessages.scrollHeight;
    }
     
    
 



