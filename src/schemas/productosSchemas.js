import Joi from 'joi'

const schemaNewProduct = Joi.object(
    {
        nombre: Joi.string()
            .required(),
        descripcion: Joi.string(),
        precio: Joi.number()
            .precision(2)
            .positive()
            .required(),
        imagenURL: Joi.string(),
        stock: Joi.number()
            .integer()
            .positive()
            .required(),
        categoria: Joi.string(),
        caracteristicas: Joi.array().items( Joi.object(
            {talle: Joi.string().required(), colores: Joi.string().required() }
            )
        )
    }
)

export default schemaNewProduct;
