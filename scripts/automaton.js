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
        
        for(let estado of estados){

            this.estados[estado].estados = this.estados
            this.estados[estado].transVazias()
        
        }
        
        this.alfabeto = alfabeto
        this.inicial = inicial
        this.finais = finais
        this.alfabetoPilha = pilha_stuff

        this.display = new DisplayController(inicial)

    }

    /**
     * Recebe uma string e verifica de ela é processada ou não por este automato
     * @param {String} palavra Palavra a ser processada
     * @returns {Boolean}
     */

    ler(palavra){

        this.display.clean()

        var possibilidades = [ [ this.inicial , '' ] ]
        var i = 0

        while(true){

            if(!palavra.length){

                let estados = [this.inicial].concat(this.estados[this.inicial].vazios)
                
                for(let estado of estados)
                    if(this.estados[estado].pileCheck){
                        
                        this.display.success(estado)
                        return true
                    }
                
                this.display.fail(0)
                return false
                

            }

            console.log("Processando a letra", palavra[i]);
            

            let simbolo = palavra[i]
            var novasPossibilidades = []
            var processamentosParaDisplay = []

            for(let p of possibilidades){
                

                let processamento = this.estados[p[0]].ler(simbolo, p[1])

                for(let possibilidade of processamento){
                    console.log(p[0],simbolo,'=>',possibilidade[0],possibilidade[1]);
                    
                    processamentosParaDisplay.push(p.concat(possibilidade))
                    

                    if(!novasPossibilidades.filter((value) => {
                        return possibilidade[0] == value[0] && possibilidade[1]==value[1]
                    }).length) 
                        novasPossibilidades.push(possibilidade)
                    
                }

            }

            this.display.processa(simbolo, processamentosParaDisplay)

            possibilidades = novasPossibilidades

            if(!possibilidades.length) return false

            i++

            if(i == palavra.length){
                for(let possibilidade of possibilidades){
                    
                    let pileCheck = this.estados[possibilidade[0]].pileCheck
                    let pile = possibilidade[1]
                    

                    if(pileCheck && pile == ''){
                        
                        this.display.success(possibilidade[0])
                        return true
                    
                    }
                }

                this.display.fail(0)
                return false
                
            }

        }

    }

}
