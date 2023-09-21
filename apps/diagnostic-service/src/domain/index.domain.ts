import { Diagnostic } from "./diagnostic/models/diagnostic.entity";
import { DiagnosticService } from "./diagnostic/services/diagnostic.interface.service";
import { MedicalPrescription } from "./medical-prescription/models/medical-prescription.entity";
import { MedicalPrescriptionService } from "./medical-prescription/services/medical-prescription.interface.service";



export{
    MedicalPrescription,
    Diagnostic,
    MedicalPrescriptionService,
    DiagnosticService,
}