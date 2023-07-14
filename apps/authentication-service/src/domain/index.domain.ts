import { DoctorCenter } from "./doctor-center/models/doctor-center.entity";
import { DoctorCenterService } from "./doctor-center/services/doctor-center.interface.service";
import { Doctor } from "./doctor/models/doctor.entity";
import { DoctorService } from "./doctor/services/doctor.interface.service";
import { HealthCenter } from "./health-center/models/health-center.entity";
import { HealthCenterService } from "./health-center/services/health-center.interface.service";
import { Patient } from "./patient/models/patient.entity";
import { PatientService } from "./patient/services/patient.interface.service";
import { User } from "./user/models/user.entity";
import { UserService } from "./user/services/user.interface.service";




export{
    DoctorService,
    Doctor,

    DoctorCenterService,
    DoctorCenter,

    PatientService,
    Patient,

    HealthCenterService,
    HealthCenter,

    UserService,
    User,
}