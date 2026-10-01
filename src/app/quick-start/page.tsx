import MarkdownRenderer from "../../components/MarkdownRenderer";
import { DOC_CONTENT } from "@/lib/docs-content";

export default function QuickStartPage() {
    return <MarkdownRenderer content={DOC_CONTENT.en["quick-start"]} />;
}
