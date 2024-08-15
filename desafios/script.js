/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#Se voce é alguem olhando o codigo fonte, não faça algo que quebre o codigo e faça voce ter vantagem no 
#ranking ou algo assim, não é legal nem justo!
#DESENVOLVIDO POR John 1 TDS "A" ESCOLA TECNICA ESTADUAL DE PALMARES
# DATA DE CRIAÇÃO: 24/05/2024
# DATA DA ULTIMA MODIFICAÇÃO: 09/06/2024
# OUTROS PROJETOS EM: https://github.com/JohnJohn081
# ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄       ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄ 
#▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
#▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀       ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ 
#▐░▌               ▐░▌     ▐░▌                    ▐░▌     ▐░▌       ▐░▌▐░▌          
#▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄           ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
#▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌          ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌
#▐░█▀▀▀▀▀▀▀▀▀      ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀           ▐░▌     ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌
#▐░▌               ▐░▌     ▐░▌                    ▐░▌     ▐░▌       ▐░▌          ▐░▌
#▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄           ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌
#▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌          ▐░▌     ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
# ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀            ▀       ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  

-->*/

const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option-btn');
const timerElement = document.getElementById('timer');
const hintElement = document.getElementById('hint');
const name = localStorage.getItem('userName');
const userClass = localStorage.getItem('turmaUser');
let acessoPag = localStorage.getItem('acessoPag', 'true') === 'true'; // dá o acesso para pagina1
let respondeu = false; 
let score = parseInt(localStorage.getItem('userScore')) || 0;
let timer; // Variável para armazenar o timer
let timeLeft = 60; // 1 minuto para cada pergunta
let dicas = 3; // quantidade de dicas
let usouDica = 'false'; // variavel utilizado na função getHint(Dica)

const firebaseConfig = {
    apiKey: "AIzaSyCOelUPm8hx-vFg0Cr5SjVv_mLrJcrn_Ys",
    authDomain: "ete-john-quimica.firebaseapp.com",
    projectId: "ete-john-quimica",
    storageBucket: "ete-john-quimica.appspot.com",
    messagingSenderId: "929948681469",
    appId: "1:929948681469:web:8ace4d8e7063de3a1b2a94"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Respostas do quiz e o sistema que carrega ele, facilmente acessado pelo Aluno caso tenha conhecimento necessario para tal ato
const questions = [
    {
        "question": "Qual é o elemento químico mais abundante no universo?",
        "options": ["A) Oxigênio", "B) Carbono", "C) Hidrogênio", "D) Nitrogênio"],
        "answer": "C",
        "hint": "É o elemento mais leve e o primeiro na tabela periódica."
    },
    {
        "question": "Qual é o nome do processo que separa os componentes de uma mistura homogênea?",
        "options": ["A) Decantação", "B) Destilação", "C) Filtração", "D) Peneiração"],
        "answer": "B",
        "hint": "É um método que envolve a vaporização e condensação dos componentes."
    },
    {
        "question": "O que é uma ligação iônica?",
        "options": ["A) Ligação entre dois metais", "B) Ligação entre ametais", "C) Ligação entre átomos de oxigênio", "D) Ligação entre metais e ametais"],
        "answer": "D",
        "hint": "Ocorre entre átomos que possuem grande diferença de eletronegatividade."
    },
    {
        "question": "Qual é a definição de átomo?",
        "options": ["A) Um agrupamento de prótons e nêutrons", "B) A menor partícula de uma substância que ainda retém as suas propriedades químicas", "C) Um conjunto de moléculas", "D) A unidade básica das células"],
        "answer": "B",
        "hint": "É a unidade fundamental da matéria."
    },
    {
        "question": "O que é uma reação química?",
        "options": ["A) Uma mudança de estado físico", "B) Uma transformação de energia em matéria", "C) Um processo onde novas substâncias são formadas", "D) Uma mistura de substâncias sem alteração química"],
        "answer": "C",
        "hint": "Envolve a quebra e formação de ligações químicas."
    },
    {
        "question": "O que é uma solução?",
        "options": ["A) Um composto puro", "B) Um tipo de elemento químico", "C) Uma mistura heterogênea", "D) Uma mistura homogênea de duas ou mais substâncias"],
        "answer": "D",
        "hint": "Pode ser sólida, líquida ou gasosa."
    },
    {
        "question": "O que é o pH?",
        "options": ["A) Concentração de sais em uma solução", "B) Quantidade de matéria em uma solução", "C) Medida de acidez ou basicidade de uma solução", "D) Energia total de uma substância"],
        "answer": "C",
        "hint": "Determina se uma solução é ácida, neutra ou básica."
    },
    {
        "question": "O que ocorre durante a eletrólise da água?",
        "options": ["A) Separação da água em oxigênio e hidrogênio", "B) Transformação da água em gelo", "C) Evaporação da água", "D) Neutralização da água"],
        "answer": "A",
        "hint": "É um processo que envolve corrente elétrica."
    },
    {
        "question": "Qual é a principal característica dos metais?",
        "options": ["A) Não conduzem eletricidade", "B) São sempre líquidos", "C) Conduzem eletricidade e calor", "D) São gases à temperatura ambiente"],
        "answer": "C",
        "hint": "Eles possuem alta condutividade e brilho metálico."
    },
    {
        "question": "Qual é a fórmula química da água?",
        "options": ["A) CO₂", "B) O₂", "C) H₂", "D) H₂O"],
        "answer": "D",
        "hint": "É composta por dois átomos de hidrogênio e um de oxigênio."
    },
    {
        "question": "O que são isótopos?",
        "options": ["A) Átomos de elementos diferentes com o mesmo número de elétrons", "B) Átomos do mesmo elemento com diferente número de nêutrons", "C) Moléculas com diferentes números de prótons", "D) Moléculas com a mesma massa"],
        "answer": "B",
        "hint": "Eles têm o mesmo número de prótons, mas diferente massa atômica."
    },
    {
        "question": "Qual é o principal gás responsável pelo efeito estufa?",
        "options": ["A) Oxigênio (O₂)", "B) Nitrogênio (N₂)", "C) Hélio (He)", "D) Dióxido de carbono (CO₂)"],
        "answer": "D",
        "hint": "É um gás liberado na queima de combustíveis fósseis."
    },
    {
        "question": "O que é uma reação de oxidação?",
        "options": ["A) Reação em que uma substância perde elétrons", "B) Reação que ocorre sem alteração de elétrons", "C) Reação que forma gás oxigênio", "D) Reação em que uma substância ganha elétrons"],
        "answer": "A",
        "hint": "Está frequentemente associada à corrosão de metais."
    },
    {
        "question": "O que é a tabela periódica?",
        "options": ["A) Um gráfico que mostra as reações químicas", "B) Um sistema de classificação dos elementos químicos", "C) Uma lista de compostos químicos", "D) Um conjunto de fórmulas químicas"],
        "answer": "B",
        "hint": "Organiza os elementos com base em suas propriedades químicas."
    },
    {
        "question": "O que é uma ligação covalente?",
        "options": ["A) Transferência de elétrons entre átomos", "B) Compartilhamento de pares de elétrons entre átomos", "C) Ligação entre dois íons", "D) Ligação entre dois metais"],
        "answer": "B",
        "hint": "Ocorre principalmente entre átomos de ametais."
    }
    
    
];

let currentQuestionIndex = 0;

// Função que carrega a proxima pergunta
function loadQuestion() {
    respondeu = false; 
    timeLeft = 60; // Reinicia o tempo
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    hintElement.textContent = "";
    

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
    startTimer();
}

// Função para iniciar e atualizar o cronômetro a cada segundo
function startTimer() {
    clearInterval(timer);
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                    
                } else {
                    localStorage.setItem('acessoPag', 'false');
                    addToRanking(name, userClass, score);
                    mostrarNotificacao("Pontuação registrada com Sucesso!");
                }
            }, 1000);
        }
    }, 1000);
}

