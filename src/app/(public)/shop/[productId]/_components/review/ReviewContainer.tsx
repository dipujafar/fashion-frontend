import React from 'react';
import SubmitYourReview from './SubmitYourReview';
import CustomerFeedbacks from './CustomerFeedbacks';

const ReviewContainer = () => {
    return (
        <div className='lg:space-y-8 space-y-5'>
            <SubmitYourReview></SubmitYourReview>
            <CustomerFeedbacks></CustomerFeedbacks>
        </div>
    );
};

export default ReviewContainer;