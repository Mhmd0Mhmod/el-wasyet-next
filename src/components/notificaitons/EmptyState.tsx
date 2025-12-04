interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return <p className="text-muted-foreground py-8 text-center">{message}</p>;
}
