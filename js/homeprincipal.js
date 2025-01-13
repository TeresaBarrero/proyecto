
const li = document.querySelectorAll('.Menu-li')
const block = document.querySelectorAll('.Block')
const home = document.querySelector('main')
const chat = document.querySelector('.Block-chat')
const liChat = document.querySelector('.Menu-li--chat')
const description = document.getElementById('description')
const date = document.getElementById('date')
const successButton = document.querySelector('.Form-button')

function submitForm(){
    if(!description.value && !date.value){
        return alert("Completa todos los campos")
    }
    const data = JSON.parse(localStorage.getItem('taskJSON'))
    data.push({_id:crypto.randomUUID(),desc:description.value,completed:false,important:false,date:date.value})
    localStorage.setItem('taskJSON',JSON.stringify(data))
}
if(successButton){
    successButton.addEventListener('click' ,()=>{
        submitForm()
    } )
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

if(buttonSlide){
    buttonSlide.addEventListener(`click` , ()=>{
        window.scrollTo({top:0, behavior:`smooth`})
    })
}


// Cuando scrollY esté arriba
    // .Button-Slide REMOVE `isVisible´

window.addEventListener(`scroll` , ()=>{
        
    let { scrollY, innerHeight } = window
    let { offsetTop } = buttonSlide
        
    const puntoActivacion = scrollY <= offsetTop 

    if( puntoActivacion ){
        buttonSlide.classList.remove(`isVisible`)
    }
    else{
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
 


const form = document.getElementById('exportForm');
const fileInput = document.getElementById('export-file');
    
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
        
    const file = fileInput.files[0];
        
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
            
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Archivo cargado correctamente', data);
            alert('Archivo exportado con éxito');
        })
        .catch(error => {
            console.error('Error al cargar el archivo:', error);
            alert('Hubo un error al cargar el archivo');
        });
    } 
    else {
        alert('Por favor selecciona un archivo para exportar');
    }
});


