import { CreateMedicalInformationDto } from "./medical-information/dto/create-medical-information.dto";
import { UpdateMedicalInformationDto } from "./medical-information/dto/update-medical-information.dto";
import { MedicalInformationServiceImpl } from "./medical-information/services/medical-informationImpl.service";
import { CreatePathologyDto } from "./pathology/dto/create-pathology.dto";
import { UpdatePathologyDto } from "./pathology/dto/update-pathology.dto";
import { PathologyServiceImpl } from "./pathology/services/pathologyImpl.service";
import { CreatePpgDto } from "./ppg/dto/create-ppg.dto";
import { UpdatePpgDto } from "./ppg/dto/update-ppg.dto";
import { PpgServiceImpl } from "./ppg/services/ppgImpl.service";


export{
   CreatePathologyDto,
   UpdatePathologyDto,
   PathologyServiceImpl,
   
   CreatePpgDto,
   UpdatePpgDto,
   PpgServiceImpl,

   CreateMedicalInformationDto,
   UpdateMedicalInformationDto,
   MedicalInformationServiceImpl,

}