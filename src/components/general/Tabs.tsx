import {
  TabsList as TabsListComponent,
  TabsTrigger as TabsTriggerComponent,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

function TabsList({
  children,
  className,
  ...props
}: React.ComponentProps<typeof TabsListComponent>) {
  return (
    <TabsListComponent
      className={cn("mb-4 h-auto w-full gap-2 bg-transparent p-1", className)}
      {...props}
    >
      {children}
    </TabsListComponent>
  );
}
function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsTriggerComponent>) {
  return (
    <TabsTriggerComponent
      className={cn(
        "data-[state=active]:bg-primary rounded-lg bg-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 data-[state=active]:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </TabsTriggerComponent>
  );
}

export { TabsList, TabsTrigger };
