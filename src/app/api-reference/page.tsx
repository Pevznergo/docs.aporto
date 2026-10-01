import MarkdownRenderer from "../../components/MarkdownRenderer";
import { DOC_CONTENT } from "@/lib/docs-content";

export default function ApiReferencePage() {
    return <MarkdownRenderer content={DOC_CONTENT.en["api-reference"]} />;
}
