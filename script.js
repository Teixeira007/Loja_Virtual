
//Criando Objetos que será os intens a venda
const items =[
    {
        id: 0,
        name: 'Natura Homem',
        quantity: 0,
        price: 134.91,
        img: 'imagens/natura-homem.jpg'
    },
    {
        id: 1,
        name: 'Essencial Masculino',
        quantity: 0,
        price: 129.91,
        img: 'imagens/essencial-masculino.jpg'
    },
    {
        id: 2,
        name: 'Meu Primeiro Humor',
        quantity: 0,
        price: 109.91,
        img: 'imagens/meu-primeiro-humor.jpg'
    },
    {
        id: 3,
        name: 'KAIAk Aero Masculino',
        quantity: 0,
        price: 124.91,
        img: 'imagens/kaiak.jpg'
    },
    {
        id: 4,
        name: 'Essencial Exclusivo',
        quantity: 0,
        price: 196.01,
        img: 'imagens/essencial-exclusivo.jpg'
    },
    {
        id: 5,
        name: 'Àlcool em Gel - Erva Doce 70 INPM',
        quantity: 0,
        price: 19.91,
        img: 'imagens/erva-doce-alcool-gel.jpg'
    },
    {
        id: 6,
        name: 'Sabonete Mamãe e Bebe',
        quantity: 0,
        price: 23.91,
        img: 'imagens/sabonete-mamae-e-bebe.jpg'
    },
    {
        id: 7,
        name: 'Sabonete Algodão Tododia',
        quantity: 0,
        price: 20.91,
        img: 'imagens/sabonete-algodao-tododia.jpg'
    }
]
//inicializando a loja INICIO => INICIALIZAR LOJA
inicializarLoja = () => {
    var containerProducts = document.getElementById('products');
    for(let val of items){
        //Adicionando os itens no HTML
        containerProducts.innerHTML += `
            <div class="card-products">
                <div class="wraper"><img src="`+val.img+`" alt="Sabonete Mamãe e Bebe"></div>
                <div class="card-info">
                    <p class="name-product">`+val.name+`</p>
                    <p class="price">R$ `+val.price+`</p>
                    <a href="#" key="`+val.id+`" class="btn-buy">Comprar<i class="fa fa-shopping-cart"></i></a>
                </div>
            </div>
        `
    }
}
//FIM => INICIALIZAR LOJA

inicializarLoja()
//Adiciona os itens no carrinho - INICIO => ATUALIZAR CARRINHO
atualizarCarrinho = () =>{
    var containerCart = document.getElementById('cart')
    var asideCart = document.getElementById('aside-cart')
    var signal = document.getElementsByClassName("signal")[0]
    containerCart.innerHTML = ""
    items.map((val)=>{  //map é uma função que funciona +- como uma laço
        if(val.quantity > 0){
            containerCart.innerHTML +=`
                <div id="cart-products" class="cart-products">
                    <div class="cart-wraper">
                        <img src="`+val.img+`" alt="">
                    </div>
                    <p class="cart-name">`+val.name+`</p>
                    <a href="#" data-id="${val.id}" class="cart-trash"><i class="fa fa-trash"></i></a>
                    <div class="cart-quantity">
                        <input type="button"  data-id="${val.id}" value="-" class="remove-item side-quantity">
                        <input class="middle-quantity" data-id="${val.id}" value="`+val.quantity+`" type="number" name="input-quantity">
                        <input type="button" data-id="${val.id}" value="+" class="add-item side-quantity">
                    </div>
                    <p data-id="${val.id}"class="cart-price">R$ `+(val.price*val.quantity).toFixed(2)+`</p>   
                </div>
                <div id="footer-products" class="footer-products">
                    <div class="footer-products-info">
                        <span>Total</span>
                        <span id="quantity-total"></span>
                    </div>
                    <div class="footer-products-btn">
                        <button id="btn-enviar">Finalizar Pedido <i class="fa fa-arrow-right"></i></button>
                    </div>
                </div>
                <div class="signal-1" id="signal">  
                    <div id="signal-quantity" class="signal-quantity"></div>
                    
                </div>
            `     

            asideCart.style.height = "85vh"

            //Função que passa uma chave inicializando do 0 para os produtos
            let input = document.getElementsByClassName('middle-quantity') 
            idQuant = 0
            for(let i=0;i<input.length;i++){
                input[i].setAttribute("data-id-key", idQuant)
                idQuant++
            }

            //Função para adicionar item no carrinho pelo butão de (+)
            let addItem = document.getElementsByClassName("add-item")
            for(j=0;j<addItem.length;j++){
                addItem[j].addEventListener('click', function(){
                    let key = this.getAttribute('data-id')
                    items[key].quantity++
                    atualizarCarrinho()
                })
            }

            //Função para remover item do carrinho pelo butão (-)
            let removeItem = document.getElementsByClassName('remove-item')
            for(i=0;i<removeItem.length;i++){
                removeItem[i].addEventListener('click', function(){
                let key = this.getAttribute('data-id')
                items[key].quantity--
                atualizarCarrinho()
                })
            }

            //Função para pegar o valor do input que a pessoa digitar
            for(k=0;k<input.length;k++){
                input[k].addEventListener("change", function(){
                    let key = this.getAttribute('data-id')
                    let idKey = this.getAttribute('data-id-key')
                    items[key].quantity = parseInt(input[idKey].value)
                    atualizarCarrinho()
                })
            }

            //Função para apagar todos os items do msm ao selecionar a Lixeira
            let trash = document.getElementsByClassName('cart-trash')
            for(let i=0;i<trash.length;i++){
                trash[i].addEventListener('click', function(){
                    let key = this.getAttribute('data-id')
                    items[key].quantity = 0
                    atualizarCarrinho()
                    return false
                })
            }

            //calcular a soma do preço da compra
            var totalPrice = items.reduce(getTotalPrice, 0)
            function getTotalPrice(totalPrice, item) {
                return totalPrice + (item.price * item.quantity)
            }

            //exibir a soma do preço da compra
            let totalQuantity = document.getElementById('quantity-total')
            var footerProducts = document.getElementById('footer-products')
            footerProducts.style.display = 'block'
            totalQuantity.innerHTML = `R$ ${totalPrice.toFixed(2)}`

            //calcular a quantidade de produtos no carrinho
            var quantityTotal = items.reduce(getTotalQuantity, 0)
            function getTotalQuantity(quantityTotal, item){
                return quantityTotal + (item.quantity)
            }

            //exibir a quantidade total de itens no carrinho
            if (quantityTotal != 0){
                var signalQuantity = document.getElementById('signal-quantity')
                signalQuantity.style.display="flex"
                signalQuantity.innerHTML = `${quantityTotal}`
            }
        }
    })
}
//FIM => ATUALIZAR CARRINHO


