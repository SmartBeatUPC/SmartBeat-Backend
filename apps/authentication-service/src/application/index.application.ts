import { CreateDoctorCenterDto } from "./doctor-center/dto/create-doctor-center.dto";
import { UpdateDoctorCenterDto } from "./doctor-center/dto/update-doctor-center.dto";
import { DoctorCenterServiceImpl } from "./doctor-center/services/doctor-centerImpl.service";
import { CreateDoctorDto } from "./doctor/dto/create-doctor.dto";
import { UpdateDoctorDto } from "./doctor/dto/update-doctor.dto";
import { DoctorServiceImpl } from "./doctor/services/doctorImpl.service";
import { CreateHealthCenterDto } from "./health-center/dto/create-health-center.dto";
import { UpdateHealthCenterDto } from "./health-center/dto/update-health-center.dto";
import { HealthCenterServiceImpl } from "./health-center/services/health-centerImpl.service";
import { CreatePatientDto } from "./patient/dto/create-patient.dto";
import { UpdatePatientDto } from "./patient/dto/update-patient.dto";
import { PatientServiceImpl } from "./patient/services/patientImpl.service";
import { CreateUserDto } from "./user/dto/create-user.dto";
import { UpdateUserDto } from "./user/dto/update-user.dto";
import { UserServiceImpl } from "./user/services/userImpl.service";


export{
   CreateDoctorDto,
   UpdateDoctorDto,
   DoctorServiceImpl,

   CreateDoctorCenterDto,
   UpdateDoctorCenterDto,
   DoctorCenterServiceImpl,

   CreateHealthCenterDto,
   UpdateHealthCenterDto,
   HealthCenterServiceImpl,

   CreatePatientDto,
   UpdatePatientDto,
   PatientServiceImpl,

   CreateUserDto,
   UpdateUserDto,
   UserServiceImpl,
}