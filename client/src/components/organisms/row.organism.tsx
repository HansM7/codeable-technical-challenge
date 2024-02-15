import { useFormik } from "formik";
import { Button } from "../ui/button";
import { rowSchema } from "@/models/row.model";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_post_users } from "@/contants/api.constant";

function RowOrganism({
  index,
  error,
  handleRemoveRow,
}: {
  index: number;
  error: any;
  handleRemoveRow: any;
}) {
  const formik: any = useFormik({
    initialValues: {
      name: error.details.name.value,
      email: error.details.email.value,
      age: error.details.age.value,
    },
    validationSchema: rowSchema,
    onSubmit: async (values) => {
      try {
        const headers = {
          Authorization: window.localStorage.getItem("auth-session") as string,
        };

        await axios.post(api_post_users, values, { headers });
        handleRemoveRow(index);
      } catch (error) {
        alert("Error in register row");
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: error.details.name.value,
      email: error.details.email.value,
      age: error.details.age.value,
    });
  }, [index, error]);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (formik.errors.name || formik.errors.email || formik.errors.age) {
      if (!isError) {
        setIsError(true);
      }
    }
  }, [formik.errors]);

  return (
    <tr>
      <td valign="top">{error.row}</td>
      {/* name ------------------------------------ */}
      <td valign="top" width={200}>
        <div>
          <input
            autoComplete="off"
            className={`w-full px-2 py-1 rounded-md border ${
              error.details.name.message.length > 0 && !isError
                ? "border-red-500"
                : ""
            } ${
              formik.errors.name && isError ? "border-red-500" : ""
            }   outline-none`}
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {isError ? (
            <span className="text-red-500 text-xs">
              {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </span>
          ) : (
            <span className="text-red-500 text-xs">
              {error.details.email.name}
            </span>
          )}
        </div>
      </td>

      {/* email ------------------------------------ */}

      <td valign="top">
        <div className="flex flex-col">
          <input
            autoComplete="off"
            className={`w-full px-2 py-1 rounded-md border ${
              error.details.email.message.length > 0 && !isError
                ? "border-red-500"
                : ""
            } ${
              formik.errors.email && isError ? "border-red-500" : ""
            }   outline-none`}
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {isError ? (
            <span className="text-red-500 text-xs">
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </span>
          ) : (
            <span className="text-red-500 text-xs">
              {error.details.email.message}
            </span>
          )}
        </div>
      </td>

      {/* age ------------------------------------ */}

      <td valign="top">
        <div className="flex flex-col">
          <input
            autoComplete="off"
            className={`w-full px-2 py-1 rounded-md border ${
              error.details.age.message.length > 0 && !isError
                ? "border-red-500"
                : ""
            } ${
              formik.errors.age && isError ? "border-red-500" : ""
            }   outline-none`}
            type="text"
            name="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
          />
          {isError ? (
            <span className="text-red-500 text-xs">
              {formik.errors.age ? <div>{formik.errors.age}</div> : null}
            </span>
          ) : (
            <span className="text-red-500 text-xs">
              {error.details.age.message}
            </span>
          )}
        </div>
      </td>
      <td valign="top">
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid}
        >
          Retry
        </Button>
      </td>
    </tr>
  );
}

export default RowOrganism;
