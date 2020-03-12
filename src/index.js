function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  console.error('on start', expr)
  let result = expr

  result = result.replace(/\s+/gm, () => '')
  console.error('after space replace', result)



  if (!isNaN(+result)) {
    console.error('number check pass', +result)
    return +result
  }
  
  
  if (/\(|\)/gm.test(result)) {
    const openBracketMatch = result.match(/\(/gm)
    const closeBracketMatch = result.match(/\)/gm)

    console.error('before brackets check', openBracketMatch, closeBracketMatch)

    if (openBracketMatch === null || closeBracketMatch === null || openBracketMatch.length !== closeBracketMatch.length) throw "ExpressionError: Brackets must be paired"

    while (/\(|\)/gm.test(result)) {
      result = result.replace(/\([^\(|^\)]+\)/gm, match => {
        console.error(`before brackets matching. match: ${match}, expression in brackets: ${match.slice(1, match.length - 1)}`)

        return expressionCalculator(match.slice(1, match.length - 1))
      })
    }

    console.error('after ( ) replace', result)

    const outerResult = expressionCalculator(result)

    console.error('after ( ) replace outerResult: ', outerResult)

    return outerResult
  }
  
  result = result.replace(/\+\-/gm, () => '-')
  result = result.replace(/\-\-/gm, () => '+')
  result = result.replace(/\*\-/gm, () => 'NM')
  result = result.replace(/\/\-/gm, () => 'ND')

  console.error('after +- -- *- /- replace', result)


  if (/\+/gm.test(result)) {
    console.error('before addition', result)

    result = result.match(/[^\+]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc + fragment)

    console.error('after addition', result)
    return result
  }

  

  if (/\-/gm.test(result)) {
    
    console.error('before start minus replace', result)
    result = result.replace(/^\-/gm, () => 'SM')
    console.error('after start minus replace', result)


    console.error('before subtraction', result)
    result = result.match(/[^\-]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc - fragment)

    console.error('after subtraction', result)
    return result
  }

  

  if (/\*/gm.test(result)) {
    console.error('before positive multiplication', result)

    result = result.match(/[^\*]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc * fragment)

    console.error('after positive multiplication', result)
    return result
  }

  if (/NM/gm.test(result)) {
    console.error('before negative multiplication', result)

    result = result.match(/[^NM]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => - (acc * fragment))

    console.error('after negative multiplication', result)
    return result
  }

  if (/\//gm.test(result)) {
    console.error('before positive division', result)

    result = result.match(/[^\/]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => acc / fragment)
      
    if (result === Infinity) throw "TypeError: Division by zero."

    console.error('after positive division', result)
    return result
  }

  if (/ND/gm.test(result)) {
    console.error('before negative division', result)

    result = result.match(/[^ND]+/gm)
      .map(fragment => expressionCalculator(fragment))
      .reduce((acc, fragment) => - (acc / fragment))
    
    if (result === Infinity) throw "TypeError: Division by zero."

    console.error('after negative division', result)
    return result
  }

  console.error('before start minus replace back', result)
  return result.replace(/^SM/gm, () => '-')
  console.error('after start minus replace back', result)

  console.error('untreated...', result)
}

module.exports = {
  expressionCalculator
}