import { createPropertyDataType } from 'modules/property/domain/repositories/IPropertyRepository';
import { PropertyRepository } from 'modules/property/infrastructures/repositories/PropertyRepository';
import { catchErrorAsync } from 'utils/error-handling';

class createPropertyUseCase {
  constructor(private readonly propertyRepository: PropertyRepository) {}
  async execute(property: createPropertyDataType) {
    const [error, result] = await catchErrorAsync(
      this.propertyRepository.create(property)
    );
    if (error) {
      throw error;
    }
    return result;
  }
}

export default createPropertyUseCase;
