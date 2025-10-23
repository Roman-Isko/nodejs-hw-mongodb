require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { initMongoConnection } = require('./db/initMongoConnection');
const Contact = require('./models/contact');

async function seed() {
  try {
    await initMongoConnection();
    const filePath = path.join(__dirname, 'contacts.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const contacts = JSON.parse(raw);

    if (!Array.isArray(contacts)) {
      throw new Error('contacts.json must contain an array');
    }

    await Contact.deleteMany({});
    await Contact.insertMany(contacts);

    console.log(`Seeded ${contacts.length} contacts`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
