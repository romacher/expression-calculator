function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let isFinite = false;
    let arr = expr.split(RegExp(/\+||\-||\*||\\/));
    let arrLength = arr.length;
    while ( !isFinite ) {
        for ( let i = 1; i<arr.length; i++ ) {
            if ( arr[i] === "*") { 
                arr[ i-1 ] = arr[ i-1 ] * arr[ i+1 ]; 
                for( let j = i ; j<2 ; j++) {
                    arr.unshift(arr.pop());
                    arrLength -= 1;
                }
            };
        };
        for ( let i = 1; i< arr.length; i ++) {
            if ( arr[i] === "\\") { 
                arr[ i-1 ] = arr[ i-1 ] / arr[ i+1 ];
                for( let j = i ; j<2 ; j++) {
                    arr.unshift(arr.pop());
                    arrLength -= 1;
                };
            }
        };
        for ( let i = 1; i< arr.length; i ++) {
            if ( arr[i] === "+") { 
                arr[ i-1 ] = arr[ i-1 ] + arr[ i+1 ];
                for( let j = i ; j<2 ; j++) {
                    arr.unshift(arr.pop());
                    arrLength -= 1;
                }
            }
        };
        for ( let i = 1; i< arr.length; i ++) {
            if ( arr[i] === "-") {
                arr [ i-1 ] = arr[ i-1 ] + arr[ i+1 ];
                for( let j = i ; j<2 ; j++) {
                    arr.unshift(arr.pop());
                    arrLength -= 1;
                };
            }
        };           
        if ( arrLength === 1 ) { isFinite === true; }
    };    
    return arr[0];
}

module.exports = {
    expressionCalculator
}


