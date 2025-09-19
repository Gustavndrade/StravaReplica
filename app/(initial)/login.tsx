import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { Input, InputField } from "@/components/ui/input";
import { useLogin } from "../use-login";

export default function login() {
    const { form } = useLogin();
    return (

        <LinearGradient
            colors={['#FF6B00', '#fb923c']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
        >
            <Text>
                Olá,{"\n"}Bem Vindo de Volta!
            </Text>
            <View>
                <FormControl
                    isInvalid={!!form?.formState?.errors?.password?.message}
                    isRequired={!!form?.formState?.errors?.password?.message}
                >
                    <FormControlLabel>
                        <FormControlLabelText className="font-poppins_medium text-our-gray text-sm">
                            Senha
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                className="bg-slate-10 pl-2 rounded-lg">
                                <InputField
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}>
                                </InputField>
                            </Input>
                        )}
                    />
                    <FormControlError>
                        <FormControlErrorText size="xs" className="text-red-500">
                            {form?.formState?.errors?.password?.message}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
            </View>

        </LinearGradient>

    )
}