import * as mariadb from 'mariadb';
import {Teacher} from '../Entitiy/Teacher';
import {Schoolclass} from '../Entitiy/Schoolclass';
import {Unit} from '../Entitiy/Unit';

export class Repository {

    public pool: mariadb.Pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'webunits',
        connectionLimit: 5
    })

    public async initDB(): Promise<void> {
        await this.pool.query("Delete from teacher");
        await this.pool.query("Delete from schoolclass");
        await this.pool.query("Delete from unit");


        await this.pool.query("Insert into teacher value (?,?,?,?)", [0, "Hans", "Hieselmayr", "135"]);

        await this.pool.query("Insert into schoolclass value (?,?)", [0, "135"]);

        await this.pool.query("Insert into unit value (?,?,?,?,?,?)", [null, "1", "5", "SEW", 0, 0]);


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
            return await this.pool.query("Select * from unit u join schoolclass s on (s.id = u.refclass) where s.id = ?",[id]);
        } catch (ex) {
            console.log('error in findUnitBySchoolclass');
            return [];
        }

    }

}
