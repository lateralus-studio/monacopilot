import {CompletionMetadata} from '../types';

const CURSOR_PLACEHOLDER = '<<CURSOR>>';

/**
 * Generates the system prompt for the AI model.
 */
export const generateSystemPrompt = (
  metadata: CompletionMetadata,
  options: any,
): string => {
  return `You are an advanced AI content creation assistant. Your goal is to provide accurate, efficient, and context-aware completions. Remember, your role is to act as an extension of the writer's thought process, providing intelligent and contextually appropriate content completions.`;
};

/**
 * Generates the user prompt for the AI model.
 */
export const generateUserPrompt = (
  metadata: CompletionMetadata,
  options: any,
): string => {
  const {
    editorState: {completionMode},
    textBeforeCursor,
    textAfterCursor,
    externalContext,
  } = metadata;
  let prompt = `You are are given an incomplete piece of content and asked what the following text is. Treat the given content as markdown text.`;

  prompt += `\n\nHere are the details about how the completion should be generated:
  - The cursor position is marked with '${CURSOR_PLACEHOLDER}'.
  - Your completion must start exactly at the cursor position.
  - Do not repeat any content that appears before or after the cursor.\n`;

  if (completionMode === 'fill-in-the-middle') {
    prompt += `  - If filling in the middle, replace '${CURSOR_PLACEHOLDER}' entirely with your completion.\n`;
  } else if (completionMode === 'completion') {
    prompt += `  - If completing the code, start from '${CURSOR_PLACEHOLDER}' and provide a logical continuation.\n`;
  }

  prompt += `  - Optimize for readability and effectiveness where possible.

  Remember to output only the completion content without any additional explanation.

  Here's the snippet for completion:

  <code>
  ${textBeforeCursor}${CURSOR_PLACEHOLDER}${textAfterCursor}
  </code>`;

  if (externalContext && externalContext.length > 0) {
    prompt += `\n\nAdditional context from related files:\n\n`;
    prompt += externalContext
      .map(context => `// Path: ${context.path}\n${context.content}\n`)
      .join('\n');
  }

  return prompt.endsWith('.') ? prompt : `${prompt}.`;
};
