import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { sberBox } from '@salutejs/plasma-tokens/typo';

import { darkSber } from '@salutejs/plasma-tokens';
import { text, background, gradient } from '@salutejs/plasma-tokens';

const TypoScale = createGlobalStyle(sberBox);

const DocStyles = createGlobalStyle`
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
        min-height: 100vh;
    }
`;

const Theme = createGlobalStyle(darkSber);

const Background_app = () => {
    return(
        <div className="Background_app">
            <TypoScale/>
            <DocStyles/>
            <Theme/>
        </div>

    )
}

export default Background_app;