import logger from './logger.js'
import app from './server.js'
import config from '../config/config.js'
import cluster from 'cluster' 
import os  from 'os'

const PORT = config.PORT
const modo = config.MODO

if (modo === "CLUSTER") {

    const cantidadDeCPUs = os.cpus().length

    if (cluster.isPrimary) {/* MASTER */
        console.log(`Cantidad de CPUS: ${cantidadDeCPUs}`)
        console.log(`PID MASTER: ${process.pid}`)
        console.log(`MODO: ${modo}`)

        for (let i = 0; i < cantidadDeCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', worker => {
            console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork()
        })
    } else { /* WORKERS */

        const server = app.listen(PORT, () => {
            logger.info(`Http server listening on port ${server.address().port} - PID WORKER ${process.pid}`)
        })
        
        server.on("error", error => logger.error(`Server error ${error}`))
    }

} else {

    const server = app.listen(PORT, () => {
        logger.info(`Http server listening on port ${server.address().port} - PID WORKER ${process.pid} - MODO ${modo}`)
    })
    
    server.on("error", error => logger.error(`Server error ${error}`))
}






