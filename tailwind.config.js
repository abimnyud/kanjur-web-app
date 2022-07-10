/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            blue: {
                0: '#E9EEFA',
                50: '#C3D0F3',
                100: '#2457CA',
                500: '#083394',
            },
            yellow: {
                0: '#FFEDA6',
                100: '#FFE066',
                500: '#E4B500',
            },
            red: {
                0: '#FFDDDC',
                100: '#F25F5C',
                300: '#D61410',
            },
            green: {
                0: '#D2F4EB',
                100: '#09BC8A',
                300: '#008D66',
            },
            light: {
                100: '#FFFFFF',
                200: '#F8F8F8',
            },
            gray: {
                0: '#EEEEEE',
                100: '#CCCCCC',
                200: '#AAAAAA',
                300: '#808080',
                500: '#3B3B3B',
            },
            dark: {
                500: '#070707',
            },
        },
        extend: {},
    },
    plugins: [
        require('tailwindcss-scoped-groups')({
            groups: ['one', 'two'],
        }),
    ],
};
