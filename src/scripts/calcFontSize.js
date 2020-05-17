export default (text) => {
  let fontSize

  if (text.length < 20) {
    fontSize = 40
  } else if (text.length < 40) {
    fontSize = 36
  } else if (text.length < 60) {
    fontSize = 32
  } else if (text.length < 80) {
    fontSize = 28
  } else {
    fontSize = 24
  }

  return fontSize
}
