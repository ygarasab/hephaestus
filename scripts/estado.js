class Estado {
	
 	constructor(transitions) {
		
		let trans;
		
		this.estados = {} //Objetos a serem recebidos 
		
		this.trans = new Map();
		
		this.vazios = []
		
		this.state = transitions[0][0]
        
		for (trans of transitions) 
		{
			if (trans[1] == '-') this.vazios.push(trans[3])
			
			this.trans.set(trans[1], [])
		}		
        
		for (trans of transitions) this.trans.get(trans[1]).push(trans.slice(2))
		
		/* O mapa possui os símbolos lidos como chave e apresenta as transições para eles, mostrando 
		* os respectivos símbolo da pilha a ser lido, estado destino e símbolo a ser escrito na pilha. */
        
		// console.log("Transitions:", this.trans) 
	}
    
	transVazias() { // Função para preencher o atributo 'this.vazios' com os estados atingidos pelo vazio
        
		let tmp = []
		
		while (this.vazios.length > 0)
		{
			if (tmp.indexOf(this.vazios[0]) != -1)	this.vazios.shift();
			else
			{
				for (let estado of this.estados[this.vazios[0]].vazios) if (this.vazios.indexOf(estado) == -1)  this.vazios.push(estado)
					
				tmp.push(this.vazios[0])
				this.vazios.shift()	
		
			}
		}
		
		this.vazios = tmp
        
	}
    
	exec(simbolo, pilha) {  
  
		let aux, add, resultado = []
        
		if (this.trans.has(simbolo)) // Se o estado processar esse símbolo
		{ 
			for (let i=0; i < this.trans.get(simbolo).length; i++) 
			{
				aux = pilha 
				add = this.trans.get(simbolo)[i][2] == '-' ? '' : this.trans.get(simbolo)[i][2] 
			
				if (aux != '-')  // Se tiver algo na pilha
				{  
					// Consumir algo da pilha
					if (aux[0] == this.trans.get(simbolo)[i][0]) resultado.push([this.trans.get(simbolo)[i][1], add + aux.substr(1)])
					// Não consumir nada da pilha
					if (this.trans.get(simbolo)[i][0] == '-') resultado.push([this.trans.get(simbolo)[i][1], add + aux])
				} else {
					// Pilha vazia
					if (this.trans.get(simbolo)[i][0] == '-') resultado.push([this.trans.get(simbolo)[i][1], add])
				}
			}
		} 
        
		return resultado
	        
	}
    
	ler(simbolo, pilha) {
        
		let resultados = []
        
		let done = []
		
		resultados += this.exec(simbolo, pilha)
	
		done.push(this.state)
        
		let aux = this.vazios.slice(0) 
		// Processando no estado atual e nos atingidos pela transição vazia
		while (aux.length > 0)
		{
			if (done.indexOf(aux[0]) != -1)  aux.shift();
			else 
			{
				for (let item of this.estados[aux[0]].vazios)  if (aux.indexOf(item) == -1)  aux.push(item)
                
				// console.log(aux[0] + ".exec('" + simbolo + "', '" + pilha + "')")
				resultados += this.estados[aux[0]].exec(simbolo, pilha)
				
				done.push(aux[0])
				aux.shift()
			}
		
		}
		
		resultados = resultados.filter(e => e.length) // Removendo colchetes vazios
		
		// Deslocando pelo vazio após processar em um estado 
		for (let res of resultados.slice(0))  for (let item of this.estados[res[0]].vazios)  resultados.push([item, res[1]])
		
		resultados = Array.from(new Set(resultados.map(JSON.stringify)), JSON.parse) // Removendo itens repetidos
 
		return resultados
	}
}
