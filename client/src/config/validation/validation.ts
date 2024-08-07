const REQUIRED_FIELD = 'Required to fill'
const EMAIL_FIELD = 'Email is not valid'
const FILE_FIELD = 'File is not valid'
// const htmlTagsWithOutTextInsideElemet =
//   /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/;
const htmlTagsRegularExpression =
    /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>([\w\s]+)[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/
const emailRegularExpression =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/ =?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\ [\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0 -9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5 [0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}( ?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[ a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])*$/
export const nameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string): boolean | string => {
        if (!value.match(htmlTagsRegularExpression)) {
            return 'Your html tag is not valid!'
        }
        if (value.match(/[а-яА-Я]/) != null) {
            return 'Only english letter'
        }
        return true
    },
}

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string): boolean | string => {
        if (!value.match(emailRegularExpression)) {
            return EMAIL_FIELD
        }
        return true
    },
}
export const requireString = {
    required: REQUIRED_FIELD,
}
export const passwordValidation = {
    required: REQUIRED_FIELD,
    minLength: {
        value: 8,
        message: 'Min length password is 8 letter',
    },
}

export const fileValidation = {
    validate: (value: any): boolean | string => {
        if (value.length > 0) {
            return true
        }
        return FILE_FIELD
    },
}
