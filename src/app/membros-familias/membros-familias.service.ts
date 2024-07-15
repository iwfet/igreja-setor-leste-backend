import {Injectable} from '@nestjs/common';
import {CreateMembroFamiliaDto} from './dto/create-membros-familia.dto';
import {UpdateMembroFamiliaDto} from './dto/update-membros-familia.dto';
import {Transaction} from "sequelize";
import {MembroFamiliaRepository} from "./repositories/membros-familia.repository";
import {MembroFamilia} from "./entities/membros-familia.entity";
import {MembrosService} from "../membros/membros.service";

@Injectable()
export class MembrosFamiliasService {
    constructor(private readonly membroFamiliaRepository: MembroFamiliaRepository, private readonly membrosService: MembrosService) {
    }

    async create(
        createMembroDto: CreateMembroFamiliaDto,
        transaction: Transaction,
    ): Promise<MembroFamilia> {
        await this.membrosService.findOne(createMembroDto.membroId)
        return await this.membroFamiliaRepository.create(createMembroDto, transaction);

    }

    async findAll(): Promise<MembroFamilia[]> {
        return this.membroFamiliaRepository.findAll();
    }

    async findOne(id: number): Promise<MembroFamilia> {
        return await this.membroFamiliaRepository.findOne(id);
    }

    async update(
        id: number,
        updateMembroDto: UpdateMembroFamiliaDto,
        transaction: Transaction,
    ): Promise<any> {
        await this.membrosService.findOne(updateMembroDto.membroId)
        await this.membroFamiliaRepository.update(+id, updateMembroDto, transaction);
    }

    async remove(id: number, transaction: Transaction): Promise<void> {
        return this.membroFamiliaRepository.remove(id, transaction);
    }
}
