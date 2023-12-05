type ApiErrorResponse = { [key: string]: string[] }
export type FormErrors = { [key: string]: string }

export function parseErrors(errors: ApiErrorResponse | null | undefined): FormErrors {
  if (!errors) {
    return {}
  }
  return Object.keys(errors).reduce((acc, val) => {
    acc[val] = errors[val].join(', ')
    return acc
  }, {} as FormErrors)
}

