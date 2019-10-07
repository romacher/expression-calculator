function expressionCalculator(expr) {
    let q = expr.replace(/\s/g, '');
    let w = q.split(/(\+||\-||\*||\\)/);
    let finArr = [];
    for ( let i=0; i<w.length; i++) {
        switch ( w[i] ) {
            case '' : {
                break;
            };
            case '*' : {
                finArr.push ( w[i-1] * w[i+1] );
                i += 2;
                break;
            };
            case '\\' : {
                finArr.push ( w[i-1] / w[i+1] );
                i += 2;
                break;
            };
            case '+' : {
                finArr.push ( w[ i-1 ]/1 + w[ i+1]/1 );
                i += 2;
                break;
            };
            case '-' : {
                finArr.push ( w[ i-1]/1 - w[i+1]/1 );
                i += 2;
                break;
            };
            default : {
                finArr.push ( w[i] );
            };
        };
    };
    console.log ( finArr );
};
expressionCalculator('2 + 2-5*61');