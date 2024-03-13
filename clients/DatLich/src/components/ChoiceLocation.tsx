import { ArrowRight2, Location } from "iconsax-react-native";
import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { RowComponent, SpaceComponent, TextComponent } from ".";
import { appColors } from "../constants/appColors";
import { globalStyles } from "../styles/globalStyles";
import ModalLocation from "../modals/ModalLocation";

const ChoiceLocation = () => {

    const [inVibleModalLocation, setInVibleModalLocation] = useState(false);

    return (
        <>
            <RowComponent onPress={() => setInVibleModalLocation(!inVibleModalLocation)} styles={[globalStyles.inputContainer]}>
                <Location variant='Bold' size={15} color={appColors.primary} />
                <SpaceComponent width={12} />
                <TextComponent text="Kim Sơn , Ninh Bình" flex={1} />
                <ArrowRight2 color={appColors.primary} size={22} />
            </RowComponent>

            <ModalLocation
                visible={inVibleModalLocation}
                onClose={() => setInVibleModalLocation(false)}
                onSelect={val => console.log(val)} />
        </>

    );
};
export default ChoiceLocation;