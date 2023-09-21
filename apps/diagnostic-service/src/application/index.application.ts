import { CreateDiagnosticDto } from "./diagnostic/dto/create-diagnostic.dto";
import { UpdateDiagnosticDto } from "./diagnostic/dto/update-diagnostic.dto";
import { DiagnosticServiceImpl } from "./diagnostic/services/diagnosticImpl.service";
import { CreateMedicalPrescriptionDto } from "./medical-prescription/dto/create-medical-prescription.dto";
import { UpdateMedicalPrescriptionDto } from "./medical-prescription/dto/update-medical-prescription.dto";
import { MedicalPrescriptionServiceImpl } from "./medical-prescription/services/medical-prescriptionImpl.service";


export{
    MedicalPrescriptionServiceImpl,
    CreateMedicalPrescriptionDto,
    UpdateMedicalPrescriptionDto,
    
    DiagnosticServiceImpl,
    CreateDiagnosticDto,
    UpdateDiagnosticDto,
}