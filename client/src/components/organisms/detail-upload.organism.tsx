import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "../ui/button";
import { c_section } from "@/contants/section.constant";
import RowOrganism from "./row.organism";
import { useState } from "react";

function DetailUploadOrganism({
  setSection,
  errors,
  success,
  setErrors,
}: {
  setSection: any;
  errors: any[];
  success: any[];
  setErrors: any;
}) {
  const [isShow, setIsShow] = useState(true);
  function handleRemoveRow(index: number) {
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);

    setErrors(updatedErrors);
  }

  function showButton() {
    setIsShow(!isShow);
  }

  return (
    <div className="w-full border rounded-md flex flex-col gap-8 p-4 shadow-md mt-4">
      <header className="flex justify-between items-center">
        <div className="w-full flex justify-center">
          {isShow ? (
            <Alert variant={"success"} className="w-fit">
              <AlertDescription className="text-green-600 flex justify-between items-center gap-4">
                <div>
                  <span>✅</span>
                  <span>
                    {" "}
                    {success.length}{" "}
                    {success.length > 1
                      ? "filas fueron registradas en la base de datos"
                      : "fila fue registrada en la base de datos"}{" "}
                  </span>
                  <span role="button" onClick={showButton}>
                    ❎
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            ""
          )}
        </div>

        <Button onClick={() => setSection(c_section.UPLOAD)}>New File</Button>
      </header>

      <section className="mt-8">
        <h4>
          The ({errors.length}) records listed below encountered errors. Please
          rectify these issues and retry
        </h4>
        <div className="mt-4">
          <table className="w-full" cellPadding={8}>
            <thead>
              <tr>
                <td>Row</td>
                <td>Name</td>
                <td>Email</td>
                <td>Age</td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              {errors.map((error: any, index) => (
                <RowOrganism
                  index={index}
                  error={error}
                  handleRemoveRow={handleRemoveRow}
                  key={index}
                ></RowOrganism>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DetailUploadOrganism;
