import Head from 'next/head';
import { FC } from 'react';

const MyHead: FC<any> = ({ title, description, url, type, image, alt }) => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:locale" content="ID" />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                property="og:url"
                content={`https://compfest-screening.abimanyu.co/${url}`}
            />
            <meta property="og:site_name" content="Shafira Cake" />
            <meta
                property="og:image"
                content={
                    image ||
                    `https://www.compfest-screening.abimanyu.co/thumbnail.png`
                }
            />
            <meta
                property="og:image:secure_url"
                content={
                    image ||
                    `https://www.compfest-screening.abimanyu.co/thumbnail.png`
                }
            />

            <meta property="twitter:card" content="summary_large_image" />
            <meta
                property="twitter:site"
                content={`https://compfest-screening.abimanyu.co/${url}`}
            />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta
                property="twitter:image"
                content={
                    image ||
                    `https://www.compfest-screening.abimanyu.co/thumbnail.png`
                }
            />
            <meta property="twitter:image:alt" content={alt} />
        </Head>
    );
};

export default MyHead;
