(function() {
const body = document.querySelector('body')
const li = body.querySelectorAll('.Menu-li')
const block = body.querySelectorAll('.Block')
const btn = body.querySelector('.Btn-burguer')
const btnNav = body.querySelector('.Btn-nav')
const home = body.querySelector('main')
const btnChat = body.querySelector('.Btn-chat')
const responsiveChat = body.querySelector('.Block-chat--responsive')
const chat = body.querySelector('.Block-chat')
const liChat = body.querySelector('.Menu-li--chat')
const contactList = body.querySelector('.Contacts-dl')
const contacts = getContacts()


                    // Función realizada con apoyo de documentación oficial (MDN y W3S) y ChatGpt

// Function = devuelveme contactJSON,
    // Si no existe,  CREATE IT
function getContacts() {
    if (!localStorage.getItem('contactJSON')) {
        localStorage.setItem('contactJSON', '[]')
    }
    return JSON.parse(localStorage.getItem('contactJSON'))
}

// Defino una función de edit y delet
function listContacts() {
    const editSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>`
    const deleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>`

//Utilizamos DOMParser para parsear (toma los datos y los descompone) el string como si de un elemento html se tratara el svg
        //Por cada elemento de contactos = CREATE etiqueta 'dd'
        // A 'dd' le ADD class
        // AÑADO este listContact como hijo de contactList
        // Clono los svg anteriores para utilizarlos en varias partes 
        // ADJUNTO id de contacts para traer DATA a otra pantalla 

// Cuando CLICK en editSvgClone
    // Guardo ID en el localStorage para luego representarlo en la pantalla donde me traigo la data
    // LINK to 'update_contacts?

// Cuando CLICK en deleteSvgClone
    // FINDINDEX del objeto 'contacto' a eliminar mediante el i que obtengo comparando ID
    // DELETE objeto 
    // GUARDAR objetos excepto el eliminado
    // RECHARGE pág para actualizar data

    const editSvgElement = new DOMParser().parseFromString(editSvgCode, 'image/svg+xml').documentElement
    const deleteSvgElement = new DOMParser().parseFromString(deleteSvgCode, 'image/svg+xml').documentElement
    contacts.forEach((contact) => {
        const listContact = document.createElement('dd')
        listContact.textContent = contact.givenName
        listContact.classList.add('Contacts-dd')
        contactList.appendChild(listContact)
        const editSvgClone = editSvgElement.cloneNode(true)
        const deleteSvgClone = deleteSvgElement.cloneNode(true)
        editSvgClone.setAttribute('data-id', contact._id)
        deleteSvgClone.setAttribute('data-id', contact._id)
        listContact.appendChild(editSvgClone)
        listContact.appendChild(deleteSvgClone)
        editSvgClone.addEventListener('click', () => {
            localStorage.setItem('idContact', contact._id)
            window.location.href = '../src/update_contacts.html'
        })
        deleteSvgClone.addEventListener('click', () => {
            let result = contacts.findIndex((contacto) => contacto._id === contact._id)
            contacts.splice(result, 1)
            localStorage.setItem('contactJSON', JSON.stringify(contacts))
            window.location.reload();
        })
    })
}
listContacts()




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




// Cuando hago scroll hacia abajo, 
// .Button-slide le ADD `isInvisible
// .Button-slide isInvisible a MITAD de la ventana

const buttonSlide = document.querySelector('.Home-slide');

window.addEventListener('scroll', () => {

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


// Cuando CLICK en .Button-slide
// scrollY arriba

buttonSlide.addEventListener(`click`, () => {
    window.scrollTo({ top: 0, behavior: `smooth` })
})






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
     
    
})();
