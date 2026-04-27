const state = {
    price: 500,
    balance: 10000,
    count: 0,
    history: [500]
};

const balance = document.getElementById("balance");
const price = document.getElementById("price");
const buyBtn = document.getElementById("buy");
const sellBtn = document.getElementById("sell");
const count = document.getElementById("count");
const chart = document.getElementById("chart");

function updatePrice(){
    setInterval(() => {
        const old_price = state.price;

        const k = Math.random() > 0.5 ? 1 : -1;
        let random = Math.floor(Math.random() * state.price * 0.04);
        random *= k;

        state.price += random;

        if (old_price > state.price) {
            price.style.color = "#f00";
        } else if (old_price < state.price) {
            price.style.color = "#0f0";
        } else {
            price.style.color = "#ccc";
        }

        state.history.push(state.price);

        if (state.history.length > 120) {
            state.history.shift();
        }

        render();
    }, 2000);
}

function drawChart() {
    chart.innerHTML = "";

    const max = Math.max(...state.history);

    state.history.forEach((p, i) => {
        const bar = document.createElement("div");
        bar.className = "bar";

        const height = (p / max) * 100;
        bar.style.height = height + "%";

        if (i > 0) {
            if (p > state.history[i - 1]) {
                bar.style.background = "#0f0";
            } else if (p < state.history[i - 1]) {
                bar.style.background = "#f00";
            } else {
                bar.style.background = "#ccc";
            }
        }

        chart.appendChild(bar);
    });
}

function render(){
    balance.textContent = state.balance;
    price.textContent = state.price;
    count.textContent = state.count;
    drawChart();
}

buyBtn.addEventListener("click", () => {
    if (state.balance < state.price) {
        alert("Anbavarar mijocner");
    } else {
        state.count++;
        state.balance -= state.price;
    }
    render();
});

sellBtn.addEventListener("click", () => {
    if (state.count < 1) {
        alert("Dollar chuneq el");
    } else {
        state.count--;
        state.balance += state.price;
    }
    render();
});

updatePrice();
render();