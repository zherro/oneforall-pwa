import ProfileRepository from "@supabaseutils/repositories/profile.repository";
import { IngestionData } from "./processor/ingestion-data";
import { UnitProcessor } from "./processor/unit.processor";
import ProfileRecoveryModel from "@supabaseutils/model/ProfileRecovery.model";
import ProfileRecoveryRepository from "@supabaseutils/repositories/profileRecovery.repository";
import StringUtils from "@utils/helpers/String.utils";
import { BusinessException } from "@supabaseutils/bussines.exception";

export default class SaveProfileRecoveryUsecase extends UnitProcessor<any> {
  protected async execute(
    ingestionData: IngestionData<any>
  ): Promise<IngestionData<any>> {
    const entity: ProfileRecoveryModel = ingestionData.input;

    const profileRepository = new ProfileRepository();
    const profileRecoveryRepository = new ProfileRecoveryRepository();

    const { data: dataUser } = await profileRepository.getByEmail(entity.email);

    if (
      dataUser == null ||
      dataUser == undefined ||
      dataUser.length <= 0 ||
      StringUtils.isEmpty(dataUser[0].id)
    ) {
      throw new BusinessException("Usuário não cadastrado!", 400);
    }

    entity.user_id = dataUser[0].id;
    const { data, error } = await profileRecoveryRepository.save(entity);
    await profileRecoveryRepository.resetOldRecoveries(data?.id);

    ingestionData.output = { data, error };
    return ingestionData;
  }
}

export const saveProfileRecoveryUsecase = (ingestionData: IngestionData<any>) =>
  new SaveProfileRecoveryUsecase().process(ingestionData);
