const express = require("express");
const path = require("path");
const colors = require("colors");

const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/quizzes", require("./routes/quizRoute"));
app.use("/api/users", require("./routes/userRoutes"));
//serve frontend
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "../", "client", "build", "index.html")
		);
	});
}
// } else {
// 	app.get("/", (req, res) => res.send("please set NODE_ENV to production"));
// }
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
