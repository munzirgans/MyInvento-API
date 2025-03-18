const Item = require('../models/itemModel');

const createItem = async (req, res) => {
    const { name, description, price } = req.body;
    const user_id = req.user.id;
    try {
        const result = await Item.create(user_id, name, description, price);
        res.status(200).json({ message: 'Item created successfully', data: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating item', error: err.message });
    }
};

const getAllItems = async (req, res) => {
    try {
        const user_id = req.user.id;
        const items = await Item.getAll(user_id);
        res.status(200).json({ items });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
};

const getItemById = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
        const item = await Item.getById(id, user_id);
        res.status(200).json({ item });
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: 'Item not found' });
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const user_id = req.user.id;

    const item = await Item.getById(id, user_id);
    if(item.user_id != user_id){
        return res.status(403).json({message: "You can't modify item data doesn't belong to you!"});
    }

    try {
        const result = await Item.update(id, name, description, price);
        res.status(200).json({ message: 'Item updated successfully', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating item', error: err.message });
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {

        const item = await Item.getById(id, user_id);

        if(item.user_id != user_id){
            return res.status(403).json({message: "You can't modify item data doesn't belong to you!"});
        }
    
        const result = await Item.delete(id);
        res.status(200).json({ message: 'Item deleted successfully', data: result});
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item', error: err });
    }
};

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem };