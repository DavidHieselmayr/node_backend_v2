import {ETeacher} from "./ETeacher";
import {ESchoolclass} from "./ESchoolclass";

export interface EUnit {
    id: number;
    day: number;
    unit: number;
    subject: string;
    teacher: ETeacher;
    schoolclass: ESchoolclass;
}

