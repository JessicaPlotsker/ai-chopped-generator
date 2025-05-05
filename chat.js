import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";
import { promises as fsPromises } from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_2,
});

async function getReadlineInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (input) => {
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
  const sanitizeRecipeName = sanitizeRecipeListForFileName(res);
  console.log("sanitized name: ", sanitizeRecipeName);
  const fileName = `./recipes/${sanitizeRecipeName}_recipe.txt`;
  const data = `${aiRes}`;

  try {
    await fsPromises.appendFile(fileName, data);
  } catch (err) {
    console.error("Error writing to file:", err);
  }
  console.log("Recipe saved to", fileName);
}

function sanitizeRecipeListForFileName(res) {
  if (res.includes("and")) {
    res = res.replace(/and/g, ",");
  }
  //not trimming the white space
  //is there a better way to sanitize the titles?
  const removeCommas = res.split(", ").map((item) => item.trim());
  const removeSpaces = removeCommas.join("_");
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
  rl.close();
}

main();
//coammnder
