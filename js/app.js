class Producto{
    constructor(id,nombre,precio,imagen,){
    this.id=id
    this.nombre=nombre
    this.precio=precio
    this.imagen=imagen
    }
    
}

const productos = []

productos.push(new Producto(1, "Melaza de caña",1200, "../assets/images/melaza-de-cania.jpg"))
productos.push(new Producto(2,  "Harina de roca", 1800, "../assets/images/harina-de-roca.jpg"))
productos.push(new Producto(3,  "Cascarilla de arroz", 900,"../assets/images/cascarilla-de-arroz.jfif"))
productos.push(new Producto(4,  "Carbonilla vegetal", 1100,"../assets/images/carbonilla-vegetal.jfif"))
productos.push(new Producto(5,  "Biocarbon activado", 950, "../assets/images/bio-carbon.jfif"))
productos.push(new Producto(6,  "Agua de mar", 1700, "../assets/images/agua-de-mar.jpg"))
productos.push(new Producto(7, "Cera natural", 1000,"../assets/images/cera-natural.jfif"))
productos.push(new Producto(8,"Ormus", 1400,"../assets/images/ormus.jpg"))



const divProductos = document.getElementById('divProductos')
productos.forEach(producto=>{
    divProductos.innerHTML += 
    `
    <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
        <div id="${producto.id}" class="card d-flex align-items-center card-style" style="width: 18rem;">
            <h5 class="card-title d-flex row justify-content-center nombre-producto">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <img class="container-img" src="${producto.imagen}">
            <div class="card-body">
                 <button id=${producto.id} class="btn btn-primary btn-agregar-producto">Añadir</button>
                 
            </div>     
        </div>
    </div>
    `
})


let carrito = JSON.parse(localStorage.getItem('carrito')) || []
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
        console.log(carrito)
        contadorCarrito() 
    }
    
})

const saveLocal = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

/* const botonFinalizar = document.querySelector('#finalizar')
botonFinalizar.onclick = () => {
   /* const val = carrito.map(p => p.precio * p.cantidad)
   let totalCompra = 0
   val.forEach(valor=>{
        totalCompra += valor
   })
   console.log(val)
   console.log(totalCompra)
   const total = document.getElementById('totalCompra')
   total.innerHTML +=  `
    <p class="total-compra-text">Total: $ ${totalCompra}</p>` 

} */

const containerVerCarrito = document.getElementById("containerVerCarrito")   
const verCarrito = document.getElementById("verCarrito")
const cantCarrito = document.getElementById("cantCarrito")


let botonVaciarCarrito = () => {

    const vaciarCarrito = document.getElementById("vaciarCarrito")
    vaciarCarrito.addEventListener("click", () => {
    localStorage.clear()
})

}



feather.replace()
