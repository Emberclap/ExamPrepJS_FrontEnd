window.addEventListener("load", solve);

function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/gifts'
    const loadPresentsButton = document.getElementById('load-presents');
    const giftListElement = document.getElementById('gift-list')
    const addGiftButtonElement = document.getElementById('add-present')
    const editGiftButtonElement = document.getElementById('edit-present')
    const [presentElement, personElement, priceElement] = document.getElementsByTagName('input');

    let setId; 

    const presentsLoader = async () => {
        const response = await fetch(baseUrl);
        const gifts = await response.json();

        giftListElement.innerHTML = '';

        for (const gift of Object.values(gifts)) {


            const present = gift.gift;
            const person = gift.for;
            const price = gift.price;
            
            editGiftButtonElement.setAttribute('data-id', gift._id);

            const giftElement = document.createElement('div');
            giftElement.classList.add('gift-sock');

            const contentDivElement = document.createElement('div');
            contentDivElement.innerHTML = `
            <p>${present}</p>
            <p>${person}</p>
            <p>${price}</p>`;

            const changeButton = document.createElement('button');
            changeButton.classList.add('change-btn');
            changeButton.textContent = 'Change'
            changeButton.addEventListener('click', () => {
                presentElement.value = present;
                personElement.value = person;
                priceElement.value = price;
                giftElement.remove()
                addGiftButtonElement.disabled = true;
                editGiftButtonElement.disabled = false;
                setId = gift._id;
            })

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Delete'
            deleteButton.addEventListener('click', async () => {
                await fetch(`${baseUrl}/${gift._id}`, {
                    method: 'DELETE'
                });
    
                giftElement.remove();     
            })
            const buttonsDivElement = document.createElement('div')
            buttonsDivElement.classList.add('buttons-container')
            buttonsDivElement.appendChild(changeButton);
            buttonsDivElement.appendChild(deleteButton);

            giftElement.appendChild(contentDivElement);
            giftElement.appendChild(buttonsDivElement);

            giftListElement.appendChild(giftElement);

        }
    }

    function clearInputData() {
        presentElement.value = '';
        personElement.value = '';
        priceElement.value = '';
    }
    editGiftButtonElement.addEventListener('click', async () => {

       const response = await fetch(`${baseUrl}/${setId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: setId,
                gift: presentElement.value,
                for: personElement.value,
                price: priceElement.value,
            }),
        });
        if (!response.ok) {
            return;
        }
        addGiftButtonElement.disabled = false;
        editGiftButtonElement.disabled = true;
        clearInputData()
        presentsLoader()
    })

    addGiftButtonElement.addEventListener('click', async () => {

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                gift: presentElement.value,
                for: personElement.value,
                price: priceElement.value,
            }),
        });
        if (!response.ok) {
            return;
        }
        clearInputData()
        presentsLoader()
    })

    loadPresentsButton.addEventListener('click', presentsLoader)
}