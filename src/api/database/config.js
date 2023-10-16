const databaseConfiguration = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "localhost",
    port: 5434,
    dialect: "postgres",
    define: {
      timestamps: false
    }
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "db",
    port: 5432,
    dialect: "postgres",
    define: {
      timestamps: false
    }
  }
};
export const database =
  databaseConfiguration[process.env.NODE_ENV || "production"];
