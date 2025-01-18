
const li = document.querySelectorAll('.Menu-li')
const block = document.querySelectorAll('.Block')
const btn = document.querySelector('.Btn-burguer')
const btnNav = document.querySelector('.Btn-nav')
const home = document.querySelector('main')
const chat = document.querySelector('.Block-chat')
const liChat = document.querySelector('.Menu-li--chat')
const btnChat = document.querySelector('.Btn-chat')
const responsiveChat = document.querySelector('.Block-chat--responsive')
const successButton = document.querySelector('.Form-button');
//Obtenemos el id alacenado en el localStorage para obtener la data de este
const specifyContact = getContact(localStorage.getItem('idContact'));
//Objeto de contact
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
    clientStatus: document.getElementById('clientStatus'),
};
const situation = {
    active: document.querySelector('.Form-option--active'),
    pending: document.querySelector('.Form-option--pending'),
    inactive: document.querySelector('.Form-option--inactive')
};

//Paso el id como parametro y con un .find traigo el objeto cuyo id pasado por parametro sea igual y devuelvo el objeto
function getContact(id) {
    const data = JSON.parse(localStorage.getItem('contactJSON'));
    return data.find((contact) => contact._id === id);
}

//Una vez clicado el botón guardar, valido que ninguno de los campos obligatorios esté vacío
function submitForm() {
    if (!contact.givenName.value || !contact.company.value || !contact.dni.value || !contact.address.value || !contact.email.value || !contact.phone.value || !contact.fax.value || !contact.label.value || !contact.clientType.value || !contact.clientStatus.value) {
        return alert("Completa todos los campos");
    }
//Obtengo el array de objetos completo
    const data = JSON.parse(localStorage.getItem('contactJSON'));
        //Encuentro mediante id el objeto que quiero
    const contactToUpdate = data.find((contact) => contact._id === specifyContact._id);
        //Actualizo la data del objeto

    if (contactToUpdate) {
        contactToUpdate.givenName = contact.givenName.value;
        contactToUpdate.company = contact.company.value;
        contactToUpdate.dni = contact.dni.value;
        contactToUpdate.address = contact.address.value;
        contactToUpdate.email = contact.email.value;
        contactToUpdate.phone = contact.phone.value;
        contactToUpdate.fax = contact.fax.value;
        contactToUpdate.label = contact.label.value;
        contactToUpdate.observations = contact.observations.value;
        contactToUpdate.clientType = contact.clientType.value;
        contactToUpdate.clientStatus = contact.clientStatus.value;
        localStorage.setItem('contactJSON', JSON.stringify(data));
        alert('Contacto actualizado exitosamente');
        window.location.href = 'contacts.html'
    } else {
        alert('No se pudo encontrar el contacto para actualizar.');
    }
}
//Añado la funcionalidad de submitForm al botón de guardado
successButton.addEventListener('click', () => {
    submitForm();
});

//Actualizo la información en el diseño de la data obtenida mediante el id
document.addEventListener('DOMContentLoaded', () => {
    if (specifyContact) {
        contact.givenName.value = specifyContact.givenName;
        contact.company.value = specifyContact.company;
        contact.dni.value = specifyContact.dni;
        contact.address.value = specifyContact.address;
        contact.email.value = specifyContact.email;
        contact.phone.value = specifyContact.phone;
        contact.fax.value = specifyContact.fax;
        contact.label.value = specifyContact.label;
        contact.observations.value = specifyContact.observations;
        contact.clientType.value = specifyContact.clientType;
        contact.clientStatus.value = specifyContact.clientStatus;
        validateChecks(contact.clientStatus.value);
    } else {
        alert('No se encontró el contacto en el almacenamiento local.');
    }
});

// Función para mostrar option selected 
    // si option tiene atributo 'selected'
        // STYLE padding 20px
function validateChecks(clientStatus){
    if(clientStatus){
        if(clientStatus.toLowerCase() === 'activo'){
            situation.active.setAttribute('selected' , true)
            situation.active.style.padding = '12px'
        }
    }
    if(clientStatus){
        if(clientStatus.toLowerCase() === 'pendiente'){
            situation.active.setAttribute('selected' , true)
            situation.active.style.padding = '12px'
        }
    }
    if(clientStatus){
        if(clientStatus.toLowerCase() === 'inactivo'){
            situation.active.setAttribute('selected' , true)
            situation.active.style.padding = '12px'
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


// Cuando CLICK en .Btn-burguer
    // Btn-nav TOGGLE isActive
    btn.addEventListener('click' , ()=>{
        btnNav.classList.toggle('isActive')
    })
    
    
    // Cuando CLICK en .Btn-chat
        // Block-chat le TOGGLE 'isActive'
    btnChat.addEventListener('click' , ()=>{
        chat.classList.toggle('isActive')
        console.log(btnChat)
    })
    btnChat.addEventListener('click' , ()=>{
        responsiveChat.classList.toggle('isActive')
        console.log(btnChat)
    })
    
    
    // Cuando MOUSEOVER home
        // Si NO contains class 'Block-chat'
            // TODOS .Block[i] REMOVE isActive
            // TODOS li REMOVE is Active
    
    if(home != null){
        home.addEventListener('mouseover' , ()=>{
            block.forEach( ( _ , i )=>{
                if(!block[i].classList.contains('Block-chat'||'Block-chat--responsive')){
                    block[i].classList.remove('isActive')
                    if(li[i] != undefined){
                        li[i].classList.remove('isActive')
                    }
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
 





