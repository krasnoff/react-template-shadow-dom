import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';

export interface TemplateProps {
    children?: React.ReactNode;
    shadowrootmode?: 'open' | 'closed';
    sheet?: CSSStyleSheet;
    shadowrootclonable?: boolean;
    shadowrootdelegatesfocus?: boolean;
    shadowrootserializable?: boolean;
    slotAssignment?: 'manual' | 'named';
    connectedCallback?: (shadowRoot: ShadowRoot, hostElement: HTMLDivElement) => void;
}

export const Template: React.FC<TemplateProps> = ({ 
        children, 
        shadowrootmode = 'open', 
        sheet, 
        shadowrootclonable = false, 
        shadowrootdelegatesfocus = false, 
        shadowrootserializable = false,
        slotAssignment = 'named',
        connectedCallback }) => {
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
    }, [shadowrootmode, children, sheet, shadowrootclonable, shadowrootdelegatesfocus, shadowrootserializable, slotAssignment, connectedCallback]);

    // Create shadow DOM when component mounts
    useEffect(() => {
        if (hostRef.current && hostRef.current.shadowRoot === null) {
            const shadowDom = hostRef.current.attachShadow({ 
                mode: shadowrootmode, 
                delegatesFocus: shadowrootdelegatesfocus, 
                clonable: shadowrootclonable, 
                serializable: shadowrootserializable,
                slotAssignment: slotAssignment
            });
            if (shadowDom) {
                rootRef.current = createRoot(shadowDom);
                updateChildren();
                if (sheet) {
                    shadowDom.adoptedStyleSheets = [sheet];
                }
                
                // Call connectedCallback when shadow DOM is successfully created
                if (connectedCallback && hostRef.current) {
                    connectedCallback(shadowDom, hostRef.current);
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
            ref={hostRef} 
            key={key}> {/* Add key to force DOM recreation */}
        </div>
    );
}

