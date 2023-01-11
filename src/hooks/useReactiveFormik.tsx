import { FormikConfig, FormikValues, useFormik } from "formik";

import { useEffect } from "react";

export function useReactiveFormik<T>(formikConfig: FormikConfig<FormikValues>, initialValues: T | any){
    const formik = useFormik({
        ...formikConfig,
        initialValues
    });

    useEffect(() => {
        if(initialValues) formik.setValues(initialValues)
    }, [initialValues]) 

    return formik;
}