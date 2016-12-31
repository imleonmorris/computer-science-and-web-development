// Chapter 1

// -> obj: calc total price of phone
// -> keep purchasing until run out of money in bank acct
// -> buy accessories

const TAX_RATE = 0.08;
const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 5.99;
const SPEND_THRES = 500;

var bank_balance = prompt( "How much is in your bank account?" );

function calculateFinalPurchaseAmount(amt) {
   amt = amt + (amt * TAX_RATE);

    return amt;
}

function formatFinalPurchaseAmount(amt) {
    amt = "$" + String( amt.toFixed(); );

    return amt;
}

for ( var i = 0; i <= SPEND_THRES; i += 1; ) {
    var purchaseAmount = ACCESSORY_PRICE + PHONE_PRICE;

    return purchaseAmount
}

calculateFinalPurchaseAmount(purchaseAmount);
formatFinalPurchaseAmount(purchaseAmount);

if ( purchaseAmount < bank_balance ) {
    console.log( "You have enough money to spend" );
} else {
    console.log( "Sorry, there is not enough in your account today" );
}

// SOLUTION

const SPENDING_THRESHOLD = 200;
const TAX_RATE = 0.08;
const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;

var bank_balance = 303.91
var amount = 0;

function calculateTax(amount) {
    return amount * TAX_RATE;
}

function formatAmount(amount) {
    return "$" + amount.toFixed( 2 );
}

// keep buying phones while you still have money
while (amount < bank_balance) {
    // buy new phone!
    amount = amount + PHONE_PRICE;

    // can we afford the accessory?
    if (amount < SPENDING_THRESHOLD) {
        amount = amount + ACCESSORY_PRICE;
    }
}

// don't forget to pay the government, too
amount = amount + calculateTax( amount );

console.log (
    "Your purchase: " + formatAmount( amount )
);
// Your purchase: $334.76

// can you actually afford this purchase?
if (amount > bank_balance) {
    console.log (
        "You can't afford this purchase."
    );
}
// Can't afford this purchase.