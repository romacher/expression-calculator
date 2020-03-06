function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let operations = {
        '+': {
            perform: (a, b) => a + b
        },
        '-': {
            perform: (a, b) => a - b
        },
        '*': {
            perform: (a, b) => a * b
        },
        '/': {
            perform: (a, b) => b != 0 ? a / b : (() => { throw new Error('TypeError: Division by zero.') })()
        }
    }

    function validate(input) {

        function tokenize(input) {
            let sign;
            return input.match(/[^\d()]+|[\d.]+|[()]+/g).reduce((output, current) => {
                if (['+-', '--', '-+', '-/', '/-', '*-', '-*'].includes(current)) {
                    output = output.concat(['-/', '-*'].includes(current) ? current[1] : current[0]);
                    sign = current[1];
                } else
                if (current.split('').includes('(') ||
                    current.split('').includes(')')) {
                    output = output.concat(current.split(''));
                } else {
                    output.push(sign == '-' ? `-${current}` : current);
                    sign = '';
                }
                return output;
            }, []);
        }

        let throwInvalidExpressionException = () => { throw new Error('ExpressionError: Brackets must be paired'); };

        if (input.split('').reduce((balance, current) => {
                if (current == '(') balance++;
                if (current == ')') balance--;
                if (balance < 0) throwInvalidExpressionException();
                return balance;
            }, 0) != 0) throwInvalidExpressionException();

        return {
            tokenize: (input) => tokenize(input)
        }
    }

    function produce(tokens) {

        function process(operation, index, tokens) {
            tokens.splice(index - 1, 3, operations[operation].perform(Number(tokens[index - 1]), Number(tokens[index + 1])));
        }

        tokens.filter(p => ['*', '/'].includes(p))
            .forEach(operation => {
                process(operation, tokens.indexOf(operation), tokens);
            });

        tokens.filter(p => ['+', '-'].includes(p))
            .forEach(operation => {
                process(operation, tokens.indexOf(operation), tokens);
            });

        return Number(tokens.join(''));
    }

    tokens = validate(expr).tokenize(expr.replace(/\s/g, ''));

    while (tokens.includes('(') || tokens.includes(')')) {
        let lastOpenTag = tokens.lastIndexOf('(');
        let firstCloseTag = tokens.indexOf(')', lastOpenTag);
        tokens.splice(lastOpenTag, (firstCloseTag - lastOpenTag) + 1, produce(tokens.slice(lastOpenTag + 1, firstCloseTag)));
    }

    return produce(tokens);

}

module.exports = {
    expressionCalculator
}