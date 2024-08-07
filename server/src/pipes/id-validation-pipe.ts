import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { idValidationConstant } from './id-validation.constant'
import { isNumber } from 'class-validator' // Ви можете налаштувати повідомлення про помилку за потреби

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (metadata.type !== 'param') {
            return value
        }
        if (!isNumber(value)) {
            throw new BadRequestException(idValidationConstant)
        }
        return value
    }
}
