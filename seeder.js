// seeder.js
require('dotenv').config();
const User = require('./models/User');

async function seedOwner() {
  try {
    const { OWNER_EMAIL, OWNER_NAME, OWNER_PASSWORD } = process.env;

    if (!OWNER_EMAIL || !OWNER_NAME || !OWNER_PASSWORD) {
      console.warn('OWNER_EMAIL, OWNER_NAME, or OWNER_PASSWORD missing in .env – skipping owner seeding.');
      return;
    }

    const exists = await User.findOne({ email: OWNER_EMAIL });
    if (exists) {
      console.log(`🟢 Owner already seeded: ${OWNER_EMAIL}`);
      return;
    }

    const owner = new User({
      name: OWNER_NAME,
      email: OWNER_EMAIL,
      password: OWNER_PASSWORD,
      role: 'owner'
    });
    await owner.save();
    console.log(`✅ Seeded owner user: ${OWNER_EMAIL}`);
  } catch (err) {
    console.error('🔴 Error seeding owner:', err);
  }
}

module.exports = seedOwner;
