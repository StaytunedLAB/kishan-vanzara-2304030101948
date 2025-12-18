let str = "jayesh";

let rev = str.split("").reverse().join("");

if (str === rev)
    console.log("Palindrome String");
else
    console.log("Not a Palindrome String");