
const li = document.querySelectorAll('.Menu-li')
const block = document.querySelectorAll('.Block')
const home = document.querySelector('main')
const chat = document.querySelector('.Block-chat')
const liChat = document.querySelector('.Menu-li--chat')
const alertButton = document.querySelector('.Home-button')
const tasksImportant = document.querySelector('.Tasks-dl--important')
const clientsButton = document.querySelector('.Home-client')
const listClients = document.querySelector('.Clients-ul')
const projectList = document.querySelector('.Projects-ul')
const arrow = document.querySelector('.Clients-arrow')
const clients = document.querySelector('.Clients')
const management = document.querySelector('.Management-link')
const homeManagement = document.querySelector('.Home-management--projects')
let statusArrow = 0
const projects = getProject()

function getProject() {
    if (!localStorage.getItem('projectJSON')) {
        localStorage.setItem('projectJSON', '[]')
    }
    return JSON.parse(localStorage.getItem('projectJSON'))
}
function listProjects() {
    const editSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>`
    const deleteSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>`
    const editSvgElement = new DOMParser().parseFromString(editSvgCode, 'image/svg+xml').documentElement
    const deleteSvgElement = new DOMParser().parseFromString(deleteSvgCode, 'image/svg+xml').documentElement
    projects.forEach((project) => {
        const listProjects = document.createElement('li')
        listProjects.textContent = project.projectName
        listProjects.classList.add('Projects-li')
        projectList.appendChild(listProjects)
        const editSvgClone = editSvgElement.cloneNode(true)
        const deleteSvgClone = deleteSvgElement.cloneNode(true)
        editSvgClone.setAttribute('data-id', project._id)
        deleteSvgClone.setAttribute('data-id', project._id)
        listProjects.appendChild(editSvgClone)
        listProjects.appendChild(deleteSvgClone)
        editSvgClone.addEventListener('click', () => {
            localStorage.setItem('idProject', project._id)
            window.location.href = '../src/update_projects.html'
        })
        deleteSvgClone.addEventListener('click', () => {
            let result = projects.findIndex((proyecto) => proyecto._id === project._id)
            projects.splice(result, 1)
            localStorage.setItem('projectJSON', JSON.stringify(project))
            window.location.reload();
        })
    })
}
listProjects()

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
    
    buttonSlide.addEventListener(`click` , ()=>{
        window.scrollTo({top:0, behavior:`smooth`})
    })
    
    
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