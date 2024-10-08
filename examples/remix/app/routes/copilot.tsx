import {json, type ActionFunctionArgs} from '@remix-run/node';
import {Copilot, type CompletionRequestBody} from 'monacopilot';

const copilot = new Copilot(process.env.GROQ_API_KEY!);

export const action = async ({request}: ActionFunctionArgs) => {
  const body: CompletionRequestBody = await request.json();
  const completion = await copilot.complete({body});
  return json(completion);
};
