function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  

  let result = expr

  while (/\(|\)/gm.test(result)) {
    result = result.replace(/\([^\(\)]+\)/gm, match => expressionCalculator(match.slice(1, match.length - 1)))
  }

  if (/\+[\s]*\-/gm.test(result)) {
    result = result.replace(/\+[\s]*\-/gm, () => '-')
  }

  if (/\*[\s]*\-/gm.test(result)) {
    result = result.replace(/\*[\s]*\-/gm, () => 'NM')
  }

  if (/\/[\s]*\-/gm.test(result)) {
    result = result.replace(/\/[\s]*\-/gm, () => 'ND')
  }

  if (/[^\+|^\s]+/gm.test(result)) {
    result = result.match(/[^\+|^\s]+/gm).reduce((acc, fragment) => {

      let preResult = fragment

      if (/\-/gm.test(result)) {
        preResult = result.match(/\-/gm).reduce((acc, innerFragment) => {
          return acc - expressionCalculator(fragment)
        })
      }

      acc + expressionCalculator(preResult)
    })
  }


  // while (/[^\+|^\-|^\s]+/gm.test(result)) {
  //   result = result.replace(/[^\+|^\-|^\s]+/gm, match => expressionCalculator(match))
  // }


  // NM, ND, M, D

  
}

module.exports = {
  expressionCalculator
}