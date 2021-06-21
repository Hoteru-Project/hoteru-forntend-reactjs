import React from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsLetterForm from './NewsLetterForm';
// require( './mcFormStyles.scss');


const NewsLetterComponent = props => {
    const postUrl = `https://gmail.us6.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;
    return (
        <div className="mc__form-container">
            <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => (
                    <NewsLetterForm
                        status={status} 
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>
    );
};

export default NewsLetterComponent;