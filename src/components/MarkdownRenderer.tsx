import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#ccc', lineHeight: '1.6', paddingBottom: '60px' }}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({node, ...props}) => <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', color: '#fff' }} {...props} />,
                    h2: ({node, ...props}) => <h2 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '24px', color: '#fff' }} {...props} />,
                    h3: ({node, ...props}) => <h3 style={{ fontSize: '20px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#fff' }} {...props} />,
                    p: ({node, ...props}) => <p style={{ fontSize: '16px', marginBottom: '24px' }} {...props} />,
                    a: ({node, ...props}) => <a style={{ color: '#00dc82', textDecoration: 'none' }} {...props} />,
                    ul: ({node, ...props}) => <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }} {...props} />,
                    ol: ({node, ...props}) => <ol style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'decimal' }} {...props} />,
                    li: ({node, ...props}) => <li style={{ marginBottom: '8px' }} {...props} />,
                    strong: ({node, ...props}) => <strong style={{ color: '#fff' }} {...props} />,
                    pre: ({node, ...props}) => (
                        <pre style={{ background: '#0a0a0a', padding: '24px', borderRadius: '12px', border: '1px solid #333', overflowX: 'auto', marginBottom: '32px' }}>
                            <code style={{ fontSize: '14px', color: '#aaa', fontFamily: 'monospace' }} {...props} />
                        </pre>
                    ),
                    code: ({node, inline, className, children, ...props}: any) => {
                        if (inline) {
                            return <code style={{ background: '#222', padding: '2px 6px', borderRadius: '4px', color: '#00dc82', fontSize: '14px' }} {...props}>{children}</code>;
                        }
                        return <code {...props}>{children}</code>;
                    },
                    table: ({node, ...props}) => <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px', border: '1px solid #333' }} {...props} />,
                    thead: ({node, ...props}) => <thead style={{ background: '#1a1a1a' }} {...props} />,
                    th: ({node, ...props}) => <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #333', fontSize: '13px', color: '#fff' }} {...props} />,
                    td: ({node, ...props}) => <td style={{ padding: '12px', border: '1px solid #333', fontSize: '14px' }} {...props} />,
                    blockquote: ({node, ...props}) => (
                        <blockquote style={{ background: 'rgba(0, 220, 130, 0.05)', border: '1px solid rgba(0, 220, 130, 0.2)', padding: '24px', borderRadius: '12px', marginBottom: '32px', borderLeft: '4px solid #00dc82' }}>
                            {props.children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </Markdown>
        </div>
    );
}
