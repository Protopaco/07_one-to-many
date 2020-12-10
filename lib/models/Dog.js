const pool = require('../utils/pool.js');

module.exports = class Dog {
    dog_name;
    breed;
    dog_age;
    owner_id;

    constructor(row) {
        this.id = String(row.id);
        this.dog_name = row.dog_name;
        this.breed = row.breed;
        this.dog_age = row.dog_age;
        this.owner_id = String(row.owner_id);
    }

    static async insert({ dog_name, breed, dog_age, owner_id }) {

        const { rows } = await pool.query(`
        INSERT INTO dogs
        (dog_name, breed, dog_age, owner_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
            [dog_name, breed, dog_age, owner_id]);

        // console.log(new Dog(rows[0]))
        return new Dog(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(`
        SELECT * FROM dogs ORDER BY id ASC`);

        return rows.map(row => new Dog(row));
    }







}