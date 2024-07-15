import {Inject, Injectable} from '@nestjs/common';
import {CreateFiliacaoDto} from './dto/create-filiacoe.dto';
import {Filiacao} from './entities/filiacao.entity';
import {FILIACAO_REPOSITORY} from 'src/core/constants';
import {Transaction} from "sequelize";
import {FiliacaoRepository} from "./repository/filiacao.repository";
import {UpdateFiliacoeDto} from "./dto/update-filiacoe.dto";


@Injectable()
export class FiliacoesService {
    constructor(
        private readonly filiacaoRepository: FiliacaoRepository,
    ) {
    }

    async create(createFiliacaoDto: CreateFiliacaoDto, transaction: Transaction,): Promise<Filiacao> {
        return this.filiacaoRepository.create(createFiliacaoDto, transaction);
    }

    async findAll(): Promise<Filiacao[]> {
        return this.filiacaoRepository.findAll();
    }

    async findOne(id: number): Promise<Filiacao> {
        return this.filiacaoRepository.findOne(id);
    }

    async update(
        id: number,
        updateFiliacaoDto: UpdateFiliacoeDto,
        transaction: Transaction,
    ): Promise<any> {
        await this.filiacaoRepository.update(+id, updateFiliacaoDto, transaction);
    }

    async remove(id: number, transaction: Transaction): Promise<void> {
        return this.filiacaoRepository.remove(id, transaction);
    }
}
