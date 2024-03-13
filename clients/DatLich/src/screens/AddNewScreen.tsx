import React, { useState } from "react";
import { View, Text } from 'react-native';
import { ButtonComponent, ChoiceLocation, ContainerComponent, InputComponent, SectionComponent, TextComponent } from "../components";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";

const initValues = {
    title: '',
    description: '',
    location: {
        title: '',
        address: '',
    },
    //HNssYgE8tPMwVt1x00Ga
    imageUrl: '',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
};
const AddNewScreen = () => {
    const auth = useSelector(authSelector);

    const [eventData, setEventData] = useState<any>({
        ...initValues,
        authorId: auth.id,
    });


    const handleChangValue = (key: string, value: string) => {
        const items = { ...eventData };
        items[`${key}`] = value;
    };

    const handleAddEvent = async () => {
        console.log(eventData);
    };

    return (
        <ContainerComponent isScroll>
            <SectionComponent>
                <TextComponent text="Thêm mới" title />
            </SectionComponent>
            <SectionComponent>
                <InputComponent
                    placeholder="Title"
                    value={eventData.title}
                    allowClear
                    onChange={val => handleChangValue('title', val)} />
                <InputComponent
                    placeholder="Description"
                    multiline
                    numberOfLine={3}
                    allowClear
                    value={eventData.description}
                    onChange={val => handleChangValue('description', val)}
                />

                <ChoiceLocation />
            </SectionComponent>
            <SectionComponent>
                <ButtonComponent
                    text='Thêm mới'
                    onPress={handleAddEvent}
                    type="primary" />
            </SectionComponent>
        </ContainerComponent>
    );
};

export default AddNewScreen