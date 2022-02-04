import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const file = process.env.TEST_CONFIG_FILE;

const defaultVariables = JSON.parse(
    fs.readFileSync('./tests/defaultVariables.json', 'utf-8'),
);
const variables = JSON.parse(fs.readFileSync(file, 'utf-8'));

const jsonData = { ...defaultVariables, ...variables };

export default jsonData;
