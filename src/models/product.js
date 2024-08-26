const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'trash', 'published'],
        default: 'draft',
    },
    imported_t: {
        type: Date,
        required: true,
        default: Date.now,
    },
    url: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
    },
    created_t: {
        type: Number, // Timestamp
    },
    last_modified_t: {
        type: Number, // Timestamp
    },
    product_name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
    },
    brands: {
        type: String,
    },
    categories: {
        type: String,
    },
    labels: {
        type: String,
    },
    cities: {
        type: String, // Pode ser uma string vazia, conforme o JSON
    },
    purchase_places: {
        type: String,
    },
    stores: {
        type: String,
    },
    ingredients_text: {
        type: String,
    },
    traces: {
        type: String,
    },
    serving_size: {
        type: String,
    },
    serving_quantity: {
        type: Number,
    },
    nutriscore_score: {
        type: Number,
    },
    nutriscore_grade: {
        type: String,
    },
    main_category: {
        type: String,
    },
    image_url: {
        type: String,
    },
}, {
    timestamps: true, // Cria campos `createdAt` e `updatedAt`
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
