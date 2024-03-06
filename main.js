document.addEventListener("DOMContentLoaded", function () {
    const buttonsDiv = document.getElementById("calculator");
    const inp = document.getElementById("inp");
    let operand1 = "";
    let operand2 = "";
    let math_operand = "";
    const buttons = [
        { text: "AC", value: "AC" },
        { text: "+/-", value: "" },
        { text: "%", value: "" },
        { text: "/", value: "/" },
        { text: "7", value: "7" },
        { text: "8", value: "8" },
        { text: "9", value: "9" },
        { text: "*", value: "*" },
        { text: "4", value: "4" },
        { text: "5", value: "5" },
        { text: "6", value: "6" },
        { text: "-", value: "-" },
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "+", value: "+" },
        { text: "0", value: "0" },
        { text: ",", value: "." },
        { text: "=", value: "=" },
    ];

    buttons.forEach((button) => {
        let btn = document.createElement("button");
        btn.innerText = button.text;
        btn.value = button.value;
        btn.addEventListener("click", () => handleButtonClick(btn.value));
        buttonsDiv.appendChild(btn);
    });

    let operators = {
        "+": function () {
            inp.value = +operand1 + +operand2;
            operand1 = inp.value;
            operand2 = "";
            math_operand = "";
        },
        "-": function () {
            inp.value = +operand1 - +operand2;
            operand1 = inp.value;
            operand2 = "";
            math_operand = "";
        },
        "*": function () {
            inp.value = +operand1 * +operand2;
            operand1 = inp.value;
            operand2 = "";
            math_operand = "";
        },
        "/": function () {
            if (operand2 === "0") {
                inp.value = "error";
            } else {
                inp.value = +operand1 / +operand2;
                operand1 = inp.value;
                operand2 = "";
                math_operand = "";
            }
        },
    };

    function handle(val) {
        if (math_operand !== "") {
            inp.value = operand2;
            inp.value += val;
            operand2 += val;
        } else {
            inp.value += val;
            operand1 += val;
        }
    }

    function handleButtonClick(value) {

        if (isNumber(value) || value === ".") {
            handle(value);
        } else if (value === "+" || value === "-" || value === "*" || value === "/") {
            action(value);
        } else if (value === "=") {
            calculateResult()
        } else if (value === "AC") {
            clearClick();
        } else if (value === "+/-") {
            negandpos();
        } else if (value === "%") {}
    }

    function isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function action(str) {
        if (operand2) {
            condition();
            inp.value = operand1;
        } else {
            inp.value = "";
        }
        math_operand = str;
    }

    function calculateResult() {
        if (operand1 && math_operand) {
            condition();
            inp.value = operand1;
            operand2 = "";
            math_operand = "";
        }
    }
    
    function condition() {
        if (operators[math_operand]) {
            operators[math_operand]();
            console.log("After operation:", operand1);
            operand1 = inp.value;
            operand2 = "";
            math_operand = "";
        } else {
            alert("Not Defined");
        }
    }
    function clearClick() {
        inp.value = "";
        operand1 = "";
        operand2 = "";
        math_operand = "";
    }

    function negandpos() {
        if (math_operand !== "") {
            operand2 = negateValue(+inp.value);
        } else {
            operand1 = negateValue(+inp.value);
        }
        inp.value = operand1;
    }

    function negateValue(value) {
        return value > 0 ? "-" + value : value.toString().slice(1);
    }
});