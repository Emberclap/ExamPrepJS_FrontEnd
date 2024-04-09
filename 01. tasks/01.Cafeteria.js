function solve(input) {
    let baristas = [];

    let n = input.shift()

    for (let i = 0; i < n; i++) {
        const [name, shift, coffeeTypes] = input.shift().split(' ');
        baristas.push({ name, shift, coffeeTypes: coffeeTypes.split(',') });
    }
    while (input != 'Closed') {

        const [action, baristaName, parameter1, parameter2] = input.shift().split(' / ');

        const barista = (findBarista(baristaName));

        if (action === 'Prepare') {
            if (barista.shift == parameter1 && barista.coffeeTypes.includes(parameter2)) {
                console.log(`${barista.name} has prepared a ${parameter2} for you!`);
            }
            else{
                console.log(`${barista.name} is not available to prepare a ${parameter2}.`);
            }

        } else if (action === 'Learn') {
            const newCoffeetype = parameter1;
            if(barista.coffeeTypes.includes(newCoffeetype)){
                console.log(`${barista.name} knows how to make ${newCoffeetype}.`);
            }else{
                barista.coffeeTypes.push(newCoffeetype);
                console.log(`${barista.name} has learned a new coffee type: ${newCoffeetype}.`);
            }
        } else if(action === 'Change Shift'){
            const newShift = parameter1; 
            barista.shift = newShift;
           console.log(`${barista.name} has updated his shift to: ${newShift}`);
        }
    }

    for (const barista of baristas) {
        console.log(`Barista: ${barista.name}, Shift: ${barista.shift}, Drinks: ${barista.coffeeTypes.join(', ')}`);
    }
    
    function findBarista(barista) {
        return  baristas.find(x => x.name  === barista)
    }
}
solve([

    '3',

    'Alice day Espresso,Cappuccino',

    'Bob night Latte,Mocha',

    'Carol day Americano,Mocha',

    'Prepare / Alice / day / Espresso',

    'Change Shift / Bob / night',

    'Learn / Carol / Latte',

    'Learn / Bob / Latte',

    'Prepare / Bob / night / Latte',

    'Closed'])
solve(['4',

    'Alice day Espresso,Cappuccino',

    'Bob night Latte,Mocha',

    'Carol day Americano,Mocha',

    'David night Espresso',

    'Prepare / Alice / day / Espresso',

    'Change Shift / Bob / day',

    'Learn / Carol / Latte',

    'Prepare / Bob / night / Latte',

    'Learn / David / Cappuccino',
    'Prepare / Carol / day / Cappuccino',
    'Change Shift / Alice / night',
    'Learn / Bob / Mocha', 'Prepare / David / night / Espresso',
    'Closed'])