import { MedicalInformation } from "./medical-information/models/medical-information.entity";
import { MedicalInformationService } from "./medical-information/services/medical-information.interface.service";
import { Pathology } from "./pathology/models/pathology.entity";
import { PathologyService } from "./pathology/services/pathology.interface.service";
import { Ppg } from "./ppg/models/ppg.entity";
import { PpgService } from "./ppg/services/ppg.interface.service";



export{
    Ppg,
    Pathology,
    MedicalInformation,
    PpgService,
    PathologyService,
    MedicalInformationService,
}