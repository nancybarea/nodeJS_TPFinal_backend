import { MongoClient, ObjectId } from 'mongodb';
import logger from '../../logger.js'
import CustomError from '../../errores/CustomError.js'

const mongo_url = process.env.MONGO_URL
const base = process.env.MONGO_BASE

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
await client.connect();

export default class ContainerDao {

    constructor(collection) {
        this.collectionName = collection
        this.collection = client.db(base).collection(collection)
        logger.info(`Mongo Base:${base} collection: ${collection} instanciada`)
    }

    async getAll() {
        try {
            const array = await this.collection.find().toArray()
            return array
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error getting all records in collection ${this.collectionName}`, err)
        }
    }

    async getById(id) {
        let wanted
        let query= {"id": id};
       
        try {
            wanted = await this.collection.findOne(query);
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error when obtaining a Document by code in the collection ${this.collectionName}`, err)
        }

        if (!wanted) {
            throw new CustomError(404, `Document not found with that ${JSON.stringify(query)}`)
        }
        return wanted
    }

    async add(data) {
        try {
            const { insertedId } = await this.collection.insertOne(data)
            return insertedId;
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error adding mongo document to collection ${this.collectionName}`, err)
        }
    }

    async update(id, query) {
        try {
            this.deleteById(id);
            this.add(query)      
        } catch (error) {
            logger.error(err)
            throw new CustomError(500, `Error update mongo document to collection ${this.collectionName}`, err)
        }
    }
      
    async deleteById(id) {

        let query= {"id": id};
        await this.collection.deleteOne(query, function (err, obj) {
            if (err) {
                logger.error(err)
                throw new CustomError(500, `Error when delete a documents in collection ${this.collectionName}`, err)
            } 
        });
    }

}
