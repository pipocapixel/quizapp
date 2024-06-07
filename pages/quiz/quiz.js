import { trocarTema, verificarTema } from '../../helpers/tema-helper.js'

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")

let quiz = {}
let pontos = 0
let pergunta = 1

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

verificarTema(body, botaoTema)

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone")
    const iconeImg = document.querySelector(".assunto_icone img")
    const assuntoTitulo = document.querySelector(".assunto h1")


    divIcone.classList.add(assunto.toLowerCase())
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`)
    iconeImg.setAttribute("alt", `ícone de ${assunto}`)
    assuntoTitulo.innerText = assunto
}



async function buscarPerguntas() {
    const urlDados = "../../data.json"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dado.title === assunto) {
                quiz = dado
            }
        })
    })
}




function montarPergunta(){
    const main = document.querySelector("main")

    main.innerHTML = `
        <section class="pergunta">
                <div>
                <p>Questao ${pergunta} de 10</p>

                
                <h2>Qual o significado de HTML?</h2>
                </div>
                <div class="barra_progresso">
                    <div></div>
                </div>
            </section>
            <section class="alternativas">
                <form action="">
                    <label for="alternativa_a" id="correta">
                        <input type="radio" id="alternativa_a" name="alternativa">

                        <div>
                            <span>A</span>
                            Hyper Trainer Marking Language
                        </div>
                    </label>
                    <label for="alternativa_b" id="errada">
                        <input type="radio" id="alternativa_b"name="alternativa">

                        <div>
                            <span>B</span>
                            Hyper Text Marketing Language
                        </div>
                    </label>
                    <label for="alternativa_c">
                        <input type="radio" id="alternativa_c"name="alternativa">

                        <div>
                            <span>C</span>
                            Hyper Text Markup Language
                        </div>
                    </label>
                    <label for="alternativa_d">
                        <input type="radio" id="alternativa_d"name="alternativa">

                        <div>
                            <span>D</span>
                            Hyper Text Markup Leveler
                        </div>
                    </label>
                </form>

                <button>Enviar</button>
            </section>`
}



async function iniciar() {
    alterarAssunto()
    await buscarPerguntas()
    montarPergunta()
}
iniciar()