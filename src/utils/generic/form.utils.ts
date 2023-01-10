import { FormEvent } from "react";
import { FormikConfig } from "formik";

export async function createFormSubmitHandler(e: FormEvent<HTMLFormElement>, formik: any){
    e.preventDefault()
    formik.setSubmitting(true)
    await formik.submitForm();
    formik.setSubmitting(false);
}

export function parseJsonToFormData(jsonData: object){
    const formData = new FormData();

    Object.entries(jsonData).forEach(([key,value]) => {
        if(value?.name) return formData.append(key, value, value?.name)
        else return formData.append(key, value);
    });

    return formData
}