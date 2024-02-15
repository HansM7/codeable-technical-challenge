import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "../ui/button";
import { c_section } from "@/contants/section.constant";
import RowOrganism from "./row.organism";

function DetailUploadOrganism({
  setSection,
  errors,
  success,
}: {
  setSection: any;
  errors: any[];
  success: any[];
}) {
  console.log(errors);
  console.log(success);

  return (
    <div className="w-full border rounded-md flex flex-col gap-8 p-4 shadow-md mt-4">
      <header className="flex justify-between items-center">
        <div className="w-full flex justify-center">
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
              </div>
              <span role="button">✖️</span>
            </AlertDescription>
          </Alert>
        </div>

        <Button onClick={() => setSection(c_section.UPLOAD)}>New File</Button>
      </header>

      <section className="mt-8">
        <h4>
          The (2) records listed below encountered errors. Please rectify these
          issues and retry
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
              {/* Si requerimos mantener al unificacion de responsabilidad, entonces podriamos volverlo el tr un solo componente */}
              {errors.map((error: any, index) => (
                // <tr key={index}>
                //   <td valign="top">{error.row}</td>
                //   <td valign="top" width={200}>
                //     <div>
                //       <input
                //         className={`w-full px-2 py-1 rounded-md border ${
                //           error.details.name.message.length
                //             ? "border-red-500"
                //             : ""
                //         }  outline-none`}
                //         type="text"
                //         defaultValue={error.details.name.value}
                //       />
                //       <span className="text-red-500 text-xs">
                //         {error.details.name.message}
                //       </span>
                //     </div>
                //   </td>
                //   <td valign="top">
                //     <div className="flex flex-col">
                //       <input
                //         className={`w-full px-2 py-1 rounded-md border ${
                //           error.details.name.message.length
                //             ? "border-red-500"
                //             : ""
                //         }  outline-none`}
                //         type="text"
                //         defaultValue={error.details.email.value}
                //       />
                //       <span className="text-red-500 text-xs">
                //         {error.details.email.message}
                //       </span>
                //     </div>
                //   </td>
                //   <td valign="top">
                //     <div className="flex flex-col">
                //       <input
                //         className={`w-full px-2 py-1 rounded-md border ${
                //           error.details.name.message.length
                //             ? "border-red-500"
                //             : ""
                //         }  outline-none`}
                //         type="text"
                //         defaultValue={error.details.age.value}
                //       />
                //       <span className="text-red-500 text-xs">
                //         {error.details.age.message}
                //       </span>
                //     </div>
                //   </td>
                //   <td valign="top">
                //     <Button onClick={() => handleModified(index)}>Retry</Button>
                //   </td>
                // </tr>
                <RowOrganism error={error} key={index}></RowOrganism>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DetailUploadOrganism;
