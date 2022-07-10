import type { FC } from 'react';
import CheckoutProduct from '@components/Cart/CheckoutProduct';

const CheckoutProductList: FC<any> = ({ data }) => {
    return (
        <div className="flex w-full h-full overflow-scroll pb-96">
            <ul className="checkout-products">
                {data.map((item: any) => (
                    <CheckoutProduct
                        key={`checkout-cart-item-${item.id}`}
                        data={item}
                    />
                ))}
            </ul>
        </div>
    );
};

export default CheckoutProductList;