// função que verifica se a resposta é certa ou não
function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.option-btn:hover');
    clearInterval(timer); // Para o cronômetro quando uma resposta é verificada

    if (!respondeu) { 
        respondeu = true; 

        if (answer === currentQuestion.answer) {
            selectedOption.classList.add('correto');
            score += 1; // Adiciona pontos se a resposta estiver correta
            usouDica = 'false';
        } else {
            selectedOption.classList.add('errado');
            usouDica = 'false';
        }

        localStorage.setItem('userScore', score); 

        setTimeout(() => {
            selectedOption.classList.remove('correto', 'errado');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // chama a função que carrega a proxima pergunta
                mostrarNotificacao(currentQuestionIndex + "/15")                
            } else {
                localStorage.setItem('acessoPag', 'false');
                addToRanking(name, userClass, score);
                mostrarNotificacao("Pontuação registrada com Sucesso!");
            }
        }, 1000);
    }
}

// não utilize "/" dentro do seu userName pois isso vai causar um erro de document no firebase!
// função pra adicionar o User e seu Score na firebase. 
function addToRanking(name, userClass, score) {
    localStorage.setItem('userName', name);
    localStorage.setItem('turmaUser', userClass);
   db.collection("ranking").doc(name).set({ 
        name: name,
        class: userClass,
        score: score
    }).then((docRef) => {
        console.log("Pontuação adicionada com sucesso!");

        localStorage.setItem('acessoPag', 'false')
        window.location.href = '/../finalPage/home.html'; 
    }).catch((error) => {
        console.error("Erro ao adicionar pontuação: ", error);

    });
}    

function mostrarNotificacao(mensagem) {
    const notificacao = document.getElementById('notification');
    notificacao.innerText = mensagem;
    notificacao.className = 'notification show';
    setTimeout(() => {
        notificacao.className = notificacao.className.replace('show', '');
    }, 3000);
}


// função para dicas ()
function getHint() {
    if (usouDica === 'false'){
         if (dicas > 0){
            const currentQuestion = questions[currentQuestionIndex];
            hintElement.textContent = currentQuestion.hint; // Exibe a dica
            usouDica = 'true'; // variavel pra ele não flodar dica e perder todas as dicas
            dicas -= 1; // variavel dica sendo modificada para o valor atual
            mostrarNotificacao('Dicas' + dicas + '/3') 
            localStorage.setItem('userScore', score); // Atualiza o score no localStorage      
        }
        else{
            mostrarNotificacao("Voce já utilizou todas as dicas");
        }
    }
    else{
        console.log('voce ja utilizou dica');
    }
}


// verificação basica verificar acesso que só é consedido após o usuario clicar no botão iniciar submitBtn
if (!acessoPag) {
    alert('Usuario já respondeu a pergunta, clique em OK para iniciar o quiz');
    window.location.href = '/../../index.html'; 
} else {
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (!respondeu) { 
                checkAnswer(option.textContent.charAt(0)); 
                respondeu = true; 
            }
        });
    });  

    loadQuestion();
}

window.onload = localStorage.setItem('userScore', 0), score = 0; // Atualiza o score no localStorage     