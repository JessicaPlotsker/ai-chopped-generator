const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dataArrayDinner = [
  "Lasagna",
  "Meatballs",
  "Tofu Stir Fry",
  "Fried Chicken",
  "Spaghetti",
  "Pizza",
  "Tacos",
  "Burritos",
  "Chili",
  "Pasta Salad",
  "Chicken Alfredo",
  "Chicken Marsala",
];
const dataArrayLunch = [
  "Sandwich",
  "Salad",
  "Soup",
  "Burger",
  "Hot Dog",
  "Chicken Tenders",
  "Chicken Nuggets",
  "Fries",
  "Onion Rings",
  "Fish and Chips",
  "Grilled Cheese",
  "Mac and Cheese",
  "Quesadilla",
  "Nachos",
  "Taco Salad",
  "Caesar Salad",
  "Greek Salad",
  "Chef Salad",
  "Spinach Salad",
  "Cranberry Salad",
  "Waldorf Salad",
  "Pasta Salad",
  "Potato Salad",
  "Coleslaw",
  "Quinoa Salad",
  "Tabbouleh",
  "Couscous Salad",
  "Hummus Basar",
];
const dataArrayBreakFast = [
  "Eggs",
  "Pancakes",
  "Waffles",
  "Cereal",
  "Oatmeal",
  "Toast",
  "Bagels",
  "Muffins",
  "Fruit",
  "Yogurt",
  "Granola",
];

function basicRandomGenerator(num) {
  return Math.floor(Math.random() * num);
}

function getDataValue(array) {
  const arrayLength = array.length;
  const generator = basicRandomGenerator(arrayLength);

  const choose = array[generator];

  return choose;
}

let dataArray;
function askMealType(callback) {
  readline.question(
    "What meal would you like to choose? (breakfast, lunch, dinner): ",
    (mealType) => {
      switch (mealType.toUpperCase()) {
        case "BREAKFAST":
          dataArray = dataArrayBreakFast;
          break;
        case "LUNCH":
          dataArray = dataArrayLunch;
          break;
        case "DINNER":
          dataArray = dataArrayDinner;
          break;
        default:
          console.log(
            "Invalid meal type. Please choose breakfast, lunch, or dinner."
          );
          readline.close();
          return;
      }
      callback(mealType);
    }
  );
}

function printFoodChoice() {
  askMealType((mealType) => {
    console.log(`For ${mealType}, you're having: ${getDataValue(dataArray)}`);
    readline.close();
  });
}

printFoodChoice();

//to change this to a chopped generator
//you would need to switch the data arrays to foods maybe?
//but also think about what you can make to indincate which
//ingredients go to which dish (AI or just have it do AI to begin with)
//instead of storing values for reading the input and then sending an output
