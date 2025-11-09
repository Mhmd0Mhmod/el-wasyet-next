"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useCallback, useState } from "react";

import { useClients } from "@/hooks/useClients";
import { cn } from "@/lib/utils";
import Dialog from "../../shared/Dialog";
import { useOrderForm } from "../../providers/OrderFormProvider";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import ClientForm from "../clients/ClientsForm";
interface ClientSelectorProps {
  placeholder?: string;
  className?: string;
}

function ClientSelector({
  placeholder = "اختر عميل...",
  className,
}: ClientSelectorProps = {}) {
  const { form } = useOrderForm();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { clients, isLoadingClients, refetchClients } = useClients(searchTerm);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value.replace(/[^+\d]/g, ""));
  }, []);
  const selectedClientId = form.watch("ClientId");
  const selectedClient = clients.find(
    (client) => client.id === selectedClientId,
  );
  const onUpdateClient = () => {
    refetchClients();
  };
  return (
    <>
      <FormField
        control={form.control}
        name="ClientId"
        render={({ field }) => {
          const selectedClient = clients.find(
            (client) => client.id === field.value,
          );
          return (
            <FormItem className={className}>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      <span className="truncate">
                        {selectedClient ? selectedClient.name : placeholder}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command shouldFilter={false}>
                    <CommandInput
                      dir="ltr"
                      placeholder="ابحث عن عميل (رقم الهاتف )"
                      value={searchTerm}
                      onValueChange={handleSearchChange}
                      className="h-9"
                    />
                    <CommandList>
                      {isLoadingClients && (
                        <CommandEmpty>جاري البحث...</CommandEmpty>
                      )}
                      {!isLoadingClients && searchTerm.length < 11 && (
                        <CommandEmpty>
                          أدخل رقم هاتف مكون من 11 رقمًا
                        </CommandEmpty>
                      )}
                      {!isLoadingClients &&
                        searchTerm.length >= 11 &&
                        clients.length === 0 && (
                          <Dialog>
                            <Dialog.Trigger>
                              <Button variant="ghost" className="w-full">
                                <Plus size={16} />
                                إضافة عميل
                              </Button>
                            </Dialog.Trigger>
                            <Dialog.Content title="إضافة عميل">
                              <ClientForm onSubmit={onUpdateClient} />
                            </Dialog.Content>
                          </Dialog>
                        )}
                      {!isLoadingClients && clients.length > 0 && (
                        <CommandGroup>
                          {clients.map((client) => (
                            <CommandItem
                              key={client.id}
                              value={client.id?.toString()}
                              onSelect={() => {
                                field.onChange(
                                  client.id === field.value ? 0 : client.id,
                                );
                                setOpen(false);
                              }}
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
                                  field.value === client.id
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
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <Input value={selectedClient?.name || ""} disabled />
    </>
  );
}
export default ClientSelector;
