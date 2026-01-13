import { getTickets } from "@/services/apiTicket";
import { useQuery } from "@tanstack/react-query";

export function useTickets() {
  const {
    isLoading,
    data: tickets = [],
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  return { isLoading, tickets, error };
}
