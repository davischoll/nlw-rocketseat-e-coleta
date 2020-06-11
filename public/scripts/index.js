const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const fechar = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", function(){
    modal.classList.remove("hide");
});

fechar.addEventListener("click", function(){
    modal.classList.add("hide");
});