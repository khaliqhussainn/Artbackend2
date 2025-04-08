const Product = require("../models/productModel")

async function createProduct(reqData) {
   

    const product = new Product({
        name: reqData.name,
        description1: reqData.description1,
        description2: reqData.description2,
        description3: reqData.description3,
        discountedPrice: reqData.discountedPrice,
        discountPercent: reqData.discountPercent,
        image: reqData.image,
        price: reqData.price,
        quantity: reqData.quantity,
        category: reqData.category, 
        option: reqData.option,   
        details: reqData.details,
        discount: reqData.discount
    });

    return await product.save()
    


}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);

    return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();
  
    if (!product) {
      throw new Error("Product not found with id " + id);
    }
  
    return product;
}

// src/service/productService.js - Update getAllProducts function
async function getAllProducts(reqQuery = {}) {
    let {category, option, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize} = reqQuery;

    // Set default values
    pageNumber = pageNumber || 1;
    pageSize = pageSize || 10;
    
    let query = Product.find();

    if (category) {
        query = query.where("category").equals(category);
    }

    if (option) {
        query = query.where("option").equals(option);
    }
    
    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        if (colorRegex) query = query.where("color").regex(colorRegex);
    }
    
    if (sizes) {
        const sizesSet = new Set(sizes.split(","));
        if (sizesSet.size > 0) query = query.where("sizes.name").in([...sizesSet]);
    }
    
    if (minPrice && maxPrice) {
        query = query.where('price').gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discount").gte(minDiscount);
    }

    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lte(0);
        }
    }
    
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ price: sortDirection });
    } else {
        // Default sort by newest
        query = query.sort({ createdAt: -1 });
    }
    
    // Count total products before applying pagination
    const totalProducts = await Product.countDocuments(query.getQuery());
    
    // Apply pagination
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(parseInt(pageSize));

    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return {
        content: products,
        totalElements: totalProducts,
        currentPage: pageNumber,
        totalPages: totalPages
    };
}
async function createMultipleProducts(products){
    for(let product of products){
        await createProduct(product)
    }
}

module.exports = { createProduct, deleteProduct, updateProduct, findProductById, getAllProducts, createMultipleProducts }

  
