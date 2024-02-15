import React from "react";
import HeaderOrganism from "../organisms/header.organism";
import ContainerTemplate from "./container.template";
import UploadFormOrganism from "../organisms/upload-form.organism";
import DetailUploadOrganism from "../organisms/detail-upload.organism";
import { c_section } from "@/contants/section.constant";

function IndexTemplate({
  section = c_section.UPLOAD,
  setSection,
  errors,
  setErrors,
  success,
  setSuccess,
}: {
  section?: string;
  setSection: any;
  errors: any[];
  setErrors: any;
  success: any[];
  setSuccess: any;
}) {
  if (section === c_section.UPLOAD) {
    return (
      <div className="flex flex-col">
        <HeaderOrganism></HeaderOrganism>
        <ContainerTemplate>
          <h2 className="text-2xl mt-8">Sistema carga de datos</h2>
          <UploadFormOrganism
            setSection={setSection}
            setErrors={setErrors}
            setSuccess={setSuccess}
          ></UploadFormOrganism>
        </ContainerTemplate>
      </div>
    );
  } else if (section === c_section.DETAIL) {
    return (
      <div className="flex flex-col">
        <HeaderOrganism></HeaderOrganism>
        <ContainerTemplate>
          <h2 className="text-2xl mt-8">Sistema carga de datos</h2>
          <DetailUploadOrganism
            setSection={setSection}
            errors={errors}
            success={success}
          ></DetailUploadOrganism>
        </ContainerTemplate>
      </div>
    );
  }
}

export default IndexTemplate;
