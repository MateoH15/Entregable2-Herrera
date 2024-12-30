const containerTarjetas = document.querySelector('.container-productos')

function crearTarjetasProductos(productos) {
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div")
        nuevoProducto.classList = "tarjeta-producto"
        nuevoProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.img}">
        <p>$ ${producto.precio}</p>
        <button>Agregar al carrito</button>
        `
        containerTarjetas.appendChild(nuevoProducto)
        nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto))
    })
}

const productos = [
    {
        id: 1,
        nombre: "Iphone 13",
        img: "https://th.bing.com/th/id/R.e3e9f37c1dfbfe04d0b96be04e1d3d39?rik=LycZ%2bRcWspaLtQ&pid=ImgRaw&r=0",
        precio: 700
    },
    {
        id: 2,
        nombre: "Iphone 14",
        img: "https://th.bing.com/th/id/R.e3e9f37c1dfbfe04d0b96be04e1d3d39?rik=LycZ%2bRcWspaLtQ&pid=ImgRaw&r=0",
        precio: 900
    },
    {
        id: 3,
        nombre: "Iphone 15",
        img: "https://th.bing.com/th/id/R.e3e9f37c1dfbfe04d0b96be04e1d3d39?rik=LycZ%2bRcWspaLtQ&pid=ImgRaw&r=0",
        precio: 1100
    },
    {
        id: 4,
        nombre: "Iphone 16",
        img: "https://th.bing.com/th/id/R.e3e9f37c1dfbfe04d0b96be04e1d3d39?rik=LycZ%2bRcWspaLtQ&pid=ImgRaw&r=0",
        precio: 1300
    }
]

crearTarjetasProductos(productos)


function agregarAlCarrito(producto) {

    const memoria = JSON.parse(localStorage.getItem("productos")) || []

    const indiceProducto = memoria.findIndex(productoMemoria => productoMemoria.id === producto.id)

    if (indiceProducto === -1) {
        memoria.push(getNuevoProductoParaMemoria(producto))
    } else {
        memoria[indiceProducto].cantidad++
    }

    localStorage.setItem("productos", JSON.stringify(memoria))

    containerTarjetasCarrito.innerHTML = ""
    crearTarjetasProductosCarrito()

    totalPrecio()
}

document.addEventListener("DOMContentLoaded", () => {
    crearTarjetasProductosCarrito()
})

function getNuevoProductoParaMemoria(producto) {
    return {
        id: producto.id,
        nombre: producto.nombre,
        img: producto.img,
        precio: producto.precio,
        cantidad: 1
    };
}

const containerTarjetasCarrito = document.querySelector('.productos-del-carrito')

function crearTarjetasProductosCarrito() {
    const productosEnCarrito = JSON.parse(localStorage.getItem("productos"))
    console.log(productosEnCarrito)

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        productosEnCarrito.forEach(producto => {
            const nuevoProducto = document.createElement("div")
            nuevoProducto.classList = "tarjeta-producto-carrito"
            nuevoProducto.innerHTML = `
                <h3>${producto.nombre}</h3>
                <img src="${producto.img}">
                <p>$ ${producto.precio}</p>
                <div>
                    <span class="cantidad">Cantidad: ${producto.cantidad}</span>
                    <button>Eliminar productos</button>
                </div>
            `
            containerTarjetasCarrito.appendChild(nuevoProducto);
            nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => eliminarDelCarrito(producto.id))

        })
    }
}

function eliminarDelCarrito(idProducto) {
    const productosEnCarrito = JSON.parse(localStorage.getItem("productos")) || []
    const nuevosProductos = productosEnCarrito.filter(producto => producto.id !== idProducto)

    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    containerTarjetasCarrito.innerHTML = ""
    crearTarjetasProductosCarrito()

    totalPrecio()
}


const cartIcon = document.querySelector('.cart-icon a');
const Carrito = document.getElementById('Carrito');


cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    Carrito.classList.toggle('visible');
});


function totalPrecio() {
    const productosEnCarrito = JSON.parse(localStorage.getItem("productos"))
    let precio = 0
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        productosEnCarrito.forEach(producto => {
            precio += producto.precio * producto.cantidad
        })
    }

    const totalPrecioElemento = document.getElementById("total-precio");
    if (totalPrecioElemento) {
        totalPrecioElemento.textContent = precio.toFixed(2);
    }
}

