// --- CONTROLE DE FONTE ---
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;

const btnAumentaFonte = document.getElementById("btnAumentaTexto");
const btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

btnAumentaFonte.addEventListener("click", aumentaFonte);
btnDiminuiFonte.addEventListener("click", diminuiFonte);

function aumentaFonte() {
    tamanhoFonteAtual += valorAdicionado;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

function diminuiFonte() {
    if (tamanhoFonteAtual > 10) { // Limite mínimo para manter legibilidade
        tamanhoFonteAtual -= valorSubtraido;
        document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
    }
}

// --- LEITURA DE TELA (SPEECH SYNTHESIS) ---
let lendo = false;
const btnLeitura = document.getElementById("btnVoz");
const btnParar = document.getElementById("btnPararVoz");

btnLeitura.addEventListener("click", lerEmVozAlta);
btnParar.addEventListener("click", pararLeitura);

function lerEmVozAlta() {
    if (lendo) {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
            btnLeitura.innerText = "⏸️ Pausar";
        } else {
            speechSynthesis.pause();
            btnLeitura.innerText = "▶️ Continuar";
        }
        return;
    }

    const conteudo = document.querySelector("main");
    const texto = conteudo.innerText;

    if (!texto.trim()) return;

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";

    fala.onend = finalizarLeitura;
    fala.onerror = finalizarLeitura;

    speechSynthesis.cancel(); // Limpa qualquer leitura pendente
    speechSynthesis.speak(fala);

    lendo = true;
    btnLeitura.innerText = "⏸️ Pausar";
}

function pararLeitura() {
    speechSynthesis.cancel();
    finalizarLeitura();
}

function finalizarLeitura() {
    lendo = false;
    btnLeitura.innerText = "🔊 Ouvir Página";
}