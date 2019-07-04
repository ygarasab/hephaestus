var automat = 0

var autName = document.getElementById('load')
var file = document.getElementById('file')
var log = document.getElementById('log')

var inicial = document.getElementsByClassName('inicial')[0]
var processContainer = document.getElementsByClassName('processamentos')[0]


class DisplayController{

    /**
     * 
     * @param {String} estadoInicial 
     */

    constructor(estadoInicial){

        inicial.innerHTML = ''
        processContainer.innerHTML = ''

        let span = document.createElement('span')
        span.innerHTML = 'Estado inicial: '

        let estado = document.createElement('span')
        estado.className = 'estado'
        estado.innerHTML = estadoInicial

        inicial.appendChild(span)
        inicial.appendChild(estado)

    }

    /**
     * 
     * @param {String} simbolo 
     * @param {String[][]} processamentos 
     */

    processa(simbolo, processamentos){

        let processamento = document.createElement('div')
        processamento.className = 'processamento'

        let identificador = document.createElement('div')
        identificador.className = 'identificador'
        identificador.innerHTML = 'Processando o símbolo '+simbolo

        var dProcessamentos = document.createElement('div')

        for(let p of processamentos){
            

            let dProcessamento = document.createElement('div')
            dProcessamento.className = 'div-processamento'

            let pilha1 = Array.from(' '+p[1])
            let pilha2 = Array.from(' '+p[3])

            let dPilha1 = document.createElement('div')
            dPilha1.className = 'pilha'

            let dPilha2 = document.createElement('div')
            dPilha2.className = 'pilha'

            for(let s of pilha1){

                    let item = document.createElement('span')
                    item.className = 'item-da-pilha'
                    item.innerHTML = s

                    dPilha1.appendChild(item)
            }

            for(let s of pilha2){
                

                let item = document.createElement('span')
                item.className = 'item-da-pilha'
                item.innerHTML = s

                dPilha2.appendChild(item)
            }

            let estado1 = document.createElement('span')
            estado1.className = 'estado'
            estado1.innerHTML = p[0]

            let estado2 = document.createElement('span')
            estado2.className = 'estado'
            estado2.innerHTML = p[2]

            let sSimbol = document.createElement('span')
            sSimbol.className = 'simbolo'
            sSimbol.innerHTML = ' processando '+simbolo

            let seta = document.createElement('i')
            seta.className = "fas fa-arrow-right"


            dProcessamento.appendChild(dPilha1)
            dProcessamento.appendChild(estado1)
            dProcessamento.appendChild(sSimbol)
            dProcessamento.appendChild(seta)
            dProcessamento.appendChild(estado2)
            dProcessamento.appendChild(dPilha2)

            dProcessamentos.appendChild(dProcessamento)

        }

        processamento.appendChild(identificador)
        processamento.appendChild(dProcessamentos)
        
        processContainer.appendChild(processamento)

        if(!processamentos.length) this.fail(1)

    }

    clean(){

        processContainer.innerHTML = ''

    }

    success(estado){

        let message = document.createElement('p')
        message.className = 'message'            
        message.innerHTML = estado + ' verifica a pilha vazia com sucesso e vai para o estado final'

        let success = document.createElement('p')
        success.className = 'message success'
        success.innerHTML = 'Palavra aceita'       

        processContainer.appendChild(message)
        processContainer.appendChild(success)


    }

    fail(flag){

        let fails = [
            'O processamento terminou mas o autômato não atingiu um estado final',
            'O processamento não terminou mas não há linhas de processamento possíveis'
        ]

        let message = document.createElement('p')
        message.className = 'message'         
        message.innerHTML = fails[flag]

        let fail = document.createElement('p')
        fail.className = 'message fail'
        fail.innerHTML = 'Palavra Recusada'       

        processContainer.appendChild(message)
        processContainer.appendChild(fail)


    }

}



function check(e){

    if(e.keyCode == 13){

        if(!automat) console.log("Nenhum autômato definido");

        else{

            let leitura = automat.ler(e.target.value) ? 'aceita' : 'recusada'
        
            console.log("Sua palavra foi "+leitura);

        }
        

    }

}


function read(e){
    
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result.split('\n')
        
        var linha1 = text[0].slice(1,-3).split(', ')

        var stuff = [];
        var tmp = [];

        var open = 0


        for(i of linha1){


        var inicio = i.includes('{')
        var fim = i.includes('}')

        if(inicio && fim) stuff.push([i.slice(1,-1)])
        else if(inicio){
            tmp = [i.slice(1)]
            open = 1
        }
        else if(fim){
            tmp.push(i.slice(0,-1))
            stuff.push(tmp)
            tmp = []
            open = 0
        }
        else if(open) tmp.push(i)
        
        else stuff.push(i)
        
        }


        text.shift()

        var trans = []
        

        for(i of text){
            
            let k = ''
            
            //Corrigindo as quebras de texto
            for(let char of i) 
                if(char.charCodeAt(0) != 13) k += char
            
            trans.push(k.split(', '))
        
        }

        console.log(stuff, trans)

        automat = new Automaton(stuff[1],stuff[0],stuff[3], stuff[4], stuff[5], trans)
        
        var nome = e.target.value.split('\\')[2].split('.')[0]

        autName.innerHTML = `O autômato ${ nome } foi carregado!`
        
        


    };
    reader.readAsText(input.files[0]);
}
