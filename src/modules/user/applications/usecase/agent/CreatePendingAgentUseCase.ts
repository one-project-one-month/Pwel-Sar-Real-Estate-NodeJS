import { IAgentRepository } from 'modules/user/domain/repositories/IAgentRepository';
import { AppError, errorKinds } from 'utils/error-handling';

export class CreartePendingAgentUseCase {
  // eslint-disable-next-line no-unused-vars
  constructor(private agentRepository: IAgentRepository) {}

  async execute(params: any): Promise<any> {
    try {
      const agent = await this.agentRepository.createPendingAgent(params);

      console.log(agent);
      return agent;
    } catch (error) {
      throw new AppError(
        errorKinds.internalServerError,
        'Failed to create agent',
        error as Error
      );
    }
  }
}
