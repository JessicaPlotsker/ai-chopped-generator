import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: "Create a playlist of sad songs from the 1990s",
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: "Here are some sad songs from the 1990s:\n1. 'Tears in Heaven' by Eric Clapton\n2. 'Creep' by Radiohead\n3. 'Hurt' by Nine Inch Nails\n4. 'Everybody Hurts' by R.E.M.\n5. 'Black' by Pearl Jam",
        },
      ],
    },
  ],
  response_format: {
    type: "text",
  },
  temperature: 1,
  max_output_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

console.log(completion.choices[0].message);
