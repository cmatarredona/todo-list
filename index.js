class Project {
    constructor(name) {
        this.name = name;
        this.toDoList = [];
    }
    addToDoList(toDo) {
        this.toDoList.push(toDo);
    }
}
class ToDo {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.date = new Date();
    }
}
var projects=[];
if(!localStorage.getItem("projects")){
    const proyecto=new Project("Inicio");
    proyecto.addToDoList(new ToDo("Curso","JS"));
    projects.push(proyecto);
    saveData();
}
function saveData(){
    localStorage.setItem("projects",JSON.stringify(projects));
}
function displayToDoList(toDoList){
    let data="";
    if(toDoList.length==0)return "No hay ninguna lista";
    toDoList.forEach(todo=>{
        data+=`
        <div class='todo'>
            <h4>${todo.name}</h4>
            <p>${todo.description}</p>
        </div>
        `;
    })
    return data;
}
function displayNewProjectForm(){
    let data="";
    data+=`
    <div class='new'>
    <h3>Nuevo Proyecto</h3>
    <hr/>
    <form id='newProject'><input type='text' name='name' required><input type='submit' value='Nuevo Proyecto'></form>
    </div>
    `;
    return data;
}
function displayProjects(){
    let data=displayNewProjectForm();
    projects=JSON.parse(localStorage.getItem("projects"));
    projects.forEach((project,index)=>{
        data+=`
        <div class='project'>
            <h3>${project.name}</h3>
            <hr />
            <div>
                <h5>Nuevo todo</h5>
                <form class='newToDo' id='${index}'>
                    Nombre:<input type='text' placeholder='Proyecto' name='nombre' required>
                    Descripción:<input type='text' placeholder='Realizar endpoints' name='descripcion' required>
                    <input type='submit' value='Nuevo todo'>
                </form>
            </div>
            <hr />
            <div class='toDoList'>
                ${displayToDoList(project.toDoList)}
            </div>
        </div>
        `;
    });
    document.getElementById("proyectos").innerHTML=data;
    eventoFormNewProject();
    eventosForms();
}
function eventosForms(){
    document.querySelectorAll("form.newToDo").forEach(form=>{
        form.addEventListener(
            "submit",
            (e)=>{
                e.preventDefault();
                projects[e.target.id].toDoList.push(new ToDo(e.target.nombre.value,e.target.descripcion.value));
                saveData();
                displayProjects();
            }
        );
    });
}
function eventoFormNewProject(){
    document.forms.newProject.addEventListener(
        "submit",
        (e)=>{
            e.preventDefault();
            projects.push(new Project(e.target.name.value));
            saveData();
            displayProjects();
        }
    )
}
displayProjects();