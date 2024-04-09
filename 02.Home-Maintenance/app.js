window.addEventListener("load", solve);

function solve() {
    const [placeElement, actionElement, personElement, addButtonElement] = document.getElementsByTagName('input')
    const taskListElement = document.getElementById('task-list')
    const doneTasksListElement = document.getElementById('done-list')
    if (placeElement === '' || actionElement === '' || personElement === '') {
        return;
    }


    addButtonElement.addEventListener('click', () => {
        taskListElement.appendChild(taskCreator(placeElement, actionElement, personElement))
        placeElement.value = '';
        actionElement.value = '';
        personElement.value = '';
    })

    function taskCreator(placeElement, actionElement, personElement) {
        const place = placeElement.value;
        const action = actionElement.value;
        const person = personElement.value;
        const liElement = document.createElement('li');
        liElement.classList.add('clean-task');

        const ArticleElement = document.createElement('article');
        ArticleElement.innerHTML = `
        <p>${`Place:${placeElement.value}`}</p>
        <p>${`Action:${actionElement.value}`}</p>
        <p>${`Person:${personElement.value}`}</p>`;

        liElement.appendChild(ArticleElement);

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', () => {
            placeElement.value = place;
            actionElement.value = action;
            personElement.value = person;
            taskListElement.innerHTML = '';
        })

        const doneButton = document.createElement('button');
        doneButton.classList.add('done');
        doneButton.textContent = 'Done'
        doneButton.addEventListener('click', () => {
            doneTasksListElement.appendChild(doneTasksCreator(place, action, person))
            taskListElement.innerHTML = '';
        })
        const divElement = document.createElement('div')
        divElement.classList.add('buttons')
        divElement.appendChild(editButton);
        divElement.appendChild(doneButton);
        liElement.appendChild(divElement);
        return liElement;
    }
    function doneTasksCreator(place, action, person){
        const liElement = document.createElement('li');
        
        const ArticleElement = document.createElement('article');
        ArticleElement.innerHTML = `
        <p>${`Place:${place}`}</p>
        <p>${`Action:${action}`}</p>
        <p>${`Person:${person}`}</p>`;

        liElement.appendChild(ArticleElement);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            doneTasksListElement.innerHTML = '';
        })
        liElement.appendChild(deleteButton)
        return liElement;
    }

}