function solve(input) {

    let message = input.shift()
    let command = input.shift();

    while (command != 'Buy') {

        if (command === 'TakeEven') {
            message = message
                .split("")
                .filter(function (val, index) {
                    return index % 2 == 0;
                }).join('');

            console.log(message);
        }
        else if (command.includes('ChangeAll')) {
            const textForReplace = command.split('?')[1]
            const replaceText = command.split('?')[2];
            while (message.includes(textForReplace)) {
                message = message.replace(textForReplace, replaceText)
            }
            console.log(message);
        }
        else if (command.includes('Reverse')) {
            const reverseWord = command.split('?')[1];
            if(message.includes(reverseWord)){
                message = message.replace(reverseWord ,"");
                let reversed = reverseWord.split("").reverse().join("");
                message = message + reversed;
                console.log(message);
            } else {
                console.log('error');
            }
        };
        command = input.shift();
    }
    console.log(`The cryptocurrency is: ${message}`);
}
solve((["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs",
    "TakeEven",
    "Reverse?!nzahc",
    "ChangeAll?m?g",
    "Reverse?adshk",
    "ChangeAll?z?i",
    "Buy"]))
solve((["PZDfA2PkAsakhnefZ7aZ",
    "TakeEven",
    "TakeEven",
    "TakeEven",
    "ChangeAll?Z?X",
    "ChangeAll?A?R",
    "Reverse?PRX",
    "Buy"]))
