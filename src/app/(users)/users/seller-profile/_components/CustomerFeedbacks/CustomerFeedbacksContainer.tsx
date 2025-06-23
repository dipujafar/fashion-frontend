import React from 'react';
import SendFeedbacksForm from './SendFeedbacksForm';
import CustomerFeedbacks from './CustomerFeedbacks';

const CustomerFeedbacksContainer = () => {
    return (
        <div>
            <SendFeedbacksForm/>
            <CustomerFeedbacks/>
        </div>
    );
};

export default CustomerFeedbacksContainer;