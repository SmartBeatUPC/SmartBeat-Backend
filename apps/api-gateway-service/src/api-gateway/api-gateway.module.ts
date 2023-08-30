import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { MedicalAssistanceModule } from './medical-assistance/medical-assistance.module';
import { MedicalConsultationModule } from './medical-consultation/medical-consultation.module';
import { MedicalInformationModule } from './medical-information/medical-information.module';
import { DiagnosticModule } from './diagnostic/diagnostic.module';

@Module({
  imports: [AuthenticationModule, MedicalAssistanceModule, MedicalConsultationModule, MedicalInformationModule, DiagnosticModule]
})
export class ApiGatewayModule {}
