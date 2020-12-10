const pool = require('../utils/pool.js');
const Dog = require('./Dog.js')
module.exports = class Owner {
    owner_name;
    age;
    bald;

    constructor(row) {
        this.id = row.id;
        this.owner_name = row.owner_name;
        this.age = row.age;
        this.bald = row.bald;
    }

    static async insert({ owner_name, age, bald }) {
        const { rows } = await pool.query(`
        INSERT INTO owners
        (owner_name, age, bald)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
            [owner_name, age, bald]);

        return new Owner(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(`
        SELECT * FROM owners ORDER BY id ASC
        `);

        return rows.map(row => new Owner(row));
    }

    static async findById(id) {

        const { rows } = await pool.query(`
        SELECT
            owners.*,
            array_to_json(array_agg(dogs.*)) AS dogs
        FROM owners
        JOIN dogs
        ON owners.id = dogs.owner_id
        WHERE owners.id = $1
        GROUP BY owners.id
        `, [id]);

        if (!rows[0]) throw new Error(`No owner with id ${id} found`);

        return {
            ...new Owner(rows[0]),
            dogs: rows[0].dogs.map(dog => new Dog(dog))
        }
    }

    static async update(id, { owner_name, age, bald }) {
        const { rows } = await pool.query(`
        UPDATE owners
        SET
        owner_name = $1,
        age = $2,
        bald = $3
        WHERE id = $4
        RETURNING *
        `,
            [owner_name, age, bald, id]);


        return new Owner(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(`
      DELETE FROM owners WHERE id = $1 RETURNING *
        `, [id]);

        return new Owner(rows[0]);
    }
}