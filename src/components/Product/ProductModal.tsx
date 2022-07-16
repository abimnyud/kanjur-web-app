import { FC, useState, useRef } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import { useAuth } from '@contexts/AuthContext';
import Router from 'next/router';
import Image from 'next/image';
import ProductModalSuccess from './ProductModalSuccess';

const ProductModal: FC<any> = ({ setIsOpen }) => {
    const { isAuthenticated }: any = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const isomorphicEffect = useIsomorphicEffect();
    const fileRef = useRef<any>();

    const handleFileChange = (changeEvent: any) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent: any) {
            setImageSrc(onLoadEvent.target.result);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    };

    const uploadFile = async (e: any) => {
        const form = e.currentTarget;
        const fileInput: any = Array.from(form.elements).find(
            ({ name }: any) => name === 'file'
        );

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'kajur_upload_preset');

        const data = await fetch(
            'https://api.cloudinary.com/v1_1/dvg39azh5/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        ).then(async (r) => await r.json());

        return data;
    };

    const handleCreate = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (isAuthenticated) {
            const uploadData: any = await uploadFile(e);
            let res: any = await fetch('/api/product/add', {
                method: 'POST',
                body: JSON.stringify({
                    name: productTitle,
                    description: productDescription,
                    image: uploadData.secure_url,
                    price: productPrice,
                }),
            });

            if (res.status === 201) setSuccess(true);
        } else {
            Router.reload();
        }

        setLoading(false);
    };

    isomorphicEffect(() => {
        if (
            !productTitle ||
            !productDescription ||
            !productPrice ||
            imageSrc === ''
        ) {
            setError(true);
        } else {
            setError(false);
        }
    }, [productTitle, productPrice, productDescription, imageSrc]);

    return (
        <div
            onClick={() => (success ? Router.reload() : setIsOpen(false))}
            className="flex fixed z-50 inset-0 h-screen justify-center items-center bg-dark-500 bg-opacity-50"
        >
            {success ? (
                <ProductModalSuccess />
            ) : (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex flex-col gap-8 justify-between w-4/5 md:w-2/5 xl:w-1/5 h-fit p-4 rounded-lg  bg-light-100 "
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-0">
                            <span className="font-semibold text-xl text-gray-500">
                                Jual Produk
                            </span>
                        </div>
                        <form
                            method="post"
                            onSubmit={handleCreate}
                            className="flex flex-col w-full gap-4"
                        >
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-medium text-gray-300">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    name="judul-produk"
                                    value={productTitle}
                                    onChange={(e) =>
                                        setProductTitle(e.target.value)
                                    }
                                    className="basic-input w-full"
                                    placeholder="Judul Produk"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-medium text-gray-300">
                                    Foto Produk
                                </label>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                />
                                {imageSrc && (
                                    <div className="relative aspect-square overflow-hidden rounded-xl">
                                        <Image
                                            src={imageSrc}
                                            alt={''}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                        <a
                                            className="absolute right-0 p-6 cursor-pointer group"
                                            onClick={() => {
                                                setImageSrc('');
                                                fileRef.current.value = '';
                                            }}
                                        >
                                            <svg
                                                className="h-5 fill-gray-200 group-hover:fill-light-100 transition"
                                                viewBox="0 0 18 18"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M10.4099 9.00019L16.7099 2.71019C16.8982 2.52188 17.004 2.26649 17.004 2.00019C17.004 1.73388 16.8982 1.47849 16.7099 1.29019C16.5216 1.10188 16.2662 0.996094 15.9999 0.996094C15.7336 0.996094 15.4782 1.10188 15.2899 1.29019L8.99994 7.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L7.58994 9.00019L1.28994 15.2902C1.19621 15.3831 1.12182 15.4937 1.07105 15.6156C1.02028 15.7375 0.994141 15.8682 0.994141 16.0002C0.994141 16.1322 1.02028 16.2629 1.07105 16.3848C1.12182 16.5066 1.19621 16.6172 1.28994 16.7102C1.3829 16.8039 1.4935 16.8783 1.61536 16.9291C1.73722 16.9798 1.86793 17.006 1.99994 17.006C2.13195 17.006 2.26266 16.9798 2.38452 16.9291C2.50638 16.8783 2.61698 16.8039 2.70994 16.7102L8.99994 10.4102L15.2899 16.7102C15.3829 16.8039 15.4935 16.8783 15.6154 16.9291C15.7372 16.9798 15.8679 17.006 15.9999 17.006C16.132 17.006 16.2627 16.9798 16.3845 16.9291C16.5064 16.8783 16.617 16.8039 16.7099 16.7102C16.8037 16.6172 16.8781 16.5066 16.9288 16.3848C16.9796 16.2629 17.0057 16.1322 17.0057 16.0002C17.0057 15.8682 16.9796 15.7375 16.9288 15.6156C16.8781 15.4937 16.8037 15.3831 16.7099 15.2902L10.4099 9.00019Z" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-medium text-gray-300">
                                    Desripsi Produk
                                </label>
                                <textarea
                                    name="judul-produk"
                                    value={productDescription}
                                    onChange={(e) =>
                                        setProductDescription(e.target.value)
                                    }
                                    className="basic-input w-full"
                                    placeholder="Deskripsi Produk"
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-medium text-gray-300">
                                    Harga Produk
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-[0.45rem] text-lg font-semibold text-gray-200">
                                        Rp
                                    </span>
                                    <input
                                        type="text"
                                        name="harga-produk"
                                        value={productPrice}
                                        onChange={(e) =>
                                            setProductPrice(
                                                Number(e.target.value)
                                            )
                                        }
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        placeholder="0"
                                        className="basic-input pl-12 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 w-full justify-around">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="btn-light-blue w-full"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className={`flex gap-2 btn-dark-blue ${
                                        error || loading
                                            ? 'cursor-not-allowed bg-blue-50 hover:bg-blue-50'
                                            : ''
                                    } w-full`}
                                >
                                    {loading ? (
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
                                        <span>Jual</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductModal;
