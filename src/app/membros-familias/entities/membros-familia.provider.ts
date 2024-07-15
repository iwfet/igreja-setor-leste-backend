import {MEMBRO_FAMILIA_REPOSITORY} from 'src/core/constants';
import {MembroFamilia} from "./membros-familia.entity";

export const membroFamiliaProvider = [
    {
        provide: MEMBRO_FAMILIA_REPOSITORY,
        useValue: MembroFamilia,
    },
];
