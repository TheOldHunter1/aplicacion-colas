// comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket');

// on escuchar
socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('perdimos al servidor');
})

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
})

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
    console.log(resp);
})