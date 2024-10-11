const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    const { product_id, name, description , price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json(prod);
    } catch (err) {        
        res.status(500).json(err);
    }
};

const updateProduct = async (req, res) => {
    const { product_id, name, description, price, category, image_url } = req.body;
    const { id } = req.params; // Get the Product ID from the URL parameter

    // Build the data object for the update
    const data = {};
    if (product_id) data.product_id = product_id;
    if (name) data.name = name;
    if (description) data.description = description;
    if (price) data.price = price;
    if (category) data.category = category;
    if (image_url) data.image_url = image_url;

    // Check if there's any data to update
    if (Object.keys(data).length === 0) {
        return res.status(400).json({ 
            status: 'error',
            message: 'No data provided for update.'
        });
    }

    try {
        const prod = await prisma.products.update({
            data,
            where: { product_id: Number(id) } // Use the ID from the URL
        });
        res.status(200).json({
            status: 'ok',
            message: `Product with ID = ${id} is updated`,
            product: prod
        });
    } catch (err) {
        // Handle known Prisma errors
        if (err.code === 'P2001') {
            // Unique constraint violation (e.g., email already exists)
            res.status(400).json({ 
                status: 'error',
                message: 'Name already exists.' 
            });
        } else if (err.code === 'P2025') {
            // Record not found
            res.status(404).json({ 
                status: 'error',
                message: `Product with ID = ${id} not found.` 
            });
        } else {
            // Handle other unexpected errors
            console.error('Update Product error: ', err);
            res.status(500).json({ 
                status: 'error',
                message: 'An unexpected error occurred.' 
            });
        }
    }
};

// Delete

const deleteProduct = async (req, res) => {
    const id = req.params.id;
  
    try {
      // ตรวจสอบว่าลูกค้ามีอยู่หรือไม่
      const existingProduct = await prisma.products.findUnique({
        where: {
            product_id: Number(id),  // ตรวจสอบว่า product_id เป็นตัวเลข
        },
      });
  
      // ถ้าไม่พบลูกค้า
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // ลบลูกค้า
      await prisma.products.delete({
        where: {
            product_id: Number(id),
        },
      });
  
      // ส่งข้อความเมื่อทำการลบสำเร็จ
      res.status(200).json({
        status: "ok",
        message: `Product with ID = ${id} is deleted`  // แสดง ID ที่ถูกลบ
      });
    } catch (err) {
      console.error('Delete Product error: ', err);  // แสดงข้อผิดพลาดใน console
      res.status(500).json({ error: err.message });  // ส่งข้อความข้อผิดพลาดกลับไปที่ client
    }
  };

// get all
const getProducts = async (req, res) => {
    const prod = await prisma.products.findMany()
    res.json(prod)
};
// get only one by id
const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const prod = await prisma.products.findUnique({
            where: { product_id: Number(id) },
        });
        if (!prod) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
// search any by name
const getProductsByTerm = async (req, res) => {
    const searchString = req.params.term;
    try {
        const prod = await prisma.products.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        price: {
                            contains: searchString
                        }
                    }
                ]
            },
        });
        if (!prod || prod.length == 0) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createProduct, getProduct, getProducts,
    updateProduct, deleteProduct, getProductsByTerm
};


