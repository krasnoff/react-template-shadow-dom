import { useEffect, useRef } from "react";
import { createRoot } from 'react-dom/client';

export interface TemplateProps {
    text?: string;
}

export const Template: React.FC<TemplateProps> = () => {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (hostRef.current && hostRef.current.shadowRoot === null) {
            const shadowDom = hostRef.current?.attachShadow({ mode: 'open' });
            if (shadowDom) {
                const root = createRoot(shadowDom);
                root.render(shadowDomJsxElement);
            }
        }
    }, []);

    const shadowDomJsxElement = 
    <div>
        <p>This is a React component rendered inside Shadow DOM!</p>
    </div>;

    return (
        <div 
            role="region" 
            aria-label="Sample Accessibility Component" 
            ref={hostRef} className={[].join(' ')} id="container-accessibility-wrapper">
        </div>
    );
}

