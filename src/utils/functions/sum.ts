const sum = async (products: Array<any>): Promise<number> => {
    let sum: number = 0;
    products.map((product) => (sum += Number(product.price)));

    return sum;
};

export default sum;
