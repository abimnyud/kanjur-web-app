import React from 'react';
import CartProduct from '@components/Cart/CartProduct';

const CartProductList: React.FC<any> = ({ activeProduct, soldOutProduct }) => {
    return (
        <div className="flex flex-col gap-8 h-full overflow-scroll pb-24">
            {activeProduct.length > 0 && (
                <div className="flex flex-col">
                    <span className="text-sm flex gap-2 border-b-2 border-gray-0 pb-2">
                        Tersedia
                        <span className="flex justify-center items-center bg-blue-0 rounded-full px-3 text-xs font-semibold text-blue-500">
                            {activeProduct.length}
                        </span>
                    </span>
                    <ul className="cart-products">
                        {activeProduct.map((item: any) => (
                            <CartProduct
                                key={`cart-item-${item.id}`}
                                data={item}
                            />
                        ))}
                    </ul>
                </div>
            )}
            {soldOutProduct.length > 0 && (
                <div className="flex flex-col">
                    <span className="text-sm flex gap-2 border-b-2 border-gray-0 pb-2">
                        Tidak Tersedia
                        <span className="flex justify-center items-center bg-red-0 rounded-full px-3 text-xs font-semibold text-red-100">
                            {soldOutProduct.length}
                        </span>
                    </span>
                    <ul className="cart-products">
                        {soldOutProduct.map((item: any) => (
                            <CartProduct
                                key={`sold-cart-item-${item.id}`}
                                data={item}
                                sold={true}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CartProductList;
