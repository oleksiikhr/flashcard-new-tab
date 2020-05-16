export default (up, down) => {
  if (!up && !down) {
    return '-'
  }

  if (up && !down) {
    return '10.0'
  }

  if (!up && down) {
    return '0.0'
  }

  if (down > up) {
    return '0.0'
  }

  if (down === up) {
    return '5.0'
  }

  return (10 - (down * 10 / up)).toFixed(1)
}
