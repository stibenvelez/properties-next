var formatMoney = new Intl.NumberFormat(
    "en-US",
    {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 2,
    }
);

export default formatMoney;