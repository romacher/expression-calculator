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
            /* stack.length === 0 ? stack.push(el)
                 : (priority[stack[stack.length - 1]] === 1)
                 ? stack.reverse()[stack.length - 1]
                 forEach(el => el !== '(' // если последний элемент в стэке
                     ? outLine.push(stack.reverse().pop()) : stack.reverse().slice(0, -1))
                 : (priority[stack[stack.length - 1]] >= priority[el]) ? stack.reverse().forEach(el => priority[el] >= priority[this.el]
                     ? outLine.push(stack.reverse().pop()) : stack.push(el)):stack.reverse();*/
        } else {
            outLine.push(el);
        }
    });
    if (stack.length !== 0)
        for (let i = stack.length - 1; i >= 0; i--) {
            outLine.push(stack.pop());
        }


    outLine.map((el, i) => {
            if (el in operators) {
                let [a, b] = [
                    Number(outLine.splice(i - 2, 1)),
                    Number(outLine.splice(i - 2, 1))];
                outLine[i-2] = operators[el](a, b);
                i = i + 2;
            }
        }
    );

    return console.log(outLine.pop());

}

module.exports = {
    expressionCalculator
}
