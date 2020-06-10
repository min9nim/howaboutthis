export const stop = fn => e => {
  e.stopPropagation()
  fn(e)
}
