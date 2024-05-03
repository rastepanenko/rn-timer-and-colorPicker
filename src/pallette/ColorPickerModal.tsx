import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ColorPicker from "react-native-wheel-color-picker";
import { IColorItem } from "../types/Types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { palletteAtom } from "../state/RecoilState";

interface IDetailsModalProps {
    readonly visible: boolean;
    readonly setVisible: (visible: boolean) => void;
    colorItem: IColorItem;
}

export default function ColorPickerModal(props: IDetailsModalProps) {
    const { visible, setVisible, colorItem } = props;
    const [newColor, setNewColor] = useState('');
    const [pallette, setPallette] = useRecoilState(palletteAtom);

    const changeColor = () => {
        const updatedPallete = pallette.map((item) => {
            if (item.id === colorItem.id) {
                return { ...item, color: newColor };
            } else {
                return item;
            }
        });

        setPallette(updatedPallete);
        setVisible(false);
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.iconOpacity} onPress={() => setVisible(false)}>
                        <FontAwesome name="close" color={'gray'} size={25} />
                    </TouchableOpacity>
                    <View style={{ width: '85%', height: '75%', }}>
                    <ColorPicker
                        color={colorItem.color}
                        onColorChangeComplete={(color) => setNewColor(color)}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={true}
                        row={false}
                        useNativeDriver={true}
                        useNativeLayout={true}
                    />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={changeColor}
                    >
                        <Text style={styles.buttonText}>
                            Сохранить
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '92%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
    },
    iconOpacity: {
        position: 'absolute',
        zIndex: 100,
        right: 1,
        height: '97%',
        marginTop: 10,
        marginRight: 10
    },
    button: {
        backgroundColor: 'black',
        width: '85%',
        height: 50,
        position: 'absolute',
        bottom: 1,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
    }
})