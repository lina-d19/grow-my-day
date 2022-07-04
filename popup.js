const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input');
const list_el = document.querySelector('#tasks');
const submitButton = document.querySelector('#submit-button');
let task_list = [];

function inputLength(){
	return input.value.length;
} 

function addTaskClick(){
	if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
		createList();
	}
}

function addTaskEnter(event) {
	if (inputLength() > 0 && event.which ===13) { //this now looks to see if you hit "enter"/"return"
		//the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
		createList();
	} 
}

function createList() {
    const task = input.value;

    const task_el = document.createElement('div');
    task_el.className = 'task';

    const task_complete_el = document.createElement('button');
    task_complete_el.className = 'actions';
    task_complete_el.type = 'submit';
    task_complete_el.id = 'complete-button';

    const complete_button_style = document.createElement('i');
    complete_button_style.classList.add('fa', 'fa-solid', 'fa-check');

    task_complete_el.appendChild(complete_button_style);

    task_el.appendChild(task_complete_el);

    const task_input_el = document.createElement('input');
    task_input_el.className = 'text';
    task_input_el.type = 'text';
    task_input_el.value = task;

    task_el.appendChild(task_input_el);

    const task_delete_el = document.createElement('button');
    task_delete_el.className = 'actions';
    task_delete_el.type = 'submit';
    task_delete_el.id = 'delete-button';

    const del_button_style = document.createElement('i');
    del_button_style.classList.add('fa', 'fa-solid', 'fa-times');

    task_delete_el.appendChild(del_button_style);

    task_el.appendChild(task_delete_el);

    list_el.appendChild(task_el);
    
    task_list.push(task_el);

    saveList(task_list);

    input.value = "";

    task_delete_el.addEventListener('click', (e) => {
        list_el.removeChild(task_el);
    });

    task_complete_el.addEventListener('click', (e) => {
        if (task_input_el.style.textDecoration != 'line-through') {
            task_input_el.style.textDecoration = 'line-through';
        } else {
            task_input_el.style.textDecoration = 'none';
        }

    })
}

function saveList(task_list) {
    chrome.storage.sync.set({
        list:task_list
    })
}

function getList() {
    chrome.storage.sync.get({
        list:[]
    })
}

submitButton.addEventListener("click", addTaskClick);

input.addEventListener("keypress", addTaskEnter);

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

form.addEventListener('load', (e) => {
    e.getList();
})