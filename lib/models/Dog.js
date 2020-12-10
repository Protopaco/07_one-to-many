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

        return new Dog(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(`
        SELECT * FROM dogs ORDER BY id ASC`);

        return rows.map(row => new Dog(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(`
        SELECT 
            dogs.*,
            owners.owner_name,
            owners.bald
        FROM dogs
        JOIN owners
        ON dogs.owner_id = owners.id
        WHERE dogs.id = $1
        `, [id])

        return {
            ...new Dog(rows[0]),
            owner_name: rows[0].owner_name,
            owner_bald: rows[0].bald
        }
    }

    static async update(id, { dog_name, breed, dog_age, owner_id }) {
        const { rows } = await pool.query(`
        UPDATE dogs
        SET
        dog_name = $1,
        breed = $2,
        dog_age = $3,
        owner_id = $4
        WHERE id = $5
        RETURNING *
        `,
            [dog_name, breed, dog_age, owner_id, id]);

        return new Dog(rows[0])
    }

    static async delete(id) {
        const { rows } = await pool.query(`
        DELETE FROM dogs WHERE id = $1 RETURNING *
        `, [id]);

        return new Dog(rows[0]);
    }

}