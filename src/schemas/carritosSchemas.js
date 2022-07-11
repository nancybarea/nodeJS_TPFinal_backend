import Joi from 'joi'

const schemaNewCarrito = Joi.object(
    {
        emailUsuario: Joi.string()
            .email()
            .required(),        
        direccionEntrega: Joi.string()
                .required(),
        productos: Joi.array().items( Joi.object(
                {
                idProducto: Joi.string().required(), 
                precioProducto: Joi.number().required(), 
                cantidad: Joi.number().required()
                }
            )
        )
    }
)

export default schemaNewCarrito;