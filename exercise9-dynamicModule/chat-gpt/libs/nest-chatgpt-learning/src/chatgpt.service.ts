import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { GetAiModelAnswer } from './model/get-ai-model-answer';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;
const DEFAULT_MAX_TOKENS = 2040;

export class ChatgptService {
  private openAiApi: OpenAIApi;
  private selectedModelId: string | undefined;

  setModelId(modelId: string) {
    this.selectedModelId = this.cleanModelId(modelId);
  }

  cleanModelId(modelId: string) {
    if (modelId.includes(':')) {
      modelId = modelId.replace(':', '-');
    }

    return modelId;
  }

  async listModels() {
    const models = await this.openAiApi.listModels();
    return models.data;
  }

  async sharedGetModelAnswer(input: GetAiModelAnswer, apiKey: string) {
    try {
      const configuration = new Configuration({
        apiKey,
      });
      this.openAiApi = new OpenAIApi(configuration);
      const { question, temperature, modelId, maxTokens } = input;
      let model = DEFAULT_MODEL_ID;
      if (modelId) {
        model = modelId;
      } else if (this.selectedModelId) {
        model = this.selectedModelId;
      }
      const params: CreateCompletionRequest = {
        prompt: question,
        model: this.cleanModelId(model),
        temperature:
          temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
        max_tokens: maxTokens ? maxTokens : DEFAULT_MAX_TOKENS,
      };

      const response = await this.openAiApi.createCompletion(params);

      const { data } = response;
      if (data.choices.length) {
        return data.choices;
      }

      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  }
}
