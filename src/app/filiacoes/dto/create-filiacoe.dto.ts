import {IsString, IsInt, MaxLength} from 'class-validator';

export class CreateFiliacaoDto {
    @IsInt()
    membroId: number;

    @IsString()
    @MaxLength(100)
    nomePai: string;

    @IsString()
    @MaxLength(100)
    nomeMae: string;
}
