import * as mariadb from 'mariadb';
import {ETeacher} from '../Entitiy/ETeacher';
import {ESchoolclass} from '../Entitiy/ESchoolclass';
import {EUnit} from '../Entitiy/EUnit';

export class Repository {

    public pool: mariadb.Pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'webunits',
        connectionLimit: 5
    })


    public async initDB(): Promise<void> {
        try {
            await this.pool.query("Delete from teacher");
            await this.pool.query("Delete from schoolclass");
            await this.pool.query("Delete from unit");

            await this.pool.query("Insert into teacher value (?,?,?,?)", [1, "Hans", "Hieselmayr", "135"]);
            await this.pool.query("Insert into teacher value (?,?,?,?)", [2, "Florian", "Beckerle", "135"]);
            await this.pool.query("Insert into teacher value (?,?,?,?)", [3, "Jakob", "Jakobs", "135"]);

            await this.pool.query("Insert into schoolclass value (?,?)", ["4BHITM", "K04"]);
            await this.pool.query("Insert into schoolclass value (?,?)", ["5BHITM", "E58-2"]);
            await this.pool.query("Insert into schoolclass value (?,?)", ["3BHITM", "152"]);

            await this.pool.query("Insert into unit value (?,?,?,?,?,?)", [null, 1, 1, "SEW", 0, "4BHITM"]);
            await this.pool.query("Insert into unit value (?,?,?,?,?,?)", [null, "1", "2", "SEW", 0, "5BHITM"]);
            await this.pool.query("Insert into unit value (?,?,?,?,?,?)", [null, "1", "3", "Waffenkunde", "3BHITM", 0]);

        } catch (ex) {
            console.log(ex)
        }


    }

    public async findAllTeachers(): Promise<Teacher[]> {
        try {
            return await this.pool.query("Select id,firstname, lastname, room from teacher");
        } catch (ex) {
            console.log('error in findAllTeachers');
            return [];
        }
    }

    public async findUnitBySchoolclass(id: string): Promise<Unit[]> {
        try {
            return await this.pool.query("Select * from unit u join schoolclass s on (s.id = u.refclass) where s.id = ?", [id]);
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
