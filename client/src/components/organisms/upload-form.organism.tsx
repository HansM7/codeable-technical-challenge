import axios from "axios";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { c_section } from "@/contants/section.constant";
import { useToast } from "@/components/ui/use-toast";

import {
  api_post_upload,
  api_post_upload_validate,
} from "@/contants/api.constant";

function UploadFormOrganism({
  setSection,
  setErrors,
  setSuccess,
}: {
  setSection: any;
  setErrors: any;
  setSuccess: any;
}) {
  const { toast } = useToast();

  const [file, setFile] = useState("");

  const [loading, setLoading] = useState(false);
  const [charging, setCharging] = useState(false);

  async function handleFileInputChange(e: any) {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      if (selectedFile) {
        setLoading(!loading);
        setFile(selectedFile);

        const headers = {
          Authorization: window.localStorage.getItem("auth-session") as string,
        };

        await axios.post(api_post_upload_validate, formData, {
          headers,
        });

        const additionalDuration = selectedFile.size * 0.02;

        const totalDuration = Math.max(2000, additionalDuration);

        setTimeout(() => {
          setLoading(false);
          activeToast(
            undefined,
            "Success",
            "Archivo validado correctamente, ya puede subirlo.",
            "text-green-600"
          );
        }, totalDuration);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        activeToast(
          undefined,
          "Error",
          "Error al validar archivo, compruebe los campos name, email, age.",
          "text-red-600"
        );
      }, 2000);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (file) {
      setCharging(!charging);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const headers = {
          Authorization: window.localStorage.getItem("auth-session") as string,
        };
        const response = await axios.post(api_post_upload, formData, {
          headers,
        });
        setErrors(response.data.data.errors);
        setSuccess(response.data.data.success);
        setTimeout(() => {
          setCharging(false);
        }, 1000);

        setSection(c_section.DETAIL);
      } catch (error) {
        setTimeout(() => {
          setCharging(false);
        }, 1000);
      }
    } else {
      activeToast(2000, undefined, "Seleccione un archivo", "text-gray-500");
    }
  }

  function activeToast(
    time?: number | undefined,
    title?: string,
    description?: string,
    color: string = "text-blue-600"
  ) {
    console.log("tme toast", time);
    toast({
      title,
      description: (
        <div className={`flex flex-row gap-4 items-center ${color}`}>
          {description}
        </div>
      ),
      duration: time,
    });
  }

  return (
    <div className="w-full border rounded-md py-24 px-4 shadow-md mt-4">
      <form
        action=""
        className="flex flex-col items-center gap-8"
        onSubmit={handleSubmit}
      >
        <span>Selecciona un archivo de carga</span>
        <input
          accept=".xls,.xlsx,.csv"
          type="file"
          onChange={handleFileInputChange}
        />
        {charging ? (
          <Button disabled className="flex items-center gap-2">
            <span>Processing</span>
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </Button>
        ) : (
          <Button disabled={loading}>Upload file</Button>
        )}
      </form>
    </div>
  );
}

export default UploadFormOrganism;
