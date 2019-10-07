function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arr = expr.split(RegExp(/\+||\-||\*||\\/));
    
    while ( arr.length >1 ) {
        let fArr = [];
        for ( let i = 0; i< arr.length; i ++ ) {
            switch ( arr [i] ) {
                case "*" : {
                    fArr.push ( arr[ i-1 ]/1 * arr[ i+1 ]/1 );
                    i += 2;
                    break;
                };
                case "\\" : {
                    fArr.push ( arr[ i-1 ]/1 / (arr[ i+1 ]/1) );
                    i += 2;
                    break;
                };
                case "+" : {
                    fArr.push ( arr[ i-1 ]/1 + arr[ i+1 ]/1 );
                    i += 2;
                    break;
                };
                case "-" : {
                    fArr.push ( arr[ i-1 ]/1 - arr[ i+1 ]/1 );
                    i += 2;
                    break;
                };
                default : {
                    fArr.push ( arr[i] )
                };
            };        
        };
        arr = fArr;
    }
    return arr[0];
}

module.exports = {
    expressionCalculator
}


