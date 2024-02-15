import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function App() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Show Toast
    </Button>
  );
}

export default App;
