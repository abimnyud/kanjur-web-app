import React from 'react';

const CartButton: React.FC<any> = ({ count, setIsCartOpen }) => {
    return (
        <a
            onClick={() => setIsCartOpen(true)}
            className="flex flex-row gap-2 relative md:gap-4 justify-center items-center shadow-blue-0 hover:bg-blue-0 shadow-md md:shadow-lg bg-light-100 p-5 rounded-xl hover:cursor-pointer group transition"
        >
            <svg
                className="h-6"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2.53715 9.47134C2.80212 7.48412 4.49726 6 6.50207 6H13.4979C15.5027 6 17.1979 7.48412 17.4628 9.47135L18.3962 16.4713C18.7159 18.8693 16.8504 21 14.4313 21H5.56873C3.14958 21 1.2841 18.8693 1.60382 16.4713L2.53715 9.47134Z"
                    className="stroke-blue-500"
                    strokeWidth="2"
                />
                <path
                    d="M14 8V5C14 2.79086 12.2091 1 10 1V1C7.79086 1 6 2.79086 6 5L6 8"
                    className="stroke-blue-500"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
            {count > 0 && (
                <span className="flex justify-center items-center -inset-2 absolute bg-red-100 aspect-square h-6 rounded-full text-xs text-light-100 font-bold select-none">
                    {count}
                </span>
            )}
        </a>
    );
};

export default CartButton;
