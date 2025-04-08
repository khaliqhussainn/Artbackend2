const productService = require("../service/productService")

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

// src/controller/productController.js - Fix getAllProducts
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(200).send(products); // Changed from 201 to 200 for GET request
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
const createMultipleProducts = async (req, res) => {
    const productId = req.params.id;
    try {
        const products = await productService.createMultipleProducts(req.body);
        return res.status(201).send({message: "Products created succesfully"});
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { createProduct, deleteProduct, updateProduct , getAllProducts, createMultipleProducts, findProductById}