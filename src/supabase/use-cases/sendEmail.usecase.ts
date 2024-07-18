import { EmailParamsDto } from "@supabaseutils/model/dto/EmailParams.dto";
import { IngestionData } from "./processor/ingestion-data";
import { UnitProcessor } from "./processor/unit.processor";
import transporter from "@lib/nodemailer";

export default class SendEmailUseCase extends UnitProcessor<any> {
  protected async execute(
    ingestionData: IngestionData<any>
  ): Promise<IngestionData<any>> {
    const emailParamsDto: EmailParamsDto = ingestionData.input;

    console.log(emailParamsDto)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailParamsDto.email,
      subject: emailParamsDto.subject,
      template: emailParamsDto.template,
      context: emailParamsDto,
    };

    await transporter.sendMail(mailOptions);
    return ingestionData;
  }
}

export const sendEmailUseCase = (ingestionData: IngestionData<any>) =>
  new SendEmailUseCase().process(ingestionData);
