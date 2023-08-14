const express = require('');
const mongooose = require('');
const {connection} = require('./config/db')
const app = express();
const { BookingRouter } = require('./routes/booking.routes');
const { FlightRouter } = require('./routes/flight.route');
const {UserRouter} = require('./routes/user.routes')

app.use(express.json())
app.get("/", (req, res) => {
    res.send("welcome to air ticket booking system");
  });
  app.use("", UserRouter)
  app.use("", BookingRouter)
  app.use("", FlightRouter)

const PORT = process.env.port || 7070;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
        console.log("Error to connect the database");
    }
    console.log(`Server listening on port ${PORT}`);
});