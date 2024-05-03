import { View, Text, StyleSheet } from "react-native";
import { IColorItem } from "../types/Types";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useState } from "react";
import ColorPickerModal from "./ColorPickerModal";
import { useRecoilState } from "recoil";
import { palletteAtom } from "../state/RecoilState";

interface IColorItemProps {
    readonly colorItem: IColorItem;
}

export default function ColorItem({ colorItem }: IColorItemProps) {
    const [isPickerOpened, setIsPickerOpened] = useState(false);
    const [pallette, setPallette] = useRecoilState(palletteAtom);

    const deleteColor = () => {
        setPallette(pallette.filter((item) => item.id != colorItem.id));
    };

    return (
        <View style={styles.container}>
            <ColorPickerModal visible={isPickerOpened} setVisible={setIsPickerOpened} colorItem={colorItem} />
            <Menu>
                <MenuTrigger>
                    <View style={[styles.triggerStyle, { backgroundColor: colorItem.color, }]} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menu}>
                    <MenuOption onSelect={() => setIsPickerOpened(true)} text='Изменить цвет' />
                    <MenuOption onSelect={deleteColor}>
                        <Text style={{ color: 'red' }}>Удалить</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '33%',
        backgroundColor: 'white',
        marginVertical: 7,
        alignItems: 'center',
    },
    triggerStyle: {
        width: 70,
        height: 70,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 8,
    },
    menu: {
        borderRadius: 10,
        width: 150,
    }
})