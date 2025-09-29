"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { useClients } from "@/hooks/useClients";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
interface ClientSelectorProps {
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

function ClientSelector({
  placeholder = "اختر عميل...",
  emptyMessage = "لا يوجد عملاء.",
  className,
}: ClientSelectorProps = {}) {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const { clients, isLoadingClients, clientsError } = useClients(searchTerm);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id.toString() === selectedClientId),
    [clients, selectedClientId],
  );

  const handleSelect = useCallback(
    (clientId: string) => {
      const newValue = clientId === selectedClientId ? "" : clientId;
      setSelectedClientId(newValue);
      form.setValue("clientId", newValue ? parseInt(newValue) : null);
      setOpen(false);
    },
    [selectedClientId, form],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
          >
            <span className="truncate">
              {selectedClient ? selectedClient.name : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="ابحث عن عميل (رقم الهاتف )"
              value={searchTerm}
              onValueChange={handleSearchChange}
              className="h-9"
            />
            <CommandList>
              {isLoadingClients && <CommandEmpty>جاري البحث...</CommandEmpty>}
              {!isLoadingClients && searchTerm.length < 2 && (
                <CommandEmpty>اكتب على الأقل حرفين للبحث</CommandEmpty>
              )}
              {!isLoadingClients &&
                searchTerm.length >= 2 &&
                clients.length === 0 && (
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                )}
              {!isLoadingClients && clients.length > 0 && (
                <CommandGroup>
                  {clients.map((client) => (
                    <CommandItem
                      key={client.id}
                      value={client.id.toString()}
                      onSelect={handleSelect}
                      className="flex items-center gap-2"
                    >
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-medium">
                          {client.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {client.phone1}
                        </span>
                      </div>
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          selectedClientId === client.id.toString()
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        placeholder="اسم العميل "
        value={selectedClient?.name || ""}
        readOnly
        disabled
      />
    </>
  );
}
export default ClientSelector;
