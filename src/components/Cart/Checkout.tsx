import type { FC } from 'react';
import { useState } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import { currency } from '@lib/currencyFormatter';
import { useCart } from '@contexts/CartContext';
import Router from 'next/router';
import CheckoutProductList from '@components/Cart/CheckoutProductList';

const Checkout: FC<any> = ({
    data,
    setCheckout,
    isLoading,
    setLoading,
    setSuccess,
    setTransactionData,
    getBalance,
}) => {
    const [amount, setAmount] = useState(0);
    const [warning, setWarning] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const isomorphicEffect = useIsomorphicEffect();
    const { updateUserCart }: any = useCart();

    const handleSubmit = async (): Promise<void> => {
        setLoading(true);
        let cart = data.map((item: any) => item.id);
        let res: any = await fetch('/api/buy', {
            method: 'POST',
            body: JSON.stringify({
                cart: cart,
                deposit: Number(amount),
            }),
        });
        if (res.status === 401) Router.reload();
        res = await res.json();

        if (res.status) {
            await fetch('/api/cart/delete', {
                method: 'DELETE',
            });

            setTransactionData(res.data);
            setSuccess(true);
            updateUserCart();
            getBalance();
        }

        setLoading(false);
    };

    isomorphicEffect(() => {
        let total: number = 0;

        data.forEach((item: any) => {
            total += Number(item.price);
        });

        setTotalPrice(total);
    }, [data]);

    isomorphicEffect(() => {
        if (Number(amount) < Number(totalPrice)) {
            setWarning(true);
        } else {
            setWarning(false);
        }
    }, [amount]);

    const handleChange = async (e: any): Promise<void> => {
        e.preventDefault();
        setAmount(Number(e.target.value));
    };

    return (
        <div className="w-full h-full flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
                <div className="w-full flex gap-5 items-center pt-6">
                    <a
                        onClick={() => setCheckout(false)}
                        className="cursor-pointer group"
                    >
                        <svg
                            className="h-4 stroke-gray-200 group-hover:stroke-dark-500 transition"
                            viewBox="0 0 17 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 1L1.70711 4.29289C1.31658 4.68342 1.31658 5.31658 1.70711 5.70711L5 9M2 5.00001L16 5.00001"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </a>
                    <span className="text-2xl font-semibold text-gray-200">
                        Pembayaran
                    </span>
                </div>
                <div className="h-screen">
                    <CheckoutProductList data={data} />
                </div>
            </div>
            <div className="absolute bottom-0 w-full left-0 px-6 flex flex-col gap-6 bg-light-100 pb-6 pt-4">
                <div className="flex flex-col gap-8 mb-6">
                    <div className="flex w-full justify-between items-end">
                        <span className="text-base font-semibold text-gray-300">
                            Total
                        </span>
                        <span className="text-3xl text-gray-500 font-bold">
                            {currency.format(totalPrice)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-sm font-medium">
                            Masukkan jumlah uang yang akan dibayarkan:
                        </span>
                        <div className="relative flex flex-col gap-3">
                            <span className="absolute left-4 py-3 text-2xl font-semibold text-gray-200">
                                Rp
                            </span>
                            <input
                                type="text"
                                name="deposit-amount"
                                id="deposit-amount"
                                value={amount}
                                min={0}
                                maxLength={11}
                                onChange={(e) => handleChange(e)}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder="0"
                                className={`pl-14 outline outline-2 ${
                                    warning
                                        ? 'outline-yellow-100'
                                        : 'outline-blue-100'
                                } rounded-lg w-full p-4 text-lg font-semibold`}
                                disabled={isLoading}
                            />{' '}
                            {warning && (
                                <div className="flex items-center gap-4 bg-yellow-0 p-4 rounded-lg">
                                    <span>
                                        <svg
                                            className="h-8 stroke-yellow-500"
                                            viewBox="0 0 22 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 15.9261C1 15.3187 1.15479 14.7214 1.44975 14.1904L7.63566 3.0558C8.18399 2.06881 9.13806 1.37239 10.2452 1.15096V1.15096C10.7435 1.05131 11.2565 1.05131 11.7548 1.15096V1.15096C12.8619 1.37239 13.816 2.06881 14.3643 3.05581L20.5502 14.1904C20.8452 14.7214 21 15.3187 21 15.9261V15.9261C21 17.8999 19.3999 19.5 17.4261 19.5H4.57391C2.60009 19.5 1 17.8999 1 15.9261V15.9261Z"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M11 7L11 11"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11 14L11 14.5"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-xs text-yellow-500 font-medium">
                                        Sepertinya nominal yang kamu masukkan
                                        kurang dari total harga pembelian
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        amount === 0 || isLoading ? null : handleSubmit();
                    }}
                    className={`flex justify-center tansition w-full ${
                        amount > 0 || !isLoading
                            ? 'bg-blue-100 hover:bg-blue-500'
                            : 'bg-blue-50 cursor-not-allowed'
                    } text-light-100 rounded-full py-4 font-bold`}
                >
                    {isLoading ? (
                        <svg
                            role="status"
                            className="h-6 animate-spin text-light-200 fill-blue-100"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    ) : (
                        <span>Bayar</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
