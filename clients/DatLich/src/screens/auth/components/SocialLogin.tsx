import React, { useState } from "react";
import { Facebook, Google } from "../../../assets/svgs";
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from "../../../components";
import { appColors } from "../../../constants/appColors";
import { fontFamilies } from "../../../constants/fontFamilies";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import authenticationAPI from "../../../apis/authApi";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../redux/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

GoogleSignin.configure({
    webClientId:
        '1092250210543-gittpg370msdu3n38lmhvodj1ujgk1nu.apps.googleusercontent.com',
});
const SocialLogin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleLoginWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });

        const api = `/google-signin`;

        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();

            const user = userInfo.user;
            const res: any = await authenticationAPI.HandleAuthentication(
                api,
                user,
                'post');

            dispatch(addAuth(res.data));

            await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SectionComponent >
            <TextComponent
                styles={{ textAlign: 'center' }}
                text="OR"
                color={appColors.gray4}
                size={14}
                font={fontFamilies.medium} />
            <SpaceComponent height={16} />

            <ButtonComponent
                type="primary"
                onPress={handleLoginWithGoogle}
                text="Login with Google"
                color={appColors.white}
                textColor={appColors.text}
                textFont={fontFamilies.regular}
                icon={<Google />}
                iconFlex="left" />
            <ButtonComponent
                dissable={true}
                type="primary"
                text="Login with Facebook"
                color={appColors.white}
                textColor={appColors.text}
                textFont={fontFamilies.regular}
                icon={<Facebook />}
                iconFlex="left" />
        </SectionComponent>
    )
}
export default SocialLogin