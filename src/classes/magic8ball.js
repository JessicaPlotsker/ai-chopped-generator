import { OpenAiChat } from "../classes/openAiChatClass.js";
import { ReadLine } from "../classes/readlineClass.js";

//will allow the user to ask a question
//will ignore the question
//will prompt the AI to return a magic 8 ball response
//done

//also look into moving everything to class modular style
//so it decoupled and easier to read

//also maybe add some nextJS for a nice front end
//especially for this file idea

//but also might be cool to add photo generation to the
//recipes but I can also see it being a cursed image lolllll

async function magic8Ball() {
  const ai = new OpenAiChat();
  const readline = new ReadLine();
  const question = await readline.getReadlineInput(
    "Please enter your question: "
  );
  const aiResponse = await ai.AiChat(
    `You are a magic 8 ball. Answer the question: ${question}`
  );
  console.log("AI:", aiResponse);
  // const fs = require("fs");
  // const fileName = `./magic8ball/${question}_response.txt`;
  // const data = `${aiResponse}`;
  // fs.appendFile(fileName, data, (err) => {
  //   if (err) {
  //     console.error("Error writing to file:", err);
  //   } else {
  //     console.log("Response saved to", fileName);
  //   }
  // });
}

magic8Ball();
