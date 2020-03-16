function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let result = expr

  /* replace spaces */
  result = result.replace(/\s+/gm, () => '')

  /* try to treat expr as a number */
  if (!isNaN(+result)) return +result  
  
  /* deal with brackets */
  if (/\(|\)/gm.test(result)) {
    const openBracketMatch = result.match(/\(/gm)
    const closeBracketMatch = result.match(/\)/gm)

    if (
      openBracketMatch === null ||
      closeBracketMatch === null ||
      openBracketMatch.length !== closeBracketMatch.length
    ) throw "ExpressionError: Brackets must be paired"

    while (/^(?=.*\()(?=.*\)).*$/gm.test(result)) {
      result = result.replace(/\([^\(|^\)]*\)/gm, match => expressionCalculator(match.slice(1, match.length - 1)))
    }
    
    return expressionCalculator(result)
  }
  
  /* replace complex operators */
  result = result.replace(/\+\-/gm, () => '-')
  result = result.replace(/SMSM/gm, () => '')
  result = result.replace(/\-\-/gm, () => '+')
  result = result.replace(/\*\-/gm, () => 'NM')
  result = result.replace(/\/\-/gm, () => 'ND')

  /* make addition  */
  if (/\+/gm.test(result)) {
    return result.match(/[^\+]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc + fragment)
  }

  /* make substraction */
  if (/\-/gm.test(result)) {
    result = result.replace(/^\-/gm, () => 'SM')

    return result.match(/[^\-]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc - fragment)
  }
  
  /* make positive multiplying */
  if (/\*/gm.test(result)) {
    return result.match(/[^\*]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc * fragment)
  }

  /* make negative multiplying */
  if (/NM/gm.test(result)) {
    return result.match(/[^NM]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => - (acc * fragment))
  }

  /* deal with negative division */
  if (/ND/gm.test(result)) {
    const NDMatch = result.match(/ND/gm)
    result = result.replace(/ND/gm, () => '/')
    result = NDMatch.length % 2 === 0 ? result : `SM${result}`
  }
    
  /* make positive division */
  if (/\//gm.test(result)) {
    result = result.match(/[^\/]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc / fragment)
      
    if (result === Infinity) throw "TypeError: Division by zero."
    return result
  }

  /* replace back a start minus and return a result */
  return result.replace(/^SM/, () => '-')
}

module.exports = {
  expressionCalculator
}