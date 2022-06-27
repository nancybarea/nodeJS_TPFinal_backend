const socket = io.connect();

socket.on('listadoMensajesChat', async msjs => {
    console.log("entro a listadoMensajesChat")
    const plantilla = await buscarPlantillaMensajes()
    const html = armarHTML(plantilla, msjs)
    document.getElementById('listadoDeMensajes').innerHTML = html;
});

function buscarPlantillaMensajes() {
    return fetch('/plantillas/mensajesChat.ejs')
        .then(respuesta => respuesta.text())
}

function armarHTML(plantilla, mensajesChat) {
    const render = ejs.compile(plantilla);
    const html = render({ mensajesChat }) 
    return html
}

function agregarMensaje(e) {
    const mensaje = {
       email: document.getElementById('email').value,
       mensaje: document.getElementById('mensaje').value
    };
    document.getElementById('listadoDeMensajes').value = ''
    socket.emit('nuevoMensajeChat', mensaje);
    return false;
}