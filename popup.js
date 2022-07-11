const form = document.querySelector('#task-form');
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
    task_el.id = task_list.length;

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
    task_input_el.id = task_list.length;
    task_list.push(task_input_el.value);

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

    saveList(task_list);

    input.value = "";

    task_delete_el.addEventListener('click', (e) => {
        list_el.removeChild(task_el);
        task_list = task_list.filter(task => task.id !== task_el.id);
        saveList(task_list)
        console.log(task_list);
    });

    task_complete_el.addEventListener('click', (e) => {
        if (task_input_el.style.textDecoration != 'line-through') {
            task_input_el.style.textDecoration = 'line-through';
            task_list[Number(task_input_el.id)].style.textDecoration = 'line-through';
            saveList(task_list);
        } else {
            task_input_el.style.textDecoration = 'none';
            task_list[Number(task_input_el.id)].style.textDecoration = 'none';
            saveList(task_list);
        }
    })
}

function createListAfterLoad(text_input, id_number) {
    const task = text_input;

    const task_el = document.createElement('div');
    task_el.className = 'task';
    task_el.id = Number(id_number); 

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
    task_input_el.id = Number(id_number);

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

    input.value = "";

    task_delete_el.addEventListener('click', (e) => {
        list_el.removeChild(task_el);
        task_list = task_list.filter(task => task.id !== task_el.id);
        saveList(task_list)
        console.log(task_list);
    });

    task_complete_el.addEventListener('click', (e) => {
        if (task_input_el.style.textDecoration != 'line-through') {
            task_input_el.style.textDecoration = 'line-through';
            task_list[Number(task_input_el.id)].style.textDecoration = 'line-through';
            saveList(task_list);
        } else {
            task_input_el.style.textDecoration = 'none';
            task_list[Number(task_input_el.id)].style.textDecoration = 'none';
            saveList(task_list);
        }
    })
}

function saveList(list) {
    chrome.storage.sync.set({saved_list: list}, function() {
        console.log('Value is set to ' + list);
      });
}

function getList() {
    chrome.storage.sync.get(['saved_list'], function(result) {
        result.saved_list.forEach(element => task_list.push(element));

        for (let i = 0; i < result.saved_list.length; i++) {
            createListAfterLoad(result.saved_list[i], i);
        }
    });
}

submitButton.addEventListener("click", addTaskClick);

input.addEventListener("keypress", addTaskEnter);

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

function saveList(list) {
    chrome.storage.sync.set({saved_list: list}, function() {
        console.log('Value is set to ' + list);
      });
}

function getList() {
    chrome.storage.sync.get(['saved_list'], function(result) {
        result.saved_list.forEach(element => createListAfterLoad(element));
      });
}

submitButton.addEventListener("click", addTaskClick);

input.addEventListener("keypress", addTaskEnter);

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', getList);



