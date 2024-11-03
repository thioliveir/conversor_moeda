// Cotação de moedas do dia
const USD = 5.68
const EUR = 6.17
const JPY = 0.038
const ARS = 0.0058
const CNY = 0.80


// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.getElementById("result")

// Manipulando o input amount para recerber somente números
amount.addEventListener("input", () => {
    const hasCaractereRegex = /\D+/g
    amount.value = amount.value.replace(hasCaractereRegex, "")
})

// Capturando o evento de submit (enviar) do formulário
form.onsubmit = function(event) {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "JPY":
            convertCurrency(amount.value, JPY, "¥")
            break
        case "ARS":
            convertCurrency(amount.value, ARS, "$")
            break
        case "CNY":
            convertCurrency(amount.value, CNY, "¥")
            break
    }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    // Atualizando o conteudo do span do footer
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Criando variavel total e multiplicando o valor do input pela cotação 
    let total = amount * price


    // Se o resultado nao for um número exibirá tela para tentar novamente
    if(isNaN(total)){
        return alert("Digite somente números")
    }

    // Formatar o valor total
    total = formatCurrencyBRL(total).replace("R$", "")

    // Exibindo o resultado total
    result.textContent = `${total} Reais`
    
    
    try {
        // Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")
    } catch (error) {
        footer.classList.remove("show-result")
        // Remove a classe do footer, removendo-o
        console.log(error)
        alert("Não foi possivel converter. Tente daqui alguns minutos")
    }


}

// Função para retornar o simbolo real no resultado da cotação da moeda
function formatCurrencyBRL(value) {
    // Converte em número para utilizar o toLocaleString para formatar o padrão BRL.
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

