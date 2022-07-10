export const currency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});

export const currencyNoDigit = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
});

export const currencyNoPrefix = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});
