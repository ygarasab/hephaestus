var automat = 0

var autName = document.getElementById('load')
var file = document.getElementById('file')
var log = document.getElementById('log')


function check(e){

    if(e.keyCode == 13){

        if(!automat) console.log("Nenhum autômato definido");

        else{

            let leitura = automat.ler(e.target.value) ? 'aceita' : 'recusada'
            log.innerHTML = `A palavra ${ event.target.value } foi ${leitura}`
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

        for(i of text) trans.push(i.split(', '))

        console.log(stuff, trans)

        automat = new Automaton(stuff[1],stuff[0],stuff[3], stuff[4], stuff[5], trans)
        
        var nome = e.target.value.split('\\')[2].split('.')[0]

        autName.innerHTML = `O autômato ${ nome } foi carregado!`
        
        


    };
    reader.readAsText(input.files[0]);
}
