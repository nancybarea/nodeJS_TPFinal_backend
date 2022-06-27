const socket = io.connect();

socket.on('listadoMensajesChat', async msjs => {
    const plantilla = await buscarPlantillaMensajes()
    const html = armarHTML(plantilla, msjs)
    document.getElementById('messages').innerHTML = html;
});

function buscarPlantillaMensajes() {
    return fetch('/plantillas/mensajesChat.ejs')
        .then(respuesta => respuesta.text())
}

function armarHTML(plantilla, data) {
    const render = ejs.compile(plantilla);
    const html = render({ data })
    return html
}

function agregarMensaje(e) {

    const mensaje = {
       email: document.getElementById('email').value,
       text: document.getElementById('mensaje').value
    };
    document.getElementById('messages').value = ''
    socket.emit('nuevoMensajeChat', mensaje);
    return false;
}