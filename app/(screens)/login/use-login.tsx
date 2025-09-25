import { useForm } from "react-hook-form";
import { loginSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const useLogin = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			user: "",
			password: "",
		},
		mode: "all",
	});
    return {
        form
    };
}