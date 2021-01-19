const { io } = require('../server');
const { TicketControl } = require('../class/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimo4()
    });

    client.on('nextTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
        // console.log(siguiente);
    });



    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: ' El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        console.log('enviando ultimos 4');
        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimo4()
        });

    })

});