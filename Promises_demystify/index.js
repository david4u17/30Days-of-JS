// Order Pizza and beverages from nearby shop

const fetchNearByShop = ({ longi, lat }) => {
    console.log(`🧭 Locating the nearby shop at (${longi} ${lat})`);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            // Let's assume, it is a nearest pizza shop
            // and resolve the shop id.
            const response = {
                shopId: "s-123",
            };
            resolve(response.shopId);
        }, 1000);
    });
}

const fetchAvailablePizzas = ({ shopId }) => {
    console.log(`Getting Pizza List from the shop ${shopId}...`);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const response = {
                // The list of pizzas 
                // available at the shop
                pizzas: [
                    {
                        type: "veg",
                        name: "margarita",
                        id: "pv-123",
                    },
                    {
                        type: "nonveg",
                        name: "pepperoni slice",
                        id: "pnv-124",
                    },
                ],
            };
            resolve(response);
        }, 1000);
    });
}


let getMyPizza = (result, type, name) => {
    let pizzas = result.pizzas;
    console.log("Got the Pizza List", pizzas);
    let myPizza = pizzas.find((pizza) => {

        return (pizza.type === type && pizza.name === name);
    });
    return new Promise((resolve, reject) => {
        if (myPizza) {
            console.log(`✔️ Found the Customer Pizza ${myPizza.name}!`);
            resolve(myPizza);
        } else {
            reject(
                new Error(
                    `❌ Sorry, we don't have ${type} ${name} pizza. Do you want anything else?`
                )
            );
        }
    });
};


const fetchBeverages = ({ pizzaId }) => {
    console.log(`🧃 Getting Beverages for the pizza ${pizzaId}...`);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const response = {
                id: "b-10",
                name: "cola",
            };
            resolve(response);
        }, 1000);
    });
}


let create = (endpoint, payload) => {
    if (endpoint.includes(`/api/pizzahub/order`)) {
        console.log("Placing the pizza order with...", payload);
        const { type, name, beverage } = payload;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve({
                    success: true,
                    orderId: 69,
                    message: `🍕 The ${type} ${name} pizza order with ${beverage} has been placed successfully.`,
                });
            }, 1000);
        });
    }
};


function fetch(endpoint, payload) {
    if (endpoint.includes("/api/pizzahub/shop")) {
        return fetchNearByShop(payload);
    } else if (endpoint.includes("/api/pizzahub/pizza")) {
        return fetchAvailablePizzas(payload);
    } else if (endpoint.includes("/api/pizzahub/beverages")) {
        return fetchBeverages(payload);
    }
}

let handleDelivery = (orderId) => {
    console.log(`Order with ${orderId} is on the way`);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(`Order ${orderId} is delivered`);
        }, 2000)
    })
}


function orderPizza(type, name) {
    // Get the Nearby Pizza Shop
    fetch("/api/pizzahub/shop", { 'longi': 38.8951, 'lat': -77.0364 })
        // Get all pizzas from the shop  
        .then((shopId) => fetch("/api/pizzahub/pizza", { 'shopId': shopId }))
        // Check the availability of the selected pizza
        .then((allPizzas) => getMyPizza(allPizzas, type, name))
        // Check the availability of the selected beverage
        .then((pizza) => fetch("/api/pizzahub/beverages", { 'pizzaId': pizza.id }))
        // Create the order
        .then((beverage) =>
            create("/api/pizzahub/order", {
                beverage: beverage.name,
                name: name,
                type: type,
            })
        )
        .then((result) => {
            console.log(result.message)

            return handleDelivery(result.orderId);
        })

        .then((orderResult) => console.log(orderResult))

        .catch(function (error) {
            console.error(`${error.message}`);
        });
}

// Order Pizza
orderPizza("nonveg", "pepperoni slice");

// =========================================//===========================





