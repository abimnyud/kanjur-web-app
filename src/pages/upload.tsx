import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Upload() {
    const [imageSrc, setImageSrc] = useState('');
    const [uploadData, setUploadData] = useState();

    const handleOnChange = (changeEvent: any) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent: any) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    };

    const handleOnSubmit = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;
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
        ).then((r) => r.json());
        setUploadData(data);
    };

    return (
        <div>
            <Head>
                <title>Image Uploader</title>
                <meta
                    name="description"
                    content="Upload your image to Cloudinary!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <form
                    method="post"
                    onChange={handleOnChange}
                    onSubmit={handleOnSubmit}
                >
                    <p>
                        <input type="file" name="file" />
                    </p>
                    {/* {imageSrc && <Image src={imageSrc} alt="" layout="fill" />} */}
                    {imageSrc && !uploadData && (
                        <p>
                            <button>Upload Files</button>
                        </p>
                    )}
                    {uploadData && (
                        <code>
                            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
                        </code>
                    )}
                </form>
            </main>
        </div>
    );
}
