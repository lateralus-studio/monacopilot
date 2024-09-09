import * as monaco from 'monaco-editor';

type Monaco = typeof monaco;
type StandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

/**
 * Options for configuring the Copilot instance.
 */
interface CopilotOptions {
    /**
     * The completion provider to use (e.g., 'openai', 'anthropic', 'groq').
     * If not specified, a default provider will be used.
     */
    provider?: CompletionProvider;
    /**
     * The specific model to use for completions.
     * Must be compatible with the chosen provider.
     * If not specified, a default model will be used.
     */
    model?: CompletionModel;
}
type Endpoint = string;
type Filename = string;
type Technologies = string[];
type ExternalContext = {
    /**
     * The relative path from the current editing code in the editor to an external file.
     *
     * Examples:
     * - To include a file `utils.js` in the same directory, set as `./utils.js`.
     * - To include a file `utils.js` in the parent directory, set as `../utils.js`.
     * - To include a file `utils.js` in the child directory, set as `./child/utils.js`.
     */
    path: string;
    /**
     * The content of the external file as a string.
     */
    content: string;
}[];
interface RegisterCopilotOptions {
    /**
     * Language of the current model
     */
    language: string;
    /**
     * The API endpoint where you started the completion service.
     */
    endpoint: Endpoint;
    /**
     * The name of the file you are editing. This is used to provide more relevant completions based on the file's purpose.
     * For example, if you are editing a file named `utils.js`, the completions will be more relevant to utility functions.
     */
    filename?: Filename;
    /**
     * The technologies (libraries, frameworks, etc.) you want to use for the completion.
     * This can provide technology-specific completions.
     * If you don't specify a technology, the completion will be specific to the language (provided as the `language`).
     *
     * @example
     * ['react', 'nextjs', 'tailwindcss', 'tanstack/react-query']
     * ['tensorflow', 'keras', 'numpy', 'pandas']
     * etc.
     */
    technologies?: Technologies;
    /**
     * Helps to give more relevant completions based on the full context.
     * You can include things like the contents/codes of other files in the same workspace.
     */
    externalContext?: ExternalContext;
}
interface CopilotRegistration {
    /**
     * Deregisters the Copilot from the Monaco editor.
     * This should be called when the Copilot is no longer needed.
     */
    deregister: () => void;
}

type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini';
type GroqModel = 'llama-3-70b';
type AnthropicModel = 'claude-3.5-sonnet' | 'claude-3-opus' | 'claude-3-haiku' | 'claude-3-sonnet';
type CompletionModel = OpenAIModel | GroqModel | AnthropicModel;
type CompletionProvider = 'openai' | 'groq' | 'anthropic';
interface CompletionRequest {
    /**
     * The body of the completion request.
     */
    body: CompletionRequestBody;
    /**
     * Additional options to include in the completion request.
     */
    options?: CompletionRequestOptions;
}
interface CompletionRequestBody {
    /**
     * The metadata required to generate the completion.
     */
    completionMetadata: CompletionMetadata;
}
interface CompletionRequestOptions {
    /**
     * Additional headers to include in the provider's completion requests.
     */
    headers?: Record<string, string>;
}
interface CompletionResponse {
    completion: string | null;
    error?: string;
}
type CompletionMode = 'fill-in-the-middle' | 'completion';
interface CompletionMetadata {
    language: string | undefined;
    filename: Filename | undefined;
    technologies: Technologies | undefined;
    externalContext: ExternalContext | undefined;
    textAfterCursor: string;
    textBeforeCursor: string;
    editorState: {
        completionMode: CompletionMode;
    };
}

/**
 * Copilot class for handling completions using various AI providers.
 */
declare class Copilot {
    private readonly apiKey;
    private readonly provider;
    private readonly model;
    /**
     * Initializes the Copilot with an API key and optional configuration.
     * @param apiKey - The API key for the chosen provider.
     * @param options - Options for configuring the Copilot instance.
     */
    constructor(apiKey: string, options?: CopilotOptions);
    /**
     * Sends a completion request to the API and returns the completion.
     * @param params - The metadata required to generate the completion.
     * @returns A promise resolving to the completed text snippet or an error.
     */
    complete({ body, options, }: CompletionRequest): Promise<CompletionResponse>;
    private validateInputs;
}

/**
 * Registers the Copilot with the Monaco editor.
 * @param monaco The Monaco instance.
 * @param editor The editor instance.
 * @param options The options for the Copilot.
 * @returns CopilotRegistration object with a deregister method.
 */
declare const registerCopilot: (monaco: Monaco, editor: StandaloneCodeEditor, options: RegisterCopilotOptions) => CopilotRegistration;

export { type CompletionModel, type CompletionProvider, type CompletionRequest, type CompletionRequestBody, type CompletionRequestOptions, type CompletionResponse, Copilot, type CopilotOptions, type CopilotRegistration, type Monaco, type RegisterCopilotOptions, type StandaloneCodeEditor, registerCopilot };
