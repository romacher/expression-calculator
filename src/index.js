function eval() {
    // Do not use eval or same features!!!
    return;
}


function isMatchingBrackets(str) {
    let stack = [];

    for (let i = 0; i < str.length; i++) {

        if (str[i] === '(') {
            stack.push(str[i]);
        }
        else if (str[i] === ')') {
            if (stack.pop() !== '(') return false;
        }
    }
    if (stack.length !== 0) return false;

    return true;
}

function expressionCalculator(expr) {
    
    if (typeof expr !== 'string') throw new TypeError('The [String] argument was expected.');

    if (isMatchingBrackets(expr) === false) throw new SyntaxError("ExpressionError: Brackets must be paired");

    const mulDiv = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
    const addSub = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
    const parentheses = /(\d)?\s*\(([^()]*)\)\s*/;

    const justNumber = /^[\s0]*[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?\s*$/;

    while (expr.search(justNumber) === -1){
        let prev = expr;
        expr = fPar(expr);
        if (expr === prev) throw new SyntaxError('The equation is invalid.');
    }
    return +expr;

    function fPar(eq) {
        while (eq.search(parentheses) !== -1) {
            eq = eq.replace(parentheses, function (a, b, c) {
                c = fMulDiv(c);
                c = fAddSub(c);
                return typeof b === 'string' ? b + '*' + c : c;
            });
        }
        eq = fMulDiv(eq);
        eq = fAddSub(eq);
        return eq;
    }

    function fMulDiv(eq) {
        while (eq.search(mulDiv) !== -1) {
            eq = eq.replace(mulDiv, function (a) {
                const sides = mulDiv.exec(a);
                let result;
                if (sides[2] === '*'){
                    result = sides[1] * sides[3];
                } else {
                    if (sides[3] == 0) throw new TypeError("TypeError: Division by zero.");
                    result = sides[1] / sides[3];
                }
                return result >= 0 ? '+' + result : result;
            });
        }
        return eq;
    }

    function fAddSub(eq) {
        eq = eq.replace(/([+-])([+-])(\d|\.)/g, function (a, b, c, d) { return (b === c ? '+' : '-') + d; });
        while (eq.search(addSub) !== -1) {
            eq = eq.replace(addSub, function (a) {
                const sides = addSub.exec(a);
                return sides[2] === '+' ? +sides[1] + (+sides[3]) : sides[1] - sides[3];
            });
        }
        return eq;
    }
}

if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports) {
    module.exports = {
        expressionCalculator
    }
}

//console.log(expressionCalculator("2*3"));