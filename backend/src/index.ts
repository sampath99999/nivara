// index.ts
import createApp from '#app.js';
import connectDB from '#utils/database.js';

const app = await createApp();
connectDB();