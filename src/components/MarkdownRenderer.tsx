import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./MarkdownRenderer.module.css";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className={styles.markdown}>
            <Markdown remarkPlugins={[remarkGfm]}>
                {content}
            </Markdown>
        </div>
    );
}