//INÍCIO CAMPO BUSCA
const search = document.getElementById('search-input')
const list = document.getElementById('list-search')
var containerProducts = document.getElementById('products');


search.addEventListener('keyup', function(event){

    /*filtra os valores que o usuário digitou no campo busca de acordo com
    a lista de produtos*/
    const productsSearch = items.filter(value => {
        let valueUpper = this.value.toUpperCase()
        value.name = value.name.toUpperCase()
            
        return value.name.indexOf(valueUpper) !== -1
            
    })

    //se a busca for realizada com sucesso
    if (productsSearch.length >= 1){
        let title = document.getElementById('title-products')
        title.innerHTML = ""
        containerProducts.innerHTML = ""
        if(this.value != ""){
            title.innerHTML += `
            <div class="search-true">
                <h3>Você busca por "${this.value}"</h3>
                <span>Resultados encontrados (${productsSearch.length})</span>
            </div>
            `
        }
    }else{

        //se a busca não for realizada com sucesso
        containerProducts.innerHTML = ""
        let title = document.getElementById('title-products')
        title.style.display = "none"
        containerProducts.innerHTML += `
            <div class="search-false">
                <h3>Nenhum resultado para "${this.value}"</h3>
                <span>Tente verificar a ortografia ou usar termos mais genéricos</span>
            </div>
        `
    }

    //mostrar os produtos encontrados se for realizada com sucesso
    for(let products of productsSearch){
        let title = document.getElementById('title-products')
        title.style.display = "block"
        containerProducts.innerHTML += `
            <div class="card-products">
                <div class="wraper"><img src="`+products.img+`" alt="Sabonete Mamãe e Bebe"></div>
                <div class="card-info">
                    <p class="name-product">`+products.name+`</p>
                    <p class="price">R$ `+products.price+`</p>
                    <a href="#" key="`+products.id+`" class="btn-buy">Comprar<i class="fa fa-shopping-cart"></i></a>
                </div>
            </div>
        `
    }

    //Chamando função de adiciona ao carrinho para os produtos da busca
    AddCart()

})
//FIM CAMPO BUSCA

//INICIO ADICIONAR AO CARRINHO
AddCart = () =>{
    var links = document.getElementsByClassName('btn-buy')
    for(let i=0; i<links.length; i++){
    //evento para quando o botão de comprar for acionado
        links[i].addEventListener('click', function(){
            let key = this.getAttribute('key')
            items[key].quantity++ //incrementando a quantidade do item utilizando o id que está no atributo key
            atualizarCarrinho()
            return false
        })
    }
}
//FIM ADICIONAR AO CARRINHO
AddCart()

// Função para abrir o aside-cart 
document.getElementById('btn-cart').addEventListener('click', function(){
    document.querySelector('.container').classList.toggle('show-cart')
})

//função para esconder o scroll-y da página principal
document.getElementById('btn-cart').addEventListener('click', function(){
    document.querySelector('.every').classList.toggle('hidden-scroll')
})

//função para fechar o aside-cart
document.getElementById('icon-close').addEventListener('click', function(){
    document.querySelector('.container').classList.toggle('show-cart')
})

//função para mostrar o scroll-y da página principal
document.getElementById('icon-close').addEventListener('click', function(){
    document.querySelector('.every').classList.toggle('hidden-scroll')
})
