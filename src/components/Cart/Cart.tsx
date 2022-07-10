import React, { useState } from 'react';
import CartProductList from '@components/Cart/CartProductList';
import Checkout from '@components/Cart/Checkout';
import CheckoutSuccess from '@components/Cart/CheckoutSuccess';

const Cart: React.FC<any> = ({
    setIsCartOpen,
    cartData,
    loading,
    getBalance,
}) => {
    const [checkout, setCheckout] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [transactionData, setTransactionData] = useState(null);
    const activeProduct: any = cartData.filter((item: any) => {
        return item.deleted_at === null;
    });

    const soldOutProduct: any = cartData.filter((item: any) => {
        return item.deleted_at !== null;
    });

    return (
        <div className="flex flex-col justify-between gap-8 fixed right-0 z-50 h-full w-screen md:shadow-lg md:w-1/2 xl:w-2/6 bg-light-100 px-6">
            {!checkout ? (
                <>
                    <div className="flex flex-col gap-6 h-full">
                        <div className="w-full flex justify-between items-center pt-6">
                            <span className="text-2xl font-semibold text-gray-200">
                                Keranjang Saya
                            </span>
                            <a
                                className="cursor-pointer group"
                                onClick={() => setIsCartOpen(false)}
                            >
                                <svg
                                    className="h-5 fill-gray-200 group-hover:fill-dark-500 transition"
                                    viewBox="0 0 18 18"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.4099 9.00019L16.7099 2.71019C16.8982 2.52188 17.004 2.26649 17.004 2.00019C17.004 1.73388 16.8982 1.47849 16.7099 1.29019C16.5216 1.10188 16.2662 0.996094 15.9999 0.996094C15.7336 0.996094 15.4782 1.10188 15.2899 1.29019L8.99994 7.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L7.58994 9.00019L1.28994 15.2902C1.19621 15.3831 1.12182 15.4937 1.07105 15.6156C1.02028 15.7375 0.994141 15.8682 0.994141 16.0002C0.994141 16.1322 1.02028 16.2629 1.07105 16.3848C1.12182 16.5066 1.19621 16.6172 1.28994 16.7102C1.3829 16.8039 1.4935 16.8783 1.61536 16.9291C1.73722 16.9798 1.86793 17.006 1.99994 17.006C2.13195 17.006 2.26266 16.9798 2.38452 16.9291C2.50638 16.8783 2.61698 16.8039 2.70994 16.7102L8.99994 10.4102L15.2899 16.7102C15.3829 16.8039 15.4935 16.8783 15.6154 16.9291C15.7372 16.9798 15.8679 17.006 15.9999 17.006C16.132 17.006 16.2627 16.9798 16.3845 16.9291C16.5064 16.8783 16.617 16.8039 16.7099 16.7102C16.8037 16.6172 16.8781 16.5066 16.9288 16.3848C16.9796 16.2629 17.0057 16.1322 17.0057 16.0002C17.0057 15.8682 16.9796 15.7375 16.9288 15.6156C16.8781 15.4937 16.8037 15.3831 16.7099 15.2902L10.4099 9.00019Z" />
                                </svg>
                            </a>
                        </div>

                        {activeProduct.length > 0 ||
                        soldOutProduct.length > 0 ? (
                            !loading && (
                                <CartProductList
                                    activeProduct={activeProduct}
                                    soldOutProduct={soldOutProduct}
                                />
                            )
                        ) : (
                            <div className="flex flex-col gap-6 grow justify-center items-center ">
                                <svg
                                    className="h-20 stroke-gray-200"
                                    viewBox="0 0 20 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.53715 9.47134C2.80212 7.48412 4.49726 6 6.50207 6H13.4979C15.5027 6 17.1979 7.48412 17.4628 9.47135L18.3962 16.4713C18.7159 18.8693 16.8504 21 14.4313 21H5.56873C3.14958 21 1.2841 18.8693 1.60382 16.4713L2.53715 9.47134Z"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M14 8V5C14 2.79086 12.2091 1 10 1V1C7.79086 1 6 2.79086 6 5L6 8"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                <p className="gap-6 text-center font-medium text-gray-200">
                                    Keranjang masih kosong
                                </p>
                            </div>
                        )}
                    </div>
                </>
            ) : checkoutSuccess ? (
                <CheckoutSuccess transactionData={transactionData} />
            ) : (
                <Checkout
                    data={activeProduct}
                    setCheckout={setCheckout}
                    isLoading={checkoutLoading}
                    setLoading={setCheckoutLoading}
                    setSuccess={setCheckoutSuccess}
                    setTransactionData={setTransactionData}
                    getBalance={getBalance}
                />
            )}
            {activeProduct.length > 0 && !loading && !checkout && (
                <div className="absolute w-full bottom-6 left-0 px-6">
                    <button
                        onClick={() => setCheckout(true)}
                        className="transition w-full bg-blue-100 hover:bg-blue-500 text-light-100 rounded-full py-4 font-bold"
                    >
                        Beli
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
