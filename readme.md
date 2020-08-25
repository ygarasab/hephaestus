# Hephæstus

*Hephaestus* (em português, Hefesto) é o deus das forjas, dos metais e do fogo na mitologia grega. Segundo a mesma, *Hephaestus* foi o primeiro construtor de autômatos da história, construindo com bronze celestial autômatos responsáveis por tarefas básicas ou destinados à ornamentação. 

Por esse motivo, *Hephaestus* foi o nome adotado para este **simulador de autômatos com pilha**. Este projeto tem como objetivo reproduzir de maneira prática o processamento de palavras no autômato com pilha conforme visto na disciplina *Linguagens Formais, Autômatos e Computabilidade* do curso de Bacharelado em Ciência da Computação da Universidade Federal do Pará (UFPA). 

### Como utilizá-lo
Para iniciar o processamento, deve-se clicar no botão "Carregue seu autômato!" e carregar um arquivo .txt com a 6-upla do autômato e sua função de transição, conforme o formato abaixo: 
```
({a, b}, {q0, q1, qf}, D, q0, {qf}, {a, b})
q0, a, -, q0, a
q0, b, -, q0, b
q0, -, -, q1, -
q1, a, a, q1, -
q1, b, b, q1, -
q1, ?, ?, qf, -
```
Feito isso, basta digitar a palavra a ser processada no campo "Digite sua entrada aqui!" e apertar enter. 


O resultado indicará se a palavra foi aceita ou recusada pelo autômato carregado. Todas as linhas de processamento possíveis (incluindo os caminhos incorretos) e as respectivas pilhas serão exibidas. 

Você pode ter acesso ao Hephaestus [aqui](https://ygarasab.github.io/hephaestus/). Divirta-se!
