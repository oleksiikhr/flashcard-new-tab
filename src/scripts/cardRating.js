export default (up, down) => {
  if (!up || !down) {
    return '-'
  }

  if (!down) {
    return '10.0'
  }

  if (!up || down > up) {
    return '0.0'
  }

  return (10 - (down * 10 / up)).toFixed(1)
}
