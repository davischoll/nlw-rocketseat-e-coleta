
function popularUfs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then( estados => {

        for (const estado of estados){
            ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
        }

    } )
}

popularUfs();

function buscarCidades(event){
    const cidadeSelect = document.querySelector("select[name=city");
    const estadoInput = document.querySelector("input[name=estado");

    const ufValue = event.target.value;

    const indexOfSelectedEstado = event.target.selectedIndex
    estadoInput.value = event.target.options[indexOfSelectedEstado].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    cidadeSelect.innerHTML = "<option value>Selecione a Cidade</option>";
    cidadeSelect.disabled = true;

    fetch(url)
    .then( (res) => { return res.json() })
    .then( cidades => {

        for (const cidade of cidades){
            cidadeSelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }

        cidadeSelect.disabled = false;

    } )    
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", buscarCidades)

    //ITENS DE COLETA

const itensParaColeta = document.querySelectorAll(".items-grid li")   // Pegar todos os li's.

for (const item of itensParaColeta){
    item.addEventListener("click", handleSelectedItem)
}

const itensColetados = document.querySelector("input[name=itens]");

let selectedItens = []

function handleSelectedItem(event){
    const itemLi = event.target

    itemLi.classList.toggle("selected")    // Adiciona ou remove a classe "selected" ao item clicado.

    const itemId = itemLi.dataset.id;



/* Verificar se existem itens selecionados. Se sim, pegar os itens selecionados */

    const alreadySelected = selectedItens.findIndex( function(item) {
        const itemFound = item == itemId    // Isso será true ou false. Então colocará na variável ou tirará
        return itemFound
    })

    if (alreadySelected >= 0){
        const filteredItens = selectedItens.filter (function(item) {
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })

        selectedItens = filteredItens;
    } else {
        selectedItens.push(itemId);
    }

    itensColetados.value = selectedItens;
}