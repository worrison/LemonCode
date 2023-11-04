console.log("************** DELIVERABLE 05 *********************");
console.log("El objetivo de este ejercicio es crear una máquina tragaperras utilizando clases donde cada vez que juguemos insertemos una moneda. Cada máquina tragaperras (instancia) tendrá un contador de monedas que automáticamente se irá incrementando conforme vayamos jugando.Cuando se llame al método play el número de monedas se debe incrementar de forma automática y debe generar tres booleanos aleatorios que representarán el estado de las 3 ruletas. El usuario habrá ganado en caso de que los tres booleanos sean true, y por tanto deberá mostrarse por consola el mensaje:");


class SlothMachine {
    coins: number;
    constructor() {
        this.coins = 0;
    }

    play() {
        this.coins++;
        let ruleta1 = Math.random() >= 0.5;
        let ruleta2 = Math.random() >= 0.5;
        let ruleta3 = Math.random() >= 0.5;

        if (ruleta1 && ruleta2 && ruleta3) {
            console.log(` ${ruleta1} | ${ruleta2} | ${ruleta3}   -> Congratulations!!!. You won ${this.coins} coins!!`);
            this.coins = 0;
        } else {
            console.log(` ${ruleta1} | ${ruleta2} | ${ruleta3}   -> Good luck next time!!`);
        }
    }
}

const machine1 = new SlothMachine();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();