const express = require("express")
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request")
const productService = require("./product.service")

router.get("/", getAll);
router.get("/:id", getByName)
router.post("/", createSchema, create)
router.put("/:id", updateSchema, update)
router.delete("/:id", _delete)

module.exports = router;

function getAll(req, res, next){
    productService.getAll()
        .then(products => res.json(products))
        .catch(next)
}

function getByName(req, res, next){
    productService.getByName(req.params.id)
        .then(product => res.json(product))
        .catch(next)
}

function create(req, res, next){
    productService.create(req.body)
        .then(() => res.json({message : 'Product Created'}))
        .catch(next)
}

function update(req, res, next){
    productService.update(req.params.id, req.body)
        .then(() => res.json({message : 'Product Updated'}))
        .catch(next)
}

function _delete(req, res, next){
    productService.delete(req.params.id)
        .then(() => res.json({mesasge : "Product Deleted"}))
        .catch(next)
}

function createSchema(req, res, next){
    const schema = Joi.object({
        name : Joi.string().required(),
        price : Joi.required(),
        quantity : Joi.required(),
        image : Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function updateSchema(req, res, next){
    const schema = Joi.object({
        name : Joi.string().required(),
        price : Joi.required(),
        quantity : Joi.required(),
        image : Joi.string().required()
    })

    validateRequest(req, next, schema);
}