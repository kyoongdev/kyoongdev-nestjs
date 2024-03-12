import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from '../../interface/error.interface';
export declare class CommonException extends HttpException {
    constructor(error: BaseErrorCode);
}
