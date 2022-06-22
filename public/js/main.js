const socket = io.connect();

socket.on('listadoProductos', async productos => {
    const plantilla = await buscarPlantillaProductos()
    const html = armarHTML(plantilla, productos)
    document.getElementById('listadoProductos').innerHTML = html;
});

function buscarPlantillaProductos() {
    return fetch('/plantillas/productos.ejs')
        .then(respuesta => respuesta.text())
}

function armarHTML(plantilla, data) {
    const render = ejs.compile(plantilla);
    const html = render({ data })
    return html
}

function agregarMensaje(evento) {

    const nuevoMensaje = {
       email: document.getElementById('email').value,
       mensaje: document.getElementById('mensaje').value
    };
    document.getElementById('mensaje').value = ''
    socket.emit('nuevoMensaje', nuevoMensaje);
    return false;
}