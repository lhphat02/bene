import express from "express";
import cors from "cors";
import "express-async-errors";
import "./loadEnvironment.mjs";
import "express-async-errors";

import users from "./routes/user.route.mjs";
import property from "./routes/property.route.mjs";
import booking from "./routes/booking.route.mjs";
import image from "./routes/image.route.mjs";
import notification from "./routes/notifications.route.mjs";
import property_type from "./routes/property_type.route.mjs";

const PORT = process.env.PORT || 5051;
const app = express();

const expoDevServerUrl = "http://192.168.1.10:8081";

app.use(
  cors({
    origin: [expoDevServerUrl],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", users);
app.use("/property", property);
app.use("/booking", booking);
app.use("/image", image);
app.use("/notification", notification);
app.use("/property_type", property_type);
// Global error handling
app.use((err, _req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send("Uh oh! An unexpected error occurred.");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
