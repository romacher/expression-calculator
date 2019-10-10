function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr
        .replace("+", " + ")
        .replace("-", " - ")
        .replace("*", " * ")
        .replace("/", " / ")
        .replace("(", " ( ")
        .replace(")", " ) ");

    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    const priority = {
        '+': 2,
        '-': 2,
        '*': 3,
        '/': 3,
        '(': 0,
        ')': 1,
    };
    let outLine = [];
    let stack = [];
    const reg = /\s+/g;

    expr.trim().split(reg).forEach((el) => {
        if (el in priority) {
            if (stack.length === 0)
                stack.push(el);
            else if (el === ')') {
                for (let i = stack.length - 1; i >= 0; i--) {
                    if (stack[i] !== '(') {
                        outLine.push(stack.pop());
                    } else {
                        stack.splice(-1, 1);
                        break;
                    }
                }
            } else {
                for (let i = stack.length; i >= 0; i--) {
                    if (stack.length !== 0 && (priority[stack[stack.length - 1]] >= priority[el])) {
                        if (el === '(') {
                            stack.push(el);
                            break;
                        } else
                            stack.length === 0 ? stack.push(el) : outLine.push(stack.pop());
                    } else {
                        stack.push(el);
                        break;
                    }
                }
            }
        } else {
            outLine.push(el);
        }
    });
    if (stack.length !== 0)
        for (let i = stack.length - 1; i >= 0; i--) {
            outLine.push(stack.pop());
        }

    for (let i = 0; outLine.length>=i; i++ )
            if (outLine[i] in operators) {
                let [a, b] = [
                    Number(outLine.splice(i - 2, 1)),
                    Number(outLine.splice(i - 2, 1))];
                outLine[i-2] = operators[outLine[i-2]](a, b);
                i = i-2;
            }

    return !outLine[0].isNaN ? outLine.pop() : null;
}

module.exports = {
    expressionCalculator
}
