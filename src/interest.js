

function simpleInterest(p, r, t) {
    return (p * r * t) / 100;
}

function compoundInterest(p, r, t) {
    return p * Math.pow((1 + r / 100), t) - p;
}


let principal = 10000;   
let rate = 10;           
let time = 2;            

let si = simpleInterest(principal, rate, time);
let ci = compoundInterest(principal, rate, time);

console.log("Simple Interest: ₹" + si);
console.log("Compound Interest: ₹" + ci);
