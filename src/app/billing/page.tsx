import MarkdownRenderer from "../../components/MarkdownRenderer";
import { DOC_CONTENT } from "@/lib/docs-content";

export default function BillingPage() {
    return <MarkdownRenderer content={DOC_CONTENT.en.billing} />;
}
