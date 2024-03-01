const OpenAI = require("openai");
const OPEN_API_KEY = process.env.MY_KEY
const openai = new OpenAI({ apiKey: OPEN_API_KEY });

const systemContent = 'You will make a quiz that revolves around the subjects date and year. You will generate 2 simple questions, with four possible solutions where only one i correct. The answers should be labeled A, B, C, D. I want the message back in an array and each questions and the four answers related to the question, should be in and object. Like [{question: "", A: "", B: "", C: "", D: "", correctAnswer: "", correctChoice: "", explanation: "" }]. The "correctAnswer" value, should be the value of either answer A, B, C or D. So if an answer has a date and year this should be the value of "correctAnswer. The correctChoice should be key of the correctAnswer. The user will give you one of five categories: Fashion, Animals, Programming, World, Games. When you recieve a category you generet the questions in regards to data and year subject and the category';

let content = [{ role: "system", content: systemContent }];
 
async function main(subject) {
  try {
    content.push({ role: "user", content: subject });
    const completion = await openai.chat.completions.create({
      messages: content,
      model: "gpt-4",
      /*temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,*/
    });
    console.log(completion);
    
    const completionResponse = completion.choices[0].message.content;
    return completionResponse;

  } catch(error) {
    console.error("Error", error);
    throw error;
  }
}

module.exports = { main };