import React, { useState, useEffect } from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
// import * as yup from "yup";
// import {​​​​​​​​yupResolver}​​​​​​​​ from "@hookform/resolvers/yup";
// import {​​​​​​​​useForm}​​​​​​​​ from "react-hook-form";


// const schema = yup.object().shape({
//     email: yup.string().required().email()
// });

// const NewsLetterForm = ({ status, message, onValidated }) => {
//     const { register, formState: { errors, isValid }, handleSubmit } = useForm({ resolver: yupResolver(schema) });

//     // const {modalOpen, setModalOpen} = useGHStContext();

//     const handleSubscribeSubmit = (data) => {


//     }

//     return (
//         <form onSubmit={handleSubmit(handleSubscribeSubmit)}>
//             <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
//             <Button type="submit" disabled={!isValid}>subscribe</Button>

//         </form>
//     );
// };

// export default NewsLetterForm;
