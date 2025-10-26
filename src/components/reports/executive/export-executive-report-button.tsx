import { Button } from "@/components/ui/button";
import { CloudDownload } from "lucide-react";

function ExportExecutiveReportButton() {
  return (
    <Button>
      <CloudDownload className="ml-2" size={16} />
      تصدير
    </Button>
  );
}
export default ExportExecutiveReportButton;
