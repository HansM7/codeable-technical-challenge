import { useEffect, useState } from "react";
import IndexTemplate from "../templates/index.template";
import { authHook } from "@/hooks/auth.hook";
import { c_section } from "@/contants/section.constant";

function IndexPage() {
  const [section, setSection] = useState(c_section.UPLOAD);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);

  const { validateSession } = authHook();

  useEffect(() => {
    validateSession();
  }, []);
  return (
    <IndexTemplate
      section={section}
      setSection={setSection}
      errors={errors}
      setErrors={setErrors}
      success={success}
      setSuccess={setSuccess}
    ></IndexTemplate>
  );
}

export default IndexPage;
