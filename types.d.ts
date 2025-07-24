type ResT<T> = {
  success: {
    data: T
  } | null
  error: {
    message: string
  } | null
}
