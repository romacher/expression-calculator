function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  console.error('on start', expr)
  let result = expr

  result = result.replace(/\s+/gm, () => '')

  console.error('after space replace', expr)
  
  if (!isNaN(+result)) {
    console.error('number check pass', expr)
    return +result
  }
  
  
  if (/\(|\)/gm.test(result)) {
    while (/\(|\)/gm.test(result)) {
      result = result.replace(/\([^\(\)]+\)/gm, match => expressionCalculator(match.slice(1, match.length - 1)))
    }

    console.error('after ( ) replace', expr)

    return result
  }
  
  result = result.replace(/\+\-/gm, () => '-')
  result = result.replace(/\-\-/gm, () => '+')
  result = result.replace(/\*\-/gm, () => 'NM')
  result = result.replace(/\/\-/gm, () => 'ND')

  console.error('after +- -- *- /- replace', result)


  if (/\+/gm.test(result)) {
    result = result.match(/[^\+]+/gm)
      .reduce((acc, fragment) => acc + expressionCalculator(fragment), 0)

      console.error('after addition', result)
    return result
  }

  

  if (/\-/gm.test(result)) {
    result = result.match(/[^\-]+/gm)
      .reduce((acc, fragment) => acc - expressionCalculator(fragment))

    console.error('after subtraction', result)
    return result
  }

  

  if (/\*/gm.test(result)) {
    result = result.match(/[^\*]+/gm)
      .reduce((acc, fragment) => acc * expressionCalculator(fragment), 1)

    console.error('after positive multiplication', result)
    return result
  }

  if (/NM/gm.test(result)) {
    result = result.match(/[^NM]+/gm)
      .reduce((acc, fragment) => - (acc * expressionCalculator(fragment)), 1)

    console.error('after negative multiplication', result)
    return result
  }

  if (/\//gm.test(result)) {
    result = result.match(/[^\/]+/gm)
      .reduce((acc, fragment) => acc / expressionCalculator(fragment))
      
    if (result === Infinity) throw "TypeError: Division by zero."

    console.error('after positive division', result)
    return result
  }

  if (/ND/gm.test(result)) {
    result = result.match(/[^ND]+/gm)
      .reduce((acc, fragment) => - (acc / expressionCalculator(fragment)))
    
    console.error('after negative division', result)
    return result
  }

  console.error('untreated...', result)
}

module.exports = {
  expressionCalculator
}