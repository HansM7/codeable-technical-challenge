import * as xlsx from "xlsx";
import { httpService } from "./response.service";
import { IUserTemplate } from "../models/interfaces/user.interface";
import { isEmail, isInt } from "validator";
import { userDTO } from "../models/dto/user.dto";
import { userService } from "./user.service";

class FileService {
  async upload(buffer: any, originalname: string) {
    try {
      const type = this.validateFile(originalname);
      const response = this.processFile(buffer);
      response.response.message = "Uploading file type: " + type;
      return response;
    } catch (error) {
      return httpService.http500("Error uploading file", error);
    }
  }

  processFile(buffer: any) {
    try {
      const workbook = xlsx.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetToJson: IUserTemplate[] = xlsx.utils.sheet_to_json(sheet);

      const res_validate_format = this.validateFormat(sheetToJson);
      if (!res_validate_format)
        return httpService.http400("Excel format not valid");
      const errors: any = [];
      const success: any = [];
      sheetToJson.map(async (row, index) => {
        const res_row = this.validateRow(row);

        if (res_row.error)
          errors.push({ row: index + 1, details: res_row.details });
        else {
          success.push(row);

          await userService.create({
            name: row.name,
            email: row.email,
            age: row.age,
          });
        }
      });

      return httpService.http200("upload", { success, errors });
    } catch (error) {
      return httpService.http500("Error uploading file", error);
    }
  }

  validateFormat(dataJson: any) {
    try {
      userDTO.parse(dataJson[0]);
      return true;
    } catch (error) {
      return false;
    }
  }

  validateRow(row: any) {
    let error = 0;
    const details = {
      name: {
        message: "",
        value: "",
      },
      email: {
        message: "",
        value: "",
      },
      age: {
        message: "",
        value: "",
      },
    };
    if (!row.name || row.name === "") {
      details.name.message = "El campo 'name' no puede estar vacío.";

      error++;
    }
    if (!row.email || !isEmail(row.email)) {
      details.email.message = "El formato del campo 'email' es inválido.";

      error++;
    }
    if (!isInt(row.age.toString()) || Number(row.age) < 0) {
      details.age.message = "El formato del campo 'age' es inválido.";

      error++;
    }
    details.name.value = row.name;
    details.email.value = row.email;
    details.age.value = row.age;

    return { error: error > 0 ? true : false, details };
  }

  validateFile(fileName: string) {
    if (/\.csv$/i.test(fileName)) return "csv";
    else if (/\.(xlsx|xls)$/i.test(fileName)) return "excel";
    return "error";
  }

  async validateStructure(buffer: any, originalname: string) {
    try {
      const type = this.validateFile(originalname);

      const workbook = xlsx.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetToJson: IUserTemplate[] = xlsx.utils.sheet_to_json(sheet);
      const res_validate_format = this.validateFormat(sheetToJson);
      if (!res_validate_format)
        return httpService.http400(`Invalid format for file ${originalname}`);
      return httpService.http200(`Valid format for file ${originalname}`);
    } catch (error) {
      return httpService.http500("Error uploading file", error);
    }
  }
}

export const fileService = new FileService();
