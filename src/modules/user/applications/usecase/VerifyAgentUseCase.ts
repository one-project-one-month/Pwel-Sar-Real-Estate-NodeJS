import { IAgentRepository } from 'modules/user/domain/repositories/IAgentRepository';
import { AppError } from 'utils/error-handling';
export class VerifyAgentUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly agentRepository: IAgentRepository) {}

  async execute(params: any): Promise<any> {
    try {
      //   console.log(params);
      const agent = await this.agentRepository.verifyAgent(params);

      return agent;
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
