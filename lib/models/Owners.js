const pool = require('../utils/pool.js');

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

}