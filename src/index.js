function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    console.log(expr);

    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '(': ')'
    };

        let stack = [];

        expr.split(' ').join('').split('').forEach((el) => {
            console.log(el);

            if (el in operators) {

                stack.push(operators);
            } else {
                stack.push(el);
            }
            console.log(stack);
        });

        return stack.pop();

}

module.exports = {
    expressionCalculator
}
