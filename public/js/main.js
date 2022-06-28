//------------------------------------------------------------
//--------------------  DEFINICIONES -------------------------
const socket = io.connect();

//------------------------------------------------------------
//--------------------  FUNCIONES ----------------------------

//buscarPlantillaMensajes
function buscarPlantillaMensajes() {
    return fetch('/plantillas/mensajesChat.ejs')
        .then(respuesta => respuesta.text())
}

//armarHTML
function armarHTML(plantilla, mensajesChat) {
    const render = ejs.compile(plantilla);
    const html = render({ mensajesChat }) 
    return html
}

//agregarMensaje
function agregarMensaje(e) {
    const mensaje = {
       email: document.getElementById('email').value,
       mensaje: document.getElementById('mensaje').value
    };
    document.getElementById('listadoDeMensajes').value = ''
    socket.emit('nuevoMensajeChat', mensaje);
    return false;
}

//------------------------------------------------------------
//--------------------  PRINCIPAL-----------------------------
socket.on('listadoMensajesChat', async mensajesChat => {
    const plantilla = await buscarPlantillaMensajes()
    const html = armarHTML(plantilla, mensajesChat)
    document.getElementById('listadoDeMensajes').innerHTML = html;
});
//------------------------------------------------------------

