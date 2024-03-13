import { Lock, Sms } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Image, Switch } from 'react-native';
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import { appColors } from "../../constants/appColors";
import SocialLogin from "./components/SocialLogin";
import authenticationAPI from "../../apis/authApi";
import { Validate } from "../../utils/validate";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const emailValidation = Validate.email(email);
        if (!email || !password || !emailValidation) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [email, password]);

    const handleLogin = async () => {
        const emaiValidation = Validate.email(email);
        if (emaiValidation) {
            setIsLoading(true);
            try {
                const res = await authenticationAPI.HandleAuthentication(
                    '/login',
                    { email, password },
                    'post',
                );
                dispatch(addAuth(res.data));

                await AsyncStorage.setItem(
                    'auth',
                    isRemember ? JSON.stringify(res.data) : email,
                );
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Email không đúng');
        }
    };
    return (
        <ContainerComponent isImageBackground isScroll>
            <SectionComponent styles={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 75,
            }}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{
                        width: 182,
                        height: 134,
                        resizeMode: 'contain',
                        marginBottom: 30,
                    }}
                />
            </SectionComponent>
            <SectionComponent>
                <TextComponent size={24} title text="Sign in" />
                <SpaceComponent height={21} />
                <InputComponent
                    value={email}
                    placeholder="Email"
                    onChange={val => setEmail(val)}
                    // isPassword
                    allowClear
                    affix={<Sms size={22} color={appColors.gray} />}
                />
                <InputComponent
                    value={password}
                    placeholder="Password"
                    onChange={val => setPassword(val)}
                    isPassword
                    allowClear
                    affix={<Lock size={22} color={appColors.gray} />}
                />
                <RowComponent justify='space-between'>
                    <RowComponent onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ true: appColors.primary }}
                            thumbColor={appColors.white}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)} />

                        <TextComponent text="Remember me" />

                    </RowComponent>
                    <ButtonComponent
                        text="Forgot Password"
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type="text"
                    />
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={16} />
            <SectionComponent>
                <ButtonComponent
                    dissable={isLoading || isDisable}
                    onPress={handleLogin}
                    text="ĐĂNG NHẬP"
                    type="primary" />
            </SectionComponent>
            <SocialLogin />
            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent text="Bạn chưa có tài khoản? " />
                    <ButtonComponent
                        type="link"
                        text="Sign up"
                        onPress={() => navigation.navigate('SignUpScreen')} />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    );
};

export default LoginScreen;