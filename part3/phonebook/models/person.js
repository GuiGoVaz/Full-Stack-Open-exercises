const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url, { family: 4 })

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        // 1. Check format: 2 or 3 digits, followed by '-', followed by one or more digits
        if (!/^\d{2,3}-\d+$/.test(value)) {
          return false;
        }

        // 2. Count total digits (excluding the hyphen)
        const totalDigits = value.replace("-", "").length;

        // 3. Ensure minimum of 8 digits in total
        return totalDigits >= 8;
      },
      message: (props) =>
        `"${props.value}" format is invalid (should be e.g., 12-345678 or 123-45678).`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
