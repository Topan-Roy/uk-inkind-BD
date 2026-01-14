import HowThisActually from '@/components/publicComponents/HowThisActually';
import PricingSection from '@/components/publicComponents/PricingSection';
import ReadytoRewind from '@/components/publicComponents/ReadytoRewind';
import Therapyshouldn from '@/components/publicComponents/Therapyshouldn';
import WhatIncluded from '@/components/publicComponents/WhatIncluded ';
import React from 'react';

const GetStarted = () => {
    return (
        <div>
            <ReadytoRewind></ReadytoRewind>
            <HowThisActually></HowThisActually>
            <Therapyshouldn></Therapyshouldn>
            <WhatIncluded></WhatIncluded>
            <PricingSection></PricingSection>
        </div>
    );
};

export default GetStarted;