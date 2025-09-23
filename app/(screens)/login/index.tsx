import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { Input, InputField } from "@/components/ui/input";
import { useLogin } from "../../use-login";
import { Button, ButtonText } from "@/components/ui/button";
import { Link, LinkText } from "@/components/ui/link";
import { useRouter } from "expo-router";


export default function login() {

    const router = useRouter();
    const { form } = useLogin();
    return (

        <LinearGradient className="flex-1"
            colors={['#FF6B00', '#fb923c']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
        >

            <View className="flex w-full h-[30%] justify-center ml-4">
                <Text className="color-white font-bold text-4xl" >Olá</Text>
                <Text className="color-white font-bold text-2xl">Bem Vindo de Volta!</Text>
            </View>
            <View className="gap-8 bg-white h-[70%] rounded-t-3xl px-4 pt-16">

                <FormControl
                    isInvalid={!!form?.formState?.errors?.user?.message}
                    isRequired={!!form?.formState?.errors?.user?.message}
                >
                    <FormControlLabel>
                        <FormControlLabelText className="font-poppins_medium text-our-gray text-sm p-2">
                            E-mail
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Controller
                        control={form.control}
                        name="user"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                variant="underlined"
                                className="bg-slate-10 pl-2 rounded-lg ">
                                <InputField
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="exemplouser@gmail.com"
                                    >
                                </InputField>
                            </Input>
                        )}
                    />
                    <FormControlError>
                        <FormControlErrorText size="xs" className="text-red-500">
                            {form?.formState?.errors?.user?.message}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl
                    isInvalid={!!form?.formState?.errors?.password?.message}
                    isRequired={!!form?.formState?.errors?.password?.message}
                >
                    <FormControlLabel>
                        <FormControlLabelText className="font-poppins_medium text-our-gray text-sm p-2">
                            Senha
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input  
                                    variant="underlined"
                                    className="bg-slate-10 pl-2 rounded-lg">
                                <InputField
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Senha de Acesso"
                                    >
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

                <Button 
                onPress={ form.handleSubmit(data => router.push('/mapa'))}
                className="bg-[#FF6B00] rounded-3xl">
                <ButtonText>Entrar</ButtonText>
                </Button>
                <View className="flex flex-col items-end">
                    <Text>Não tem uma conta?</Text>
                    <Link 
                    onPress={()=> router.push('/')}
                    className="color-[#fb923c] underline"
                    >
                    <LinkText>Cadastre-se</LinkText>
                    </Link>
                </View>
            </View>

        </LinearGradient>

    )
}