function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let q = expr.replace(/\s/g, '');
    let numbers = q.split(new RegExp("[\/\*\+\-]")); 
    let symbols = [];
    console.log ( expr );
    console.log ( numbers.join('_') );
    
    for ( let i = 0; i<q.length; i++ ) {
        if ( q[i] === "+" || q[i] === "-" || q[i] === "*" || q[i] === "/" ) symbols.push( q[i] );
    }    
    console.log ( symbols.join('_') );
    while ( symbols.indexOf("*") + symbols.indexOf("/") > -2 ) {        
        for ( let i = 0; i<symbols.length ; i++) {    
            if ( symbols[i] === "*" || symbols[i] === "/") {       
                numbers[i] = symbols[i] === "*" ? numbers[ i ] * numbers[ i+1 ] : numbers[ i ] / numbers[ i+1 ];
                    for ( let j = i + 1 ; j < numbers.length ; j++ ) {
                        numbers[j] = numbers[ j+1 ];                                  
                    };
                    for ( let j = i; j < symbols.length ; j++ ) {
                        symbols[j] = symbols[ j+1 ];
                    };    
                    numbers.length -= 1;
                    symbols.length -= 1;             
                }           
            }
    };
    while ( symbols.indexOf("+") + symbols.indexOf("-") > -2 ) {  
        for ( let i = 0; i<symbols.length ; i++) {    
            if ( symbols[i] === "+" || symbols[i] === "-") {       
                numbers[i] = symbols[i] === "+" ? numbers[ i ]/1 + numbers[ i+1 ]/1 : numbers[ i ]/1 - numbers[ i+1 ]/1;
                    for ( let j = i + 1 ; j < numbers.length ; j++ ) {
                        numbers[j] = numbers[ j+1 ];                                  
                    };
                    for ( let j = i; j < symbols.length ; j++ ) {
                        symbols[j] = symbols[ j+1 ];
                    };    
                numbers.length -= 1;
                symbols.length -= 1;             
            }           
        };
    }; 
    return numbers[0];
}

module.exports = {
    expressionCalculator
}


