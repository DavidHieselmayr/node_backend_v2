import * as mariadb from 'mariadb';
import {ETeacher} from '../Entitiy/ETeacher';
import {ESchoolclass} from '../Entitiy/ESchoolclass';
import {EUnit} from '../Entitiy/EUnit';
import {Pool} from "mariadb";

export class Repository {

    public pool: mariadb.Pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: 'secret',
        database: 'mymaria',
        connectionLimit: 5
    })


    public async initDB(): Promise<void> {
        try {
            await this.pool.query("DELETE FROM unit");
            await this.pool.query("DELETE FROM schoolclass");
            await this.pool.query("DELETE FROM teacher");

            await this.pool.query("INSERT INTO teacher VALUES (?,?,?,?)", [1, "Gerald", "Aistleitner", "U12"]);
            await this.pool.query("INSERT INTO teacher VALUES (?,?,?,?)", [2, "Herbert", "Lackinger", "221"]);
            await this.pool.query("INSERT INTO teacher VALUES (?,?,?,?)", [3, "Johannes", "Tumfahrt", "E42"]);

            await this.pool.query("INSERT INTO schoolclass VALUES (?,?)", ["5BHITM", "135"]);
            await this.pool.query("INSERT INTO schoolclass VALUES (?,?)", ["4BHITM", "136"]);
            await this.pool.query("INSERT INTO schoolclass VALUES (?,?)", ["3BHITM", "137"]);

            await this.pool.query("INSERT INTO unit VALUES (?,?,?,?,?,?)", [null, 1, 1, "SEW", 1, "3BHITM"]);
            await this.pool.query("INSERT INTO unit VALUES (?,?,?,?,?,?)", [null, 1, 2, "SEW", 2, "4BHITM"]);
            await this.pool.query("INSERT INTO unit VALUES (?,?,?,?,?,?)", [null, 1, 3, "INSY", 3, "5BHITM"]);

        } catch (ex) {
            console.log(ex)
        }


    }

    public async findAllTeachers(): Promise<ETeacher[]> {
        try {
            return await this.pool.query("Select id,firstname, lastname, room from teacher");
        } catch (ex) {
            console.log('error in findAllTeachers');
            return [];
        }
    }

    // @ts-ignore
    public async findAllSchoolClasses(): Promise<ESchoolclass>  {
        try{
            return await this.pool.query("Select * from schoolclass");
        }catch (ex){
            console.log(ex);
        }
    }

    public async findUnitFromClassByClassid(id: string): Promise<EUnit[]> {
        try {
            return await this.pool.query("Select * from unit where unit.schoolclassID = ?", [id]);
        } catch (ex) {
            console.log('error in findUnitBySchoolclass');
            return [];
        }

    }

    public async saveUnit(unitDB: EUnit) {
        try {
            await this.pool.query("Insert into unit values (?,?,?,?,?,?)",
                [unitDB.day, unitDB.unit, unitDB.subject, unitDB.teacher.id, unitDB.schoolclass.id]);
        } catch (ex) {
            console.log(ex)
        }
    }

}
