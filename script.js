
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
//inicializando a loja
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

inicializarLoja()
//Adiciona os itens no carrinho
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
                    <a href="#" class="cart-trash"><i class="fa fa-trash"></i></a>
                    <input chave="`+val.id+`" class="cart-quantity" value="`+val.quantity+`" type="number" name="input-quantity">
                    <p class="cart-price">R$ `+val.price*val.quantity+`</p>   
                </div>
                <div class="footer-products">
                <div class="footer-products-info">
                    <span>Total</span>
                    <span id="quantity-total">R$ ${quantityTotal}  </span>
                </div>
                <div class="footer-products-btn">
                    <button id="btn-enviar">Finalizar Pedido <i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
            `     
            asideCart.style.height = "85vh"  
        }
    })
    //mostra a quantidade total de itens sobre o carrinho
    if (quantityTotal != 0){
        var signalQuantity = document.getElementById('signal-quantity')
        console.log(signalQuantity)
        signalQuantity.style.display="flex"
        signalQuantity.innerHTML = `${quantityTotal}`
    }
} 
    /*incrementa quantityTotal a cada click no botão comprar, para saber quantos produtos
    o cliente tem no carrinho*/
    let quantityTotal = 0
    var link = document.getElementsByClassName('btn-buy')
    for(let i=0; i<link.length;i++){
        link[i].addEventListener('click', function(){
            quantityTotal++
            return quantityTotal
        })
    }

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
