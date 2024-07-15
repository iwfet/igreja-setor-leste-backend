import {Papel} from "./papel.entity";
import {PAPEL_REPOSITORY} from "../../../core/constants";

export const papelProvider = [
    {
        provide: PAPEL_REPOSITORY,
        useValue: Papel,
    },
];
