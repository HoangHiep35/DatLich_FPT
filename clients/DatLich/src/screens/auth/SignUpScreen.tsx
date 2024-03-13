import { Lock, Sms, User } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Image, Switch } from 'react-native';
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from "../../components";
import { appColors } from "../../constants/appColors";
import SocialLogin from "./components/SocialLogin";
import { LoadingModal } from "../../modals";
import authenticationAPI from "../../apis/authApi";
import { Validate } from "../../utils/validate";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ErrorMessages {
    email: string;
    password: string;
    confirmPassword: string;
};
const initValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpScreen = ({ navigation }: any) => {
    const [values, setValues] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();
    const [isDisable, setIsDisable] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!errorMessage ||
            (errorMessage &&
                (errorMessage.email ||
                    errorMessage.password ||
                    errorMessage.confirmPassword)) ||
            !values.email ||
            !values.password ||
            !values.confirmPassword
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        };
    }, [errorMessage, values]);

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values };

        data[`${key}`] = value;

        setValues(data);
    };
    //check Sign up
    const formValidator = (key: string) => {

        const data = { ...errorMessage }
        let message = ``
        switch (key) {
            case 'email':
                if (!values.email) {
                    message = `Email is required!!!`;
                } else if (!Validate.email(values.email)) {
                    message = 'Email is not valited!!!';
                } else {
                    message = '';
                }
                break;

            case 'password':
                message = !values.password ? `Password is required!!` : '';
                break;
            case 'confirmPassword':
                if (!values.confirmPassword) {
                    message = `Please type confirm password`;
                } else if (values.confirmPassword !== values.password) {
                    message = 'Password is not match'
                } else {
                    message = ''
                }
                break;
        };
        data[`${key}`] = message;
        setErrorMessage(data);
    };

    const handleRegister = async () => {

        // const { email, password, confirmPassword } = values;

        // const emailValidation = Validate.email(email);
        // const passValidation = Validate.Password(password);

        // if (email && password && confirmPassword) {
        //     if (emailValidation && passValidation) {
        //         setErrorMessage('');
        //         setIsLoading(true);
        //         try {
        //             const res = await authenticationAPI.HandleAuthentication(
        //                 '/register',
        //                 {
        //                     fullname: values.username,
        //                     email,
        //                     password,
        //                 },
        //                 'post');
        //             dispatch(addAuth(res.data));
        //             await AsyncStorage.setItem('auth', JSON.stringify(res.data))
        //             setIsLoading(false);
        //         } catch (error) {
        //             console.log(error);
        //             setIsLoading(false);
        //         }
        //     } else {
        //         setErrorMessage('Email not correct!')
        //     }
        // } else {
        //     setErrorMessage('Vui lòng nhập đầy đủ thông tin!')
        // }
        const api = `/verification`;
        setIsLoading(true);
        try {
            const res = await authenticationAPI.HandleAuthentication(
                api,
                { email: values.email },
                'post',
            );

            setIsLoading(false);
            navigation.navigate('Verification', {
                code: res.data.code,
                ...values,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <ContainerComponent
                isImageBackground
                isScroll
                back >
                <SectionComponent>
                    <TextComponent size={24} title text="Sign up" />
                    <SpaceComponent height={21} />
                    <InputComponent
                        value={values.username}
                        placeholder="Full name"
                        onChange={val => handleChangeValue('username', val)}
                        // isPassword
                        allowClear
                        affix={<User size={22} color={appColors.gray} />}
                    />
                    <InputComponent
                        value={values.email}
                        placeholder="abc123@gmail.com"
                        onChange={val => handleChangeValue('email', val)}
                        // isPassword
                        allowClear
                        affix={<Sms size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('email')}
                    />
                    <InputComponent
                        value={values.password}
                        placeholder="Password"
                        onChange={val => handleChangeValue('password', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('password')}
                    />
                    <InputComponent
                        value={values.confirmPassword}
                        placeholder="Confirm password"
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        isPassword
                        allowClear
                        affix={<Lock size={22} color={appColors.gray} />}
                        onEnd={() => formValidator('confirmPassword')}
                    />
                </SectionComponent>
                {errorMessage &&
                    (errorMessage.email ||
                        errorMessage.password ||
                        errorMessage.confirmPassword) && (
                        <SectionComponent>
                            {Object.keys(errorMessage).map((error, index) =>
                                errorMessage[`${error}`] && (
                                    <TextComponent
                                        text={errorMessage[`${error}`]}
                                        key={(`error${index}`)}
                                        color={appColors.danger} />
                                ))}
                        </SectionComponent>
                    )}
                <SpaceComponent height={16} />
                <SectionComponent>
                    <ButtonComponent
                        onPress={handleRegister}
                        text="SIGN UP"
                        dissable={isDisable}
                        type="primary" />
                </SectionComponent>
                <SocialLogin />
                <SectionComponent>
                    <RowComponent justify='center'>
                        <TextComponent text="Don't have an account? " />
                        <ButtonComponent
                            type="link"
                            text="Sign in"
                            onPress={() => navigation.navigate('LoginScreen')} />
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>
            <LoadingModal visible={isLoading} />
        </>
    );
};

export default SignUpScreen;