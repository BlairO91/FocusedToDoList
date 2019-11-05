/* TODO LISTS */
const form = document.querySelector('.addItem');
const taskList = document.querySelector('.taskList');
let toDoList = JSON.parse(localStorage.getItem('tasks')) || [];

function addItem(input) {
    const item = {
        input,
        checked: false
    }
        toDoList.push(item);
        addToUI(toDoList, taskList);
        localStorage.setItem('tasks', JSON.stringify(toDoList));
        form.reset();
};

function addToUI(listArray, taskList) {
    let checkbox;
    taskList.innerHTML = listArray.map((task, i) => {
        if(task.checked ? checkbox = 'verified' : checkbox = 'circle');
        return `
            <li data-index=${i}>
                <input class="hideCheckbox" type="checkbox" data-index=${i} id="item${i}" />
                <label for="item${i}"><img class="listIcon" src="photos/${checkbox}.png" alt="checkbox"></label>
                <span name="taskItem">${task.input}</span>
                <img class="deleteIcon" src="photos/cross.png" name="deleteIcon" alt="deletebutton">
            </li>
        `;
    }).join('');
}

function listActivated(event) {
    const clicked = event.target;
    const index = clicked.dataset.index;
    if(event.target.matches('input')) {
        toDoList[index].checked = !toDoList[index].checked;
        localStorage.setItem('tasks', JSON.stringify(toDoList));
        addToUI(toDoList, taskList);
    } else if(event.target.matches('[name="deleteIcon"]')) {
        const delContent = clicked.previousElementSibling.textContent;
        deleteItem(event, delContent);
    } else {
        return;
    }
}

function deleteItem(event, delContent) {
    //removes from UI
    const item = event.target.parentNode;
    taskList.removeChild(item);

    //removes from local storage
    for(key of toDoList) {
        if(key.input === delContent) {
            const delIndex = toDoList.indexOf(key);
            toDoList.splice(delIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(toDoList));
        }
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('[name="item"]').value;

    if(input !== '') {
        addItem(input);
    }
});

taskList.addEventListener('click', listActivated);

addToUI(toDoList, taskList);



/* PAGE INTERACTIONS */

