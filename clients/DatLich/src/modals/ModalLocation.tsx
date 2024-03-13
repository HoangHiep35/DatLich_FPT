import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from "../components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { appColors } from "../constants/appColors";
import { SearchNormal1 } from "iconsax-react-native";
import axios from "axios";
import { Location } from "../models/EventModel";
import { FlatList } from "react-native-gesture-handler";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (val: string) => void;
}
const ModalLocation = (props: Props) => {
    const { visible, onClose, onSelect } = props;
    const [searchKey, setSearchKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [location, setLocation] = useState<Location[]>([]);


    // useEffect(() => {
    //     if (!searchKey) {
    //         setLocation([]);
    //     }
    // }, [searchKey]);

    const handleClose = () => {
        onClose();
    };

    // const handleSearchLocation = async () => {

    //     const api = ``;
    //     try {
    //         setIsLoading(true);
    //         const res = await axios.get(api);

    //         if (res && res.data && res.status === 200) {
    //             setLocation(res.data.items);
    //         }

    //         setIsLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return (

        <Modal animationType='slide' visible={visible} style={{ flex: 1 }}>
            <View style={{ paddingVertical: 42, paddingHorizontal: 20 }}>
                <RowComponent justify='flex-end' styles={{ marginVertical: 20 }}>
                    <View style={{ flex: 1 }}>
                        <InputComponent
                            styles={{ marginBottom: 0 }}
                            affix={<SearchNormal1 size={20} color={appColors.gray} />}
                            placeholder="Tìm kiếm"
                            value={searchKey}
                            allowClear
                            onChange={val => setSearchKey(val)}
                        // onEnd={() => { handleSearchLocation }}
                        />
                    </View>
                    <SpaceComponent width={12} />
                    <ButtonComponent text="Trở lại" type="link" onPress={handleClose} />
                    {/* <TouchableOpacity onPress={handleClose}>
                        <AntDesign name="close"
                            size={22}
                            color={appColors.text} />
                    </TouchableOpacity> */}
                </RowComponent>
                {/* <View >
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : location.length > 0 ? (
                        <FlatList
                            data={location}
                            renderItem={({ item }) => (
                                <>
                                    <TextComponent text={item.address.city} />
                                </>
                            )}
                        />
                    ) : (
                        <View>
                            <TextComponent text={searchKey ? 'Không tìm thấy vị trí' : 'Tìm kiếm vị trí'} />
                        </View>
                    )}
                </View> */}
            </View>
        </Modal>
    )
}

export default ModalLocation