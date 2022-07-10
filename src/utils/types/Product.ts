interface Product {
    id: number;
    name: string;
    image: string;
    description?: string;
    price: string;
    seller_id?: number;
    transaction_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    seller: any;
}

export default Product;
