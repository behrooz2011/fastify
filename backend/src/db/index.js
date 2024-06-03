// const knex = require('knex')({
//   client: 'sqlite3', // or 'better-sqlite3'
//   connection: {
//     filename: './db.sqlite',
//   },
// });

// class DB {
//   static async addLead(data) {
//     return knex('leads').insert(data);
//   }
// }
// //
// module.exports = DB;



import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
});

async function setupDatabase() {
  const exists = await db.schema.hasTable('leads');
  if (!exists) {
    await db.schema.createTable('leads', table => {
      table.increments('id').primary();
      table.string('to');
      table.string('cc');
      table.string('bcc');
      table.string('subject');
      table.text('body');
      table.timestamps(true, true);  // adds created_at and updated_at columns
    });
    console.log('Table "leads" created');
  } else {
    console.log('Table "leads" already exists');
  }
}

async function addLead(lead) {
  return await db('leads').insert(lead);
}
async function getAllLeads() {
  return await db('leads').select('*');
}

// Initialize the database when the module is loaded
setupDatabase().catch(err => console.error("Failed to set up database", err));

export { db, addLead, getAllLeads};
