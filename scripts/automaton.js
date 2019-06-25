class Automaton{
    
    /**
     * Toma as caracterísiticas básicas do autômato e gera seus estados
     * 
     * @param {String[]} estados Lista de estados do autômato
     * @param {String[]} alfabeto Lista de símbolos que o autômato processa
     * @param {String} inicial Estado inicial do autômato
     * @param {String[]} finais Estados finais do autômato
     * @param {String[]} pilha_stuff Alfabetto aceito pela pilha
     * @param {String[][]} trans Lista de transições possíveis
     */

    constructor(estados, alfabeto, inicial, finais, pilha_stuff, trans){

        this.estados = {}

        for(let estado of estados)
        
            this.estados[estado] = new Estado(trans.filter((trans) => {return trans[0] == estado}), estado)
        
        for(let estado of estados)

            this.estados[estado].estados = this.estados
        
        this.alfabeto = alfabeto
        this.inicial = inicial
        this.finais = finais
        this.alfabetoPilha = pilha_stuff

    }

    /**
     * Recebe uma string e verifica de ela é processada ou não por este automato
     * @param {String} palavra Palavra a ser processada
     * @returns {Boolean}
     */

    ler(palavra){

        var possibilidades = [ [ this.inicial , [] ] ]
        var i = 0

        while(true){

            let simbolo = palavra[i]
            var novasPossibilidades = []

            for(let p of possibilidades){

                console.log(this.estados, p[0]);
                

                let processamento = this.estados[p[0]].ler(simbolo, p[1])

                if(this.finais.includes(processamento[0])) return true

                novasPossibilidades += processamento

            }

            possibilidades = novasPossibilidades

            if(!possibilidades) return false

            i++

            if(i == palavra.length) return false

        }

    }

}
