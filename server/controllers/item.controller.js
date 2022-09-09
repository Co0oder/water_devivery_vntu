const itemsController = require('../models/items.model');
const { BASE_URL } = require('../constants');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

module.exports = {
    createItem : async (req, res) =>  {
        const fileData = req.file;
        const id = req.params.id;
        let item;
        if(id){
            const [oldItem] = await itemsController.getItemById(id);
            const newItem = {
                ...req.body,
                ...(fileData ? {image: fileData.filename} : {})
            }
            if(!fileData) {
                delete newItem.image;
            }

            item = await updateItem( newItem, id)
            if(fileData && oldItem.image){
                await removeUploaded(oldItem.image);
            }
        } else {
            item = await createItem(
                {
                    ...req.body,
                    ...(fileData ? {image: fileData.filename} : {})
                }
            );
        }
        res.status(200).send(item);
    },
    showItems : async (req, res) => {
        let itemsList = await itemsController.showAllItems();
        itemsList = itemsList.map((el) => ({...el, image: `${BASE_URL}/${el.image}`}));
        let {ids} = req.query;
        if(ids){
            ids = ids.split(',');
            itemsList = itemsList.filter(el => ids.includes(String(el.id)));
        }
        res.send(itemsList);
    },

    getItemsByIds: async (req,res) => {
        let itemsList = await itemsController.showAllItems();
        itemsList = itemsList.map((el) => ({...el, image: `${BASE_URL}/${el.image}`}));
        res.send(itemsList);
    },

    deleteItems : async (req, res) => {
        const id = req.params.id;
        const [item] = await itemsController.getItemById(id);
        if(item.image){
                await removeUploaded(item.image);
        }
        await itemsController.deleteItemsById(id);
        res.send({status: `items with id: ${id} deleted`});
    },
}

function createItem(props) {
    return itemsController.addNewItems(props);
}

function updateItem(props,id) {
    return itemsController.updateItem(props, id);
}

function removeUploaded(name){
    const path = `${__dirname}/../uploads/${name}`;
    if(!fs.existsSync(path)){
        return;
    }
    return unlinkAsync(path)
}