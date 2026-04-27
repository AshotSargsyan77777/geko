const transactions = [
    { id: "T001", info: "  apple.com/bill  ", amount: "1200.50 USD", date: "2023-10-01" },
    { id: "T002", info: "Sberbank Transfer", amount: "5000.00 RUB", date: "2023-10-01" },
    { id: "T003", info: "APPLE.COM/BILL", amount: "1200.50 USD", date: "2023-10-01" },
    { id: "T004", info: " Netflix Subscription ", amount: "15.99 USD", date: "2023-10-02" },
    { id: "T005", info: "Amazon Web Services", amount: "450.00 USD", date: "2023-10-03" },
    { id: "T006", info: "Apple.com/bill", amount: "30.00 USD", date: "2023-10-04" }
];

function normalizeData(data) {
    return data.map(t => {
        let info = t.info.trim().toLowerCase();
        let [valueStr, currency] = t.amount.split(" ");
        let value = parseFloat(valueStr);

        if (currency === "RUB") {
            value = +(value / 90).toFixed(2);
            currency = "USD";
        }

        return {
            id: t.id,
            info,
            amount: { value, currency },
            date: t.date
        };
    });
}

function removeDuplicates(data) {
    return data.filter((item, index, arr) =>
        index === arr.findIndex(t =>
            t.info === item.info &&
            t.amount.value === item.amount.value &&
            t.date === item.date
        )
    );
}

function groupByInfo(data) {
    return data.reduce((acc, item) => {
        if (!acc[item.info]) acc[item.info] = [];
        acc[item.info].push(item);
        return acc;
    }, {});
}

function getTotalUSD(data) {
    return data.reduce((sum, item) => sum + item.amount.value, 0);
}

let normalized = normalizeData(transactions);
let unique = removeDuplicates(normalized);
let grouped = groupByInfo(unique);
let total = getTotalUSD(unique);

console.log(unique);
console.log(grouped);
console.log(total.toFixed(2));