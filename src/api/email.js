import { createTransport } from 'nodemailer';
import { ServidorEnvioEmail } from "../../config/config.js"
import logger from "../logger.js";
import dotenv from 'dotenv';

const transporter = createTransport(ServidorEnvioEmail);

transporter.verify(function (error, success) {
    if (error) { logger.error(`Envio de mail fallo la verificacion del servidor ${error}`);
         return;
    } else {
        logger.info("Server is ready to take our messages");
    }
});

export async function enviarEmail(correoDestino, asunto, cuerpo) {

    const mailOptions = {
        from:'Servidor Node.js',
        to: process.env.MAIL_USER_DESTINO,
        subject: asunto,
        html: cuerpo
    }

    try{
        let info = await transporter.sendMail(mailOptions)
        logger.info(info)
        return info.messageId;  
    }
    catch(err)
    {
        logger.error(err)
    }
}

