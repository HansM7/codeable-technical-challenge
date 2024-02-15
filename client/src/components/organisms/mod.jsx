import { useFormik } from "formik";
import { Button } from "../ui/button";
import { rowSchema } from "@/models/row.model";

function RowOrganism({ error }: { error: any }) {
  const formik: any = useFormik({
    initialValues: {
      name: error.details.name.value,
      email: error.details.email.value,
      age: error.details.age.value,
    },
    validationSchema: rowSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar la lógica para enviar los valores del formulario
      console.log(values);
    },
  });

  function handleModified() {}
  return (
    <tr>
      <td valign="top">{error.row}</td>
      <td valign="top" width={200}>
        <div>
          <input
            className={`w-full px-2 py-1 rounded-md border ${
              error.details.name.message.length ? "border-red-500" : ""
            }  outline-none`}
            type="text"
            defaultValue={error.details.name.value}
          />
          <span className="text-red-500 text-xs">
            {error.details.name.message}
          </span>
        </div>
      </td>
      <td valign="top">
        <div className="flex flex-col">
          {/* <input
            className={`w-full px-2 py-1 rounded-md border ${
              error.details.name.message.length ? "border-red-500" : ""
            }  outline-none`}
            type="text"
            defaultValue={error.details.email.value}
          /> */}
          <input
            className={`w-full px-2 py-1 rounded-md border ${
              error.details.name.message.length ? "border-red-500" : ""
            }  outline-none`}
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <span>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </span>
          <span className="text-red-500 text-xs">
            {error.details.email.message}
          </span>
        </div>
      </td>
      <td valign="top">
        <div className="flex flex-col">
          <input
            className={`w-full px-2 py-1 rounded-md border ${
              error.details.name.message.length ? "border-red-500" : ""
            }  outline-none`}
            type="text"
            defaultValue={error.details.age.value}
          />
          <span className="text-red-500 text-xs">
            {error.details.age.message}
          </span>
        </div>
      </td>
      <td valign="top">
        <Button onClick={handleModified}>Retry</Button>
      </td>
    </tr>
  );
}

export default RowOrganism;
