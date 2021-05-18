import {Teacher} from "./Teacher";
import {Schoolclass} from "./Schoolclass";

export interface Unit{
    id: number;
    day: number;
    unit: number;
    subject: string;
    teacher: Teacher;
    schoolcalss: Schoolclass;
}
