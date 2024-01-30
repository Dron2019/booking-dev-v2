import PropTypes from "prop-types"
import React, { useEffect, useState, useRef } from 'react';
import InputRow from '../form/InputRow';
import ButtonLarge from '../buttons/ButtonLarge';
import { Link, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import CheckboxRow from '../form/CheckboxRow';
import PhoneInputRow from '../form/PhoneInputRow';
import { routes } from "../../routes";
import LinkWrapper from "../LinkWrapper";
import { Grid } from "@mui/material";

export default function StageDiscountRequestFillForm({ formTitle = '', submitTitle = '', form = [], setFormOnUnmount = () => {}, onSubmit = () => {}, hideSubmitButton }){

    const [ formData, setFormData ] = useState([...form]);
    const valueRef = useRef({});

    useEffect(() => {
        valueRef.current = formData
    }, [formData])

    useEffect(() => {
        return () => setFormOnUnmount(valueRef.current);
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className="text-style-1920-3-d-h-3 text-color-text-900" style={{ textAlign: 'center' }}>
                {formTitle}
            </Grid>
            <Grid item xs={12}>

                <Formik
                    initialValues={formData.reduce((acc, field) => {
                        acc[field.name] = field.value;
                        return acc;
                    }, {})}
                    validate={values => {
                        const errors = {};
                        formData.forEach(field => {
                            if (!field.is_required) return;
                            if (field.is_required && !values[field.name]) errors[field.name] = field.required_message || 'Поле обов\'язкове для заповнення';
                            if (field.validationExspression && !new RegExp(field.validationExspression).test(values[field.name])) errors[field.name] = field.invalid_message || 'Поле заповнено невірно';
                        })
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        setFieldValue,
                        errors,
                        touched,
                        setTouched,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {formData.filter(el=> /text/.test(el.type)).map((field, index) => (
                                <InputRow
                                    key={field.name}
                                    title={field.label}
                                    value={values[field.name]}
                                    inputPattern={field.input_pattern}
                                    onChange={(value) => {
                                        setFieldValue(field.name, value);
                                        const clonedFormData = [...formData];
                                        const index = clonedFormData.findIndex(el=>el.name===field.name);
                                        clonedFormData[index].value = value;
                                    }}
                                    onFocus={() => {
                                        if (touched[field.name]) return;
                                        setTouched({ ...touched, [field.name]: true });
                                    }}
                                    onBlur={handleBlur}
                                    error={(touched[field.name] && errors[field.name])}
                                    success={touched[field.name] && !errors[field.name]}
                                    errorText={errors[field.name]}
                                    name={field.name}
                                />
                                ))}
                            {formData.filter(el=> /phone/.test(el.type)).map((field, index) => (
                                <PhoneInputRow
                                    key={field.name}
                                    title={field.label}
                                    value={values[field.name]}
                                    onChange={(value) => {
                                        setFieldValue(field.name, value);
                                        const clonedFormData = [...formData];
                                        const index = clonedFormData.findIndex(el=>el.name===field.name);
                                        clonedFormData[index].value = value;
                                    }}
                                    onFocus={() => {
                                        if (touched[field.name]) return;
                                        setTouched({ ...touched, [field.name]: true });
                                    }}
                                    onBlur={handleBlur}
                                    error={(touched[field.name] && errors[field.name])}
                                    success={touched[field.name] && !errors[field.name]}
                                    errorText={errors[field.name]}
                                    name={field.name}
                                />
                            ))}
                            {formData.filter(el=>el.type==='checkbox').map((field, index) => (
                                <>  
                                    <CheckboxRow
                                        title={<LinkWrapper text={field.label} routes={routes}/>}
                                        key={index}
                                        defaultChecked={!!values[field.name]}
                                        checked={!!values[field.name]}
                                        error={(touched[field.name] && errors[field.name])}
                                        errorText={errors[field.name]}
                                        onChange={(evt) => {
                                            const clonedFormData = [...formData];
                                            const index = clonedFormData.findIndex(el=>el.name===field.name);
                                            clonedFormData[index].value = evt.target.checked || '';
                                            if (!touched[field.name]) setTouched({ ...touched, [field.name]: true });
                                            
                                            if (evt.target.checked)  {
                                                setFieldValue(field.name, true);
                                            } else {
                                                setFieldValue(field.name, '');
                                            }
                                        }}
                                    />
                                </>
                            ))}
                            <ButtonLarge type="submit" disabled={isSubmitting || hideSubmitButton}>
                                {submitTitle}
                            </ButtonLarge>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    )
}

StageDiscountRequestFillForm.propTypes = {
    form: PropTypes.array,
    formTitle: PropTypes.string,
    onSubmit: PropTypes.func,
    setFormOnUnmount: PropTypes.func,
    submitTitle: PropTypes.string
}

