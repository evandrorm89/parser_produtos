const ProductService = require('../../src/services/productService');
const Product = require('../../src/models/product');

jest.mock('../../src/models/product');

describe('Product Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all products', async () => {
        const mockProducts = [
            { code: '123', product_name: 'Test Product 1' },
            { code: '456', product_name: 'Test Product 2' }
        ];

        // Mockando a cadeia de métodos: find().skip().limit()
        const mockFind = jest.fn().mockReturnThis();
        const mockSkip = jest.fn().mockReturnThis();
        const mockLimit = jest.fn().mockResolvedValue(mockProducts);

        Product.find.mockImplementation(() => ({ skip: mockSkip, limit: mockLimit }));
        mockSkip.mockReturnValue({ limit: mockLimit });

        const products = await ProductService.getAllProducts(1, 10);

        expect(products).toEqual(mockProducts);
        expect(Product.find).toHaveBeenCalledTimes(1);
        expect(mockSkip).toHaveBeenCalledWith(0);
        expect(mockLimit).toHaveBeenCalledWith(10);
    });

    it('should return a single product by code', async () => {
        const mockProduct = { code: '123', product_name: 'Test Product 1' };
        Product.findOne.mockResolvedValue(mockProduct);

        const product = await ProductService.getProductByCode('123');

        expect(product).toEqual(mockProduct);
        expect(Product.findOne).toHaveBeenCalledWith({ code: '123' });
        expect(Product.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return null if product not found', async () => {
        Product.findOne.mockResolvedValue(null);

        const product = await ProductService.getProductByCode('999');

        expect(product).toBeNull();
        expect(Product.findOne).toHaveBeenCalledWith({ code: '999' });
        expect(Product.findOne).toHaveBeenCalledTimes(1);
    });
});
