require("dotenv").config(); 

const app = require("./src/app");
const sequelize = require("./src/config/database");

require("./src/models");

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log(" PostgreSQL Connected");

        await sequelize.sync();
        console.log(" Database Synced");

        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(" Unable to connect to the database:", error.message);
        process.exit(1);
    }
})();
