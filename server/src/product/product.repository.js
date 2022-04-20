"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const product_model_1 = require("./product.model");
const convertDocumentToObject = (document) => document.toObject({ getters: true });
const mapDocumentsToArray = (documents) => documents.map(convertDocumentToObject);
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return convertDocumentToObject(result);
});
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({});
    return mapDocumentsToArray(result);
});
const productRepository = {
    createProduct,
    getProducts,
};
exports.default = productRepository;
//# sourceMappingURL=product.repository.js.map