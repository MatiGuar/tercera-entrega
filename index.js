class Producto{
    constructor(id,nombre,precio,imagen){
    this.id=id
    this.nombre=nombre
    this.precio=precio
    this.imagen=imagen
    }
    
}

const productos = []

productos.push(new Producto(1, "Melaza de caña",1200, "./assets/images/melaza-de-cania.jpg"))
productos.push(new Producto(2,  "Harina de coca", 1800, "./assets/images/harina-de-roca.jpg"))
productos.push(new Producto(3,  "Cascarilla de arroz", 900,"./assets/images/cascarilla-de-arroz.jfif"))
productos.push(new Producto(4,  "Carbonilla vegetal", 1100,"./assets/images/carbonilla-vegetal.jfif"))
productos.push(new Producto(5,  "Biocarbon activado", 950, "./assets/images/bio-carbon.jfif"))
productos.push(new Producto(6,  "Agua de mar", 1700, "./assets/images/agua-de-mar.jpg"))
productos.push(new Producto(7, "Cera natural", 1000,"./assets/images/cera-natural.jfif"))
productos.push(new Producto(8,"Ormus", 1400,"./assets/images/ormus.jpg"))

const divProductos = document.getElementById('divProductos')
productos.forEach(producto=>{
    divProductos.innerHTML += `
    <div id="${producto.id}" class="card cardProd" >
    <img src=${producto.imagen} >
    <div class="card-body">
    <h4 class="card-title">${producto.nombre}</h4>
    <p class="card-text">${producto.precio}</p>
    <button id=${producto.id} class="btn btn-primary">Añadir</button>
    </div>
    </div>
    `
})

const carrito = JSON.parse(localStorage.getItem('carrito')) || []
const botonesAñadir = document.querySelectorAll('.btn-primary')


botonesAñadir.forEach(boton=>{
    boton.onclick = () => {
        const seleccionado = productos.find((prod) => prod.id === parseInt(boton.id))

        const prodCarrito = { ...seleccionado, cantidad:1}

        const indexCarrito = carrito.findIndex((p)=>p.id === prodCarrito.id)
        if(indexCarrito === -1){
            carrito.push(prodCarrito)
        } else {
            carrito[indexCarrito].cantidad ++
        }
        localStorage.setItem('carrito',JSON.stringify(carrito))
        
    }
})

const botonFinalizar = document.querySelector('#finalizar')
botonFinalizar.onclick = () => {
   const val = carrito.map(p => p.precio * p.cantidad)
   let totalCompra = 0
   val.forEach(valor=>{
        totalCompra += valor
   })
   console.log(val)
   console.log(totalCompra)
}

const containerModal = document.getElementById("container-modal")   
const verCarrito = document.getElementById("verCarrito")
verCarrito.addEventListener("click", () => {

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="header-title-modal">Carrito</h1>
    `
    containerModal.append(modalHeader)

    const botonModal = document.createElement("h1")
    botonModal.innerText = "x"
    botonModal.className = "boton-header-modal"

    modalHeader.append(botonModal)


    
})