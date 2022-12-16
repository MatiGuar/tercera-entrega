
const dibujarCarrito = () => {
    containerVerCarrito.innerHTML = ""
    containerVerCarrito.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="header-title-modal">Carrito</h1>
    `
    containerVerCarrito.append(modalHeader)

    const botonModal = document.createElement("h1")
    botonModal.innerHTML =  `<i data-feather="x-circle"></i>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    ` 
    botonModal.className = "boton-header-modal"

    botonModal.addEventListener("click", () => {
        containerVerCarrito.style.display = "none"
    })

    modalHeader.append(botonModal)
    
    carrito.forEach((producto) => {

        let carritoContent = document.createElement("div")
        carritoContent.className = "carrito-content"
        carritoContent.innerHTML = `
                <img class="img-carrito-content" src="${producto.imagen}">
                <p class="prod-carrito-content">${producto.nombre}</p>
                <p>$${producto.precio}</p>
                <p class="restar-prod"><i data-feather="minus-circle"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </p>
                <p> Cant: ${producto.cantidad}</p>
                <p class="sumar-prod"><i data-feather="plus-circle"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </p>
                <p>Subtotal: $ ${producto.cantidad * producto.precio}</p> 
                <p class= "btn-eliminar-producto"><i data-feather="trash-2"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </p>
                `
        containerVerCarrito.append(carritoContent)
        console.log(carrito.length)
        
        let restarProducto = carritoContent.querySelector(".restar-prod")

        if (producto.cantidad !== 1) {
            restarProducto.addEventListener("click" , () => {
                producto.cantidad--
                saveLocal()
                dibujarCarrito()
                
            })       
        }
        
        
        let sumarProducto = carritoContent.querySelector(".sumar-prod")

        sumarProducto.addEventListener("click" , () => {
            producto.cantidad++
            saveLocal()
            dibujarCarrito()
        })

        let botonEliminar = carritoContent.querySelector(".btn-eliminar-producto")

        botonEliminar.addEventListener("click" , () => {
            eliminarProducto(producto.id)
            saveLocal()
            dibujarCarrito()
        })
    })
    
 
   const val = carrito.map(p => p.precio * p.cantidad)
   let totalCompra = 0
   val.forEach(valor=>{
        totalCompra += valor
   })
   console.log(val)
   console.log(totalCompra)
   const total = document.createElement("div")
   total.className = "total-compra"
   total.innerHTML =  `
    <p><button id="vaciarCarrito" class="btn btn-info vaciar-carrito">Vaciar carrito</button></p>
    <p class="total-compra-text">Total: $ ${totalCompra}</p>
    <p><button id="finalizar" class="btn btn-success btn-finalizar-compra">Finalizar compra</button></p>
    `
   containerVerCarrito.append(total)

   let botonFinalizar = document.getElementById("finalizar")
   botonFinalizar.addEventListener("click" , () =>{
    if(totalCompra === 0){
        Swal.fire({
            title: '¡Ops!',
            text: "Su carrito está vacío. ¡Para comprar, agregue uno o mas productos!",
            icon: 'warning',
      })
        
    } else {
    Swal.fire({
        position: 'mid-end',
        icon: 'success',
        title: '¡Gracias por su compra!',
        showConfirmButton: false,
        timer: 1500
      })
    }
   })

  let vaciarCarrito = document.getElementById("vaciarCarrito")
  vaciarCarrito.addEventListener("click", () => {
   botonVaciarCarrito()


  })


   
}   



verCarrito.addEventListener("click", dibujarCarrito)


const eliminarProducto = (prodId) => {
    const buscarId = carrito.find((e) => e.id === prodId)

    carrito = carrito.filter((carritoFiltrado) => {
        return carritoFiltrado !== buscarId 
    })
    contadorCarrito()
    saveLocal()
    dibujarCarrito()
}


const contadorCarrito = () => {
    cantCarrito.style.display = "block"
    
    const carritoLength = carrito.length

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))

}

contadorCarrito()
