const REQUIRED_FIELD = 'Required to fill'
const EMAIL_FIELD = 'Email is not valid'
const MIN_EIGHT_LETTER = 'Min length password is 8 letter'

const emailRegularExpression =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/ =?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\ [\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0 -9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5 [0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}( ?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[ a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])*$/

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string): boolean | string => {
        if (!value.match(emailRegularExpression)) {
            return EMAIL_FIELD
        }
        return true
    },
}
export const passwordValidation = {
    required: REQUIRED_FIELD,
    minLength: {
        value: 8,
        message: MIN_EIGHT_LETTER,
    },
}
