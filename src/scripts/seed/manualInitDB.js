import sqlite from 'sqlite3';
import { createItemStats } from './sql/createTables';

const db = new sqlite.verbose().Database(':memory');

db.run(createItemStats);
db.close();
