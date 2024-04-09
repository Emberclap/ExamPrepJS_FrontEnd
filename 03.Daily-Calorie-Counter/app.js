window.addEventListener("load", solve);
function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/tasks'

    const editMealButton = document.getElementById('edit-meal');
    const addMealButton = document.getElementById('add-meal');

    const [food, time, calories] = document.getElementsByTagName('input')

    let currentMealId;
    editMealButton.addEventListener('click', async () => {
        await fetch(`${baseUrl}/${currentMealId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                food: food.value,
                calories: calories.value,
                time: time.value,
            })
        })

        addMealButton.disabled = false;
        editMealButton.disabled = true;
        food.value = '';
        calories.value = '';
        time.value = '';
    });
    document.getElementById('load-meals').addEventListener('click', async (e) => {

        const mealsList = document.getElementById('list');
        mealsList.innerHTML = '';
        const response = await fetch(baseUrl);
        const meals = await response.json();

        Object.values(meals).forEach(meal => {
            mealsList.appendChild(createMealDiv(meal))

        })
        editMealButton.disabled = true;

    });

    addMealButton.addEventListener('click', async () => {
        if (food.value === '' || calories.value === '' || time.value === '') {
            return;
        }
        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify({
                food: food.value,
                calories: calories.value,
                time: time.value,
            }),
            headers: {
                "Content-type": "application/json;"
            }
        })
        food.value = '';
        calories.value = '';
        time.value = '';

    })

    function createMealDiv(meal) {
        currentMealId = meal._id;
        const newMeal = document.createElement('div');
        newMeal.classList.add('meal')
        newMeal.innerHTML = `
          <h2>${meal.food}</h2>
          <h3>${meal.time}</h3>
          <h3>${meal.calories}</h3>`
        const newButtonsDiv = document.createElement('div');

        const newChangeButton = document.createElement('button');
        newChangeButton.classList.add('change-meal');
        newChangeButton.textContent = 'Change';
        newChangeButton.addEventListener('click', async (e) => {
            addMealButton.disabled = true;
            editMealButton.disabled = false;
            currentMealId = meal._id;
            food.value = meal.food
            calories.value = meal.calories
            time.value = meal.time

        })
        
        newButtonsDiv.appendChild(newChangeButton);
        const newDeleteButton = document.createElement('button');
        newDeleteButton.classList.add('delete-meal');
        newDeleteButton.textContent = 'Delete';
        newDeleteButton.addEventListener('click', async (e) => {
            await fetch(`${baseUrl}/${meal._id}`, {
                method: 'DELETE',
            })

        })
        newButtonsDiv.appendChild(newDeleteButton);
        newMeal.appendChild(newButtonsDiv);

        return newMeal
    }

}


