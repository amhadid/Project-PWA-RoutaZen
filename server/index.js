// Build Server
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Gunakan middleware cors
app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Data area rawan kecelakaan, kejadian kecelakaan tahun 2021, 2022, dan 2023
app.get('/data_kecelakaan', async (req, res) => {
    try {
        const client = await pool.connect();

        // Query untuk area rawan kecelakaan
        const queryRawan = 'SELECT * FROM public."area_rawan"';
        const resultRawan = await client.query(queryRawan);
        const areaRawan = resultRawan.rows;

        // Query untuk kejadian kecelakaan tahun 2021
        const query2021 = 'SELECT * FROM public."kecelakaan_2021"';
        const result2021 = await client.query(query2021);
        const kecelakaan2021 = result2021.rows;

        // Query untuk kejadian kecelakaan tahun 2022
        const query2022 = 'SELECT * FROM public."kecelakaan_2022"';
        const result2022 = await client.query(query2022);
        const kecelakaan2022 = result2022.rows;

        // Query untuk kejadian kecelakaan tahun 2023
        const query2023 = 'SELECT * FROM public."kecelakaan_2023"';
        const result2023 = await client.query(query2023);
        const kecelakaan2023 = result2023.rows;

        client.release();

        res.json({ areaRawan, kecelakaan2021, kecelakaan2022, kecelakaan2023 });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});