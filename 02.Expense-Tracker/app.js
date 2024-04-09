window.addEventListener("load", solve());
function solve() {

    let expense = ''
    let amount = ''
    let date = ''

    let addButton = document.getElementById('add-btn');
    

    document.querySelector('.delete').addEventListener('click', ()=>{
        location.reload();
    })
    addButton.addEventListener('click', () => {

        const [expenseElement, amountElement, dateElement] = document.getElementsByTagName('input');

        if (expenseElement.value === '' || amountElement.value === '' || dateElement.value === '') {
            return
        }
        const expenseListElement = document.getElementById('expenses-list')

        const newLiElement = document.createElement('li');
        newLiElement.classList.add('expense-item')

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'edit')
        editButton.textContent = 'EDIT';

        editButton.addEventListener('click', () => {
            expenseElement.value = expense;
            amountElement.value = amount;
            dateElement.value = date;
            listPreviewElement.innerHTML = '';
            addButton.disabled = false;
        })

        const okButton = document.createElement('button')
        okButton.classList.add('btn', 'ok')
        okButton.textContent = 'OK';

        okButton.addEventListener('click', () => {
            newLiElement.innerHTML = '';

            newLiElement.appendChild(createArticleElement(expense, amount, date));
            expenseListElement.appendChild(newLiElement);
            listPreviewElement.innerHTML = '';
            addButton.disabled = false;
        })
        const newDivElement = document.createElement('div');
        newDivElement.classList.add('buttons')
        newDivElement.appendChild(editButton)
        newDivElement.appendChild(okButton)
        
        
        
        newLiElement.appendChild(createArticleElement(expenseElement.value, amountElement.value, dateElement.value));
        
        const listPreviewElement = document.getElementById('preview-list')
        newLiElement.appendChild(newDivElement)

        listPreviewElement.appendChild(newLiElement);

        expense = expenseElement.value;
        amount = amountElement.value;
        date = dateElement.value;

        expenseElement.value = '';
        amountElement.value = '';
        dateElement.value = '';
        addButton.disabled = true;

    })
    function createArticleElement(expense, amount, date) {
        const newArticleElement = document.createElement('article');

        const expenseParagraph = document.createElement('p');
        expenseParagraph.textContent = `Type: ${expense}`
        newArticleElement.appendChild(expenseParagraph);

        const amountParagraph = document.createElement('p');
        amountParagraph.textContent = `Amount: ${amount}$`
        newArticleElement.appendChild(amountParagraph);

        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Date: ${date}`
        newArticleElement.appendChild(dateParagraph);
        console.log(newArticleElement);
        return newArticleElement;
    }
}



