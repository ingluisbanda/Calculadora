const display_valor_anterior = document.getElementById('valor-anterior');
const display_valor_actual = document.getElementById('valor-actual');
const botones_numeros = document.querySelectorAll('.numero');
const botones_operaciones = document.querySelectorAll('.operador');

/* 
    - querySelectorAll('.numero') devuelve una Lista estática (no viva)
      que representa una lista de elementos del documento que coinciden 
      con el grupo de selectores indicados.
*/

/*
>>>>>> CALCULOS MATEMATICOS <<<<<<
*/

class Calculadora {
    sumar(num1,num2) {
        return num1+num2;
    }

    restar(num1,num2) {
        return num1-num2;
    }

    multiplicar(num1,num2) {
        return num1*num2;
    }

    dividir(num1,num2) {
        return num1/num2;
    }
}


/*
>>>>>> MOSTRAR EN EL DISPLAY <<<<<<
*/

class Display {
    constructor (display_valor_anterior, display_valor_actual) {
        this.display_valor_actual = display_valor_actual;
        this.display_valor_anterior = display_valor_anterior;
        this.calculadora = new Calculadora();

        /* Numeros que se van a guardar para el proceso*/
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '÷',
            multiplicar: 'x',
            restar: '-',
        }
    }

    borrar(){
    /* .slice(0,-1) nos perite quitar el ultimo digito ingresado*/
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo(){
     this.valorActual = '';
     this.valorAnterior = '';
     this.tipoOperacion = undefined;
     this.imprimirValores();   
    }

    seleccionar(tipo){

    /* Si el tipo de operacion es diferente del 'igual' y a la vez se presiona 
    otro boton, este no va a terminar la operacion*/

        this.tipoOperacion !== 'igual' && this.calcular()
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    agregarNumero(numero){

        if (numero === '.' && this.valorActual.includes('.')) return
        /* Concatenar los numeros que se presionen */
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }
    imprimirValores(){
        this.display_valor_actual.textContent = this.valorActual;
        this.display_valor_anterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior)) return
        this.valorActual = this.calculadora[this.tipoOperacion](valorAnterior,valorActual);
    }
}



/*
>>>>>> OPERACIONES CON BOTONES <<<<<<
*/

const display = new Display(display_valor_anterior, display_valor_actual);

botones_numeros.forEach(boton =>{
    boton.addEventListener('click', ()=>{
        display.agregarNumero(boton.innerHTML);
    });
});

/*
>>>>>> AL DAR CLICK EN LOS BOTONES, SELECCIONA LA OPERACION <<<<<<
*/

botones_operaciones.forEach(boton => {
    boton.addEventListener('click', ()=> display.seleccionar(boton.value))
});