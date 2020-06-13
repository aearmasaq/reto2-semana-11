                                                                           
let tareaInput = document.getElementById("new-task");                      
let agregarButton = document.getElementsByTagName("button")[0];               
let incompletoTareaHolder = document.getElementById("incomplete-tasks");  
let completoTareaHolder = document.getElementById("completed-tasks");    

let createNewTaskElement = function(taskString) {       
  let listItem = document.createElement("li");          
  let checkBox = document.createElement("input");       
  let label = document.createElement("label");          
  let editInput = document.createElement("input");      
  let editButton = document.createElement("button");    
  let deleteButton = document.createElement("button");  

  checkBox.type = "checkbox";        
  editInput.type = "text";            
  editButton.innerText = "Editar";      
  editButton.className = "editar";      
  deleteButton.innerText = "Borrar"; 
  deleteButton.className = "borrar";  
  label.innerText = taskString;      

  listItem.appendChild(checkBox);      
  listItem.appendChild(label);        
  listItem.appendChild(editInput);     
  listItem.appendChild(editButton);    
  listItem.appendChild(deleteButton);  

  return listItem;

};

let agregarTarea = function() {                            
  let listItemName = tareaInput.value || "New Item";  
  let listItem = createNewTaskElement(listItemName);  
  incompletoTareaHolder.appendChild(listItem);        
  bindTaskEvents(listItem, tareaCompletada);           
  tareaInput.value = "";                              
};

let EditarTarea = function() {                                 
  let listItem = this.parentNode;                               
  let editInput = listItem.querySelector("input[type=text");    
  let label = listItem.querySelector("label");                  
  let button = listItem.getElementsByTagName("button")[0];     

  let containsClass = listItem.classList.contains("editMode");  
  if(containsClass) {                                           
      label.innerText = editInput.value;                        
      button.innerText = "Editar";                               
  } else {                                                      
     editInput.value = label.innerText;                         
     button.innerText = "Guardar";                                
  }
    listItem.classList.toggle("editMode");                    
};

let borrarTarea = function() {     
  let listItem = this.parentNode;  
  let ul = listItem.parentNode;   
  ul.removeChild(listItem);       
};

let tareaCompletada = function() {              
  let listItem = this.parentNode;             
  completoTareaHolder.appendChild(listItem);  
  bindTaskEvents(listItem, tareaIncompleta);    
};

let tareaIncompleta = function() {              
  let listItem = this.parentNode;               
  incompletoTareaHolder.appendChild(listItem); 
  bindTaskEvents(listItem, tareaCompletada);      
};

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {   
  let checkBox = taskListItem.querySelector("input[type=checkbox]");  
  let editButton = taskListItem.querySelector("button.edit");         
  let deleteButton = taskListItem.querySelector("button.delete");     
  editButton.onclick = EditarTarea;                                     
  deleteButton.onclick = borrarTarea;                                 
  checkBox.onchange = checkBoxEventHandler;                         
};

let ajaxRequest = function() {
  console.log("AJAX request");
};

agregarButton.addEventListener("click", agregarTarea);      
agregarButton.addEventListener("click", ajaxRequest);  

for(let i = 0; i < incompletoTareaHolder.children.length; i++) {     
  bindTaskEvents(incompletoTareaHolder.children[i], tareaCompletada);  
}

for(let i = 0; i < completoTareaHolder.children.length; i++) {      
  bindTaskEvents(completoTareaHolder.children[i], tareaIncompleta);  
}