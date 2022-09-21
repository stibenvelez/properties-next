


export const formatMoney = (value:number) => {
   let money = Intl.NumberFormat("en-US", {
       style: "currency",
       currency: "USD",
       useGrouping: false,
   });
    return money.format(value);
}