const amount = document.getElementById("amount");
const converted = document.getElementById("Converted");
const currencySelectFrom = document.getElementById("currency-select-from");
const currencySelectTo = document.getElementById("currency-select-to");
const button = document.querySelector("button");

const url = "https://v6.exchangerate-api.com/v6/d627809b149970c8f1acd519/latest/USD";

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

button.addEventListener("click", async() => {
    const moneyAmount = amount.value;
    const from = currencySelectFrom.value;
    const to = currencySelectTo.value;
    if (!moneyAmount || isNaN(moneyAmount)) {
        alert("Please enter a valid amount");
        return;
    }
    const data = await fetchData();
    if (data && data.conversion_rates) {
        const rate = data.conversion_rates[to] / data.conversion_rates[from];
        console.log("Exchange Rate:", rate);
        if (rate) {
            const convertedMoney = moneyAmount * rate.toFixed(4);
            converted.value = convertedMoney;
        } else {
            console.error("Currency not found in exchange rates");
            alert("Currency not supported");
        }
    }
});