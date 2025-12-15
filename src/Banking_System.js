function processBankAccount(accountData) {
  let result = {
    accountNumber: accountData.accountNumber,
    accountHolder: accountData.accountHolder,
    currency: accountData.currency,
    initialBalance: 0,
    finalBalance: 0,
    appliedTransactions: [],
    rejectedTransactions: []
  };

  try {
    // 1️⃣ Initial balance validation
    let balance = Number(accountData.initialBalance);
    if (isNaN(balance)) throw new Error("Invalid initial balance");
    result.initialBalance = balance;

    // 2️⃣ Process transactions
    for (let tx of accountData.transactions) {
      try {
        let amount = Number(tx.amount);

        if (!tx.type) throw new Error("Transaction type missing");
        if (isNaN(amount)) throw new Error("Invalid amount");
        if (amount <= 0) throw new Error("Amount must be positive");

        if (tx.type === "deposit") {
          balance += amount;
          result.appliedTransactions.push(tx);

        } else if (tx.type === "withdraw") {
          if (amount > balance) {
            result.rejectedTransactions.push({
              transaction: tx,
              reason: "Insufficient balance"
            });
          } else {
            balance -= amount;
            result.appliedTransactions.push(tx);
          }

        } else {
          throw new Error("Unknown transaction type");
        }

      } catch (err) {
        result.rejectedTransactions.push({
          transaction: tx,
          reason: err.message
        });
      }
    }

    result.finalBalance = balance;

  } catch (err) {
    result.rejectedTransactions.push({
      reason: "System Error: " + err.message
    });
  } finally {
    console.log("✅ Transaction processing completed");
  }

  // 3️⃣ Output
  console.log("Account No:", result.accountNumber);
  console.log("Holder:", result.accountHolder);
  console.log("Currency:", result.currency);
  console.log("Initial Balance:", result.initialBalance);
  console.log("Final Balance:", result.finalBalance);
  console.log("Applied Transactions:", result.appliedTransactions);
  console.log("Rejected Transactions:", result.rejectedTransactions);
}


// 🔹 Sample Input
const accountData = {
  accountNumber: "ACC101",
  accountHolder: "Kishan Vanzara",
  initialBalance: "5000",
  currency: "INR",
  transactions: [
    { type: "deposit", amount: "1000" },
    { type: "withdraw", amount: 3000 },
    { type: "withdraw", amount: 4000 },
    { type: "deposit", amount: "-200" },
    { type: "transfer", amount: 500 }
  ]
};

// 🔹 Run
processBankAccount(accountData);
