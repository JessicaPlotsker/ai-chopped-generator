const OpenAI = require("openai");
const dotenv = require("dotenv");
const { get } = require("http");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_NEW,
});

async function getReadlineInput(question) {
  return new Promise((resolve) => {
    readline.question(question, (input) => {
      resolve(input);
    });
  });
}

async function chatWithAI(userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [{ role: "user", content: userMessage }],
      // messages: [
      //   {
      //     role: "user",
      //     content: "Write a one-sentence bedtime story about a unicorn",
      //   },
      // ],
    });

    // console.log("AI:", response.choices[0]?.message?.content);
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error:", error);
  }
}

//chatWithAI("Hello, can you write be a playlist of the best 10 songs of 2023?");

async function saveRecipe(res, aiRes) {
  const fs = require("fs");
  const sanitizeRecipeName = sanitizeRecipeListForFileName(res);
  const fileName = `./recipes/${sanitizeRecipeName}_recipe.txt`;
  const data = `${aiRes}`;

  fs.appendFile(fileName, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Recipe saved to", fileName);
    }
  });
}

function sanitizeRecipeListForFileName(res) {
  const removeCommas = res.split(",");
  const removeSpaces = removeCommas.split(" ").join("_");
  return removeSpaces;
}

async function main() {
  const chatQuestion = await getReadlineInput("Please enter your foods: ");
  const ai = await chatWithAI(
    `Please create a dish with these foods ${chatQuestion}`
  );
  console.log("response: ", ai);
  const chatQuestion2 = await getReadlineInput(
    "Would you like to save the recipe? (y/n)"
  );
  if (chatQuestion2 === "y") {
    await saveRecipe(chatQuestion, ai);
    console.log("Saved your recipe");
  } else {
    console.log("Not saved");
  }
  readline.close();
}

main();
