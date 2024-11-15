export const validatePhone = (phone: string) => {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
  return phoneRegex.test(phone)
}

export const validateCardNumber = (cardNumber: string) => {
  const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/
  return cardRegex.test(cardNumber)
}

export const validateExpiry = (expiry: string) => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
  return expiryRegex.test(expiry)
}

export const validateCVV = (cvv: string) => {
  const cvvRegex = /^\d{3,4}$/
  return cvvRegex.test(cvv)
}

export const validateRoutingNumber = (routing: string) => {
  const routingRegex = /^\d{9}$/
  return routingRegex.test(routing)
}

export const validateAccountNumber = (account: string) => {
  const accountRegex = /^\d{8,17}$/
  return accountRegex.test(account)
}

export const validateZipCode = (zip: string) => {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zip)
}

export const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length === 0) return ''
  if (numbers.length <= 3) return `(${numbers}`
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
}

export const formatCardNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  const groups = numbers.match(/.{1,4}/g) || []
  return groups.join(' ').substr(0, 19)
}

export const formatExpiry = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length === 0) return ''
  if (numbers.length <= 2) return numbers
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`
}
