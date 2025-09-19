import { Text, View } from "react-native";
import { Image } from '@/components/ui/image';
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { InstagramIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "@/components/ui/link";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from '@react-navigation/stack';
import { RotasDeNavegacao } from "@/navigation/types";


type NavigationProps = StackNavigationProp<RotasDeNavegacao, 'login'>;

export default function Initial() {

    const navigation = useNavigation<NavigationProps>();

    return (
        <LinearGradient
            colors={['#FF6B00', '#fb923c']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            className="flex-1 items-center justify-center gap-3"
        >
            <View className="flex mb-10">
                <View className="mb-10">
                    <Image
                        size="2xl"
                        source={require('../../assets/images/logos-icons/prototipo_logo_app.png')}
                        alt="logo"
                    />
                </View>
                <View className="flex gap-5">
                    <Button
                        onPress={navigation.navigate('login')}
                        className="rounded-3xl bg-white"
                        variant="solid" size="xl" action="primary">
                        <ButtonText className="color-black">Entrar</ButtonText>
                    </Button>
                    <Button
                        className="rounded-3xl"
                        variant="outline" size="xl" action="primary">
                        <ButtonText className="color-white">Cadastrar</ButtonText>
                    </Button>
                </View>
            </View>
            <View className="flex justify-center items-center mt-14">
                <Text className="color-white">Conheça nossas redes Sociais</Text>
                <Link
                    className="p-5"
                    href="https://instagram.com/ndrd.gustavo?igsh=MXJmd2lzMTIpaDhzdQ==">
                    <Icon className="flex bg-white justify-center rounded-lg p-4" as={InstagramIcon} />
                </Link>

            </View>
        </LinearGradient>
    )
}