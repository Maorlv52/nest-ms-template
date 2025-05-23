export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  dbUri:
    process.env.DB_URI ||
    'mongodb://admin:secret@localhost:27017/main?authSource=admin',
};
