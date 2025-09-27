import { BranchClientValues } from "@/schema/client";
import { Mail, MapPin, Phone, Trash2, User } from "lucide-react";
import { Button } from "../ui/button";
function BranchClientCard({
  client,
  index,
  onRemove,
  isLoading,
}: {
  client: BranchClientValues;
  index: number;
  onRemove: (index: number) => void;
  isLoading: boolean;
}) {
  return (
    <div className="group hover:border-primary relative rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <User className="text-primary h-4 w-4" />
            <h4 className="font-semibold text-gray-900">{client.name}</h4>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            {client.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-3 w-3 text-gray-400" />
                <span>{client.email}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-3 w-3 text-gray-400" />
              <span>{client.phone1}</span>
            </div>

            {client.phone2 && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-3 w-3 text-gray-400" />
                <span>{client.phone2}</span>
              </div>
            )}

            {client.address && (
              <div className="flex items-center gap-2 text-gray-600 md:col-span-2">
                <MapPin className="h-3 w-3 flex-shrink-0 text-gray-400" />
                <span className="truncate">{client.address}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className="text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-700"
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Index badge */}
      <div className="bg-primary absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white">
        {index + 1}
      </div>
    </div>
  );
}

export default BranchClientCard;
