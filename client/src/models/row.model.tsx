import * as Yup from "yup";

export const rowSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("El formato del campo 'name' es inválido.")
    .required("El campo 'name' no puede estar vacio"),
  email: Yup.string()
    .email("El formato del campo 'email' es inválido.")
    .required("El campo 'email' es requerido"),
  age: Yup.number()
    .typeError("El formato del campo 'age' es inválido.")
    .required("El 'age' no puede estar vacio"),
});
