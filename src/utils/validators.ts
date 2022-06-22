import { HttpException } from "@nestjs/common"
import { CreateCompanyDTO } from "src/company/dto/createCompany.dto"
import { UpdateCompanyDTO } from "src/company/dto/updateCompany.dto"
import { CreateCountryDTO } from "src/country/dto/createCountry.dto"
import { UpdateCountryDTO } from "src/country/dto/updateCountry.dto"
import { CreateDepartmentDTO } from "src/department/dto/createDepartmentDTO"
import { UpdateDepartmentDTO } from "src/department/dto/updateDepartmentDTO"
import { CreateLvlDTO } from "src/lvl/dto/createLvl.dto"
import { UpdateLvlDTO } from "src/lvl/dto/updateLvl.dto"
import { CreateProjectDTO } from "src/project/dto/createProject.dto"
import { UpdateProjectDTO } from "src/project/dto/updateProject.dto"
import { CreateTechnologyDTO } from "src/technology/dto/createTechnology.dto"
import { UpdateTechnologyDTO } from "src/technology/dto/updateTechnology.dto"
import { CreateWorkerDTO } from "src/worker/dto/createWorker.dto"
import { UpdateWorkerDTO } from "src/worker/dto/updateWorker.dto"


type DTO = CreateCompanyDTO | UpdateCompanyDTO | CreateCountryDTO | UpdateCountryDTO | CreateDepartmentDTO | UpdateDepartmentDTO |
CreateLvlDTO | UpdateLvlDTO | CreateProjectDTO | UpdateProjectDTO | CreateTechnologyDTO | UpdateTechnologyDTO | CreateWorkerDTO | UpdateWorkerDTO;

export const checkNumberOfProperties = (transferObject: DTO) => {
    if(Object.keys(transferObject).length == 0) throw new HttpException({
        statusCode: "400",
        message: ["Empty JSON"],
        error: "Bad request",
      }, 400);
}