
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
        name: 'KAIAk Aero masculino',
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
                    console.log(items.quantity)
                    items[key].quantity = 0
                    atualizarCarrinho()
                    return false
                })
            }
            /*incrementa quantityTotal a cada click no botão comprar, para saber quantos 
            produtos o cliente tem no carrinho, soma todas as quantidades incrementadas pelos
            botões ou pelo input*/

            quantityTotal = 0
            for(k=0;k<input.length;k++){
                quantityTotal += parseInt(input[k].value)
            }
            priceTotal = 0
            let priceP = document.getElementsByClassName("cart-price")
            for(i=0;i<priceP.length;i++){
                let priceI = (priceP[i].innerText).substr(3 , 9)
                priceTotal += parseFloat(priceI)
                console.log(priceTotal)
            }
        }
    })
    //mostra a quantidade total de itens sobre o carrinho
    if (quantityTotal != 0){
        var signalQuantity = document.getElementById('signal-quantity')
        signalQuantity.style.display="flex"
        signalQuantity.innerHTML = `${quantityTotal}`
    }
    //mostrar a soma total da compra
    if (priceTotal != 0){
        let totalQuantity = document.getElementById('quantity-total')
        var footerProducts = document.getElementById('footer-products')
        footerProducts.style.display = 'block'
        totalQuantity.innerHTML = `R$ ${priceTotal.toFixed(2)}`
    }else if(quantityTotal == 0){
        footerProducts.style.display = "none"
    }
}
//FIM => ATUALIZAR CARRINHO
    var priceTotal = 0
    var quantityTotal = 0
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
