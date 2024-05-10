function isRegExp (potentialRegex) {
  return Object.prototype.toString.call(potentialRegex) === '[object RegExp]'
}

module.exports = function split (input, strOrRegex) {
  var results = []

  if (isRegExp(strOrRegex)) {
    var regex = new RegExp(strOrRegex.toString().slice(1, -1), 'g')
    var oldIndex = 0
    var match
    while ((match = regex.exec(input))) {
      results.push(input.substring(oldIndex, match.index))
      results.push(match[0])
      if (match.index === regex.lastIndex) throw new Error('No zero-width captures allowed')
      oldIndex = match.index + match[0].length
    }
    results.push(input.substring(oldIndex))
  } else {
    var splits = input.split(strOrRegex)
    var item
    for (var i = 0, l = splits.length; i < l - 1; i++) {
      item = splits[i]
      results.push(item)
      results.push(strOrRegex)
    }
    results.push(splits[splits.length - 1])
  }

  return results
}
