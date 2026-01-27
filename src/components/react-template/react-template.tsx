import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';

export interface TemplateProps {
    children?: React.ReactNode;
    shadowrootmode?: 'open' | 'closed';
    sheet?: CSSStyleSheet;
    shadowrootclonable?: boolean;
    shadowrootdelegatesfocus?: boolean;
    shadowrootserializable?: boolean;
}

export const Template: React.FC<TemplateProps> = ({ 
        children, 
        shadowrootmode = 'open', 
        sheet, 
        shadowrootclonable = false, 
        shadowrootdelegatesfocus = false, 
        shadowrootserializable = false }) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);
    const [key, setKey] = useState(0); // Force remount when shadowrootmode changes
    const isInitialMount = useRef(true);

    // Force component remount when shadowrootmode changes
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // Skip on initial mount
        }
        
        setKey(prev => prev + 1);
        
        // Cleanup existing root
        if (rootRef.current) {
            rootRef.current.unmount();
            rootRef.current = null;
        }
    }, [shadowrootmode, children, sheet, shadowrootclonable, shadowrootdelegatesfocus, shadowrootserializable]);

    // Create shadow DOM when component mounts
    useEffect(() => {
        if (hostRef.current && hostRef.current.shadowRoot === null) {
            const shadowDom = hostRef.current.attachShadow({ 
                mode: shadowrootmode, 
                delegatesFocus: shadowrootdelegatesfocus, 
                clonable: shadowrootclonable, 
                serializable: shadowrootserializable 
            });
            if (shadowDom) {
                rootRef.current = createRoot(shadowDom);
                updateChildren();
                if (sheet) {
                    shadowDom.adoptedStyleSheets = [sheet];
                }
            }
        }
    }, [key]); // Recreate when key changes

    const updateChildren = () => {
        if (rootRef.current) {
            const shadowDomJsxElement = (
                <>
                    {children}
                </>
            );
            rootRef.current.render(shadowDomJsxElement);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rootRef.current) {
                rootRef.current.unmount();
            }
        };
    }, []);

    return (
        <div 
            aria-label="Sample Accessibility Component" 
            ref={hostRef} 
            id="container-accessibility-wrapper"
            key={key}> {/* Add key to force DOM recreation */}
        </div>
    );
}

