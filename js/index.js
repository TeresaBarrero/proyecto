

const li = document.querySelectorAll('.Menu-li')
const bloque = document.querySelectorAll('.Bloque')
const main = document.querySelector('.Main')
const chat = document.querySelector('.Bloque-chat')
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
            // TODOS .Bloque REMOVE is Active
            // .Menu-li [POSICION] ADD isActive
            // .Bloque [POSICION] ADD isActive

    // SI contains class 'Menu-li--Chat'
        // Cuando CLICK en liChat
            // chat TOGGLE 'isActive'
            // Recorre TODOS li 
                // Si NO contains class 'Menu-li--Chat' o 'Bloque-Chat'
                    // TODOS li REMOVE isActive

    // SI NO contains class 'Menu-li--wrapper`
        // TODOS li[i] ADD 'isActive'

li.forEach( ( _, i )=>{
    if(!li[i].classList.contains('Menu-li--chat')){
        li[i].addEventListener('mouseover', ()=>{
            li.forEach( ( _ , i )=>{
                li[i].classList.remove('isActive')
                bloque[i].classList.remove('isActive')
            })
            if(!li[i].classList.contains('Menu-li--wrapper')){
                li[i].classList.add('isActive')
            }
            bloque[i].classList.add('isActive')
        })   
    }
    else{
        li[i].addEventListener('click', ()=>{
            //liChat.classList.toggle('isActive')
            chat.classList.toggle('isActive')
            li.forEach( ( _ , i )=>{
                if(!li[i].classList.contains('Menu-li--chat'||'Bloque-chat')){
                    li[i].classList.remove('isActive')
                    bloque[i].classList.remove('isActive')
                }
            })
            
        })  
    }
})


// Cuando MOUSEOVER main
    // Si NO contains class 'Bloque-chat'
        // TODOS .Bloque[i] REMOVE isActive
        // TODOS li REMOVE is Active

main.addEventListener('mouseover' , ()=>{
    bloque.forEach( ( _ , i )=>{
        if(!bloque[i].classList.contains('Bloque-chat')){
            bloque[i].classList.remove('isActive')
            li[i].classList.remove('isActive')
        }
    })
})


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

clientsButton.addEventListener('click' , ()=>{
    listClients.classList.toggle('isActive')
})


// Cuando CLICK en .Clients
    // arrow le STYLE transform rotate (90deg)
    
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

// Cuando CLICK en .Management-link
    // homeManagement TOGGLE isActive

management.addEventListener('click' , ()=>{
    homeManagement.classList.toggle('isActive')
    console.log(management)
})


