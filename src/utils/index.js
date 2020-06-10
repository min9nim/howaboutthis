export const stop = fn => e => {
  e.stopPropagation()
  fn(e)
}

export const loading = loading => {
  if (loading) {
    window.NProgress.start()
  } else {
    window.NProgress.done()
  }
}
