import React from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Link } from 'react-router-dom';
import classes from "./NewsLetterComponent.css"


const NewsLetterComponent = props => {
    const postUrl = `https://gmail.us6.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;
    return (
        <div className={classes.Container}>
            <MailchimpSubscribe url={postUrl} />
        </div>
    );
};

export default NewsLetterComponent;