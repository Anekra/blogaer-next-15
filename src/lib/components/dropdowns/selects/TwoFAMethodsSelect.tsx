import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/lib/components/ui/select";
import { useToast } from "@/lib/hooks/use-toast";

export default function TwoFAMethodsSelect({
  twoFAMethod,
  handleOptionChange
}: {
  twoFAMethod?: string;
  handleOptionChange: (value: string) => void;
}) {
  const { toast } = useToast();
  const handleOnValueChange = async (v: string) => {
    handleOptionChange(v);
    const res = await patchClientFetch({ twoFaMethod: v }, "/user/settings");
    if (res) {
      toast({
        title: "Two factor authentication method changed successfully.",
        duration: 1800,
        variant: "success"
      });
    } else {
      toast({
        title: "Something went wrong please try again later!",
        duration: 1800,
        variant: "destructive"
      });
    }
  };

  return (
    <Select
      value={twoFAMethod || "passkey"}
      onValueChange={handleOnValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Passkey" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="passkey">Passkey</SelectItem>
          <SelectItem value="app">Authenticator app</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
