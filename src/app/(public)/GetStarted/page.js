import HowThisActually from '@/components/publicComponents/HowThisActually';
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
        </div>
    );
};

export default GetStarted;