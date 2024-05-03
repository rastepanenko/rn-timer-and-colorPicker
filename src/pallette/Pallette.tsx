import { FlatList, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { palletteAtom } from "../state/RecoilState";
import ColorItem from "./ColorItem";

export default function Pallette() {
    const [pallette, setPallette] = useRecoilState(palletteAtom);

    const addNewColor = () => {
        const randomId = (Math.random() * 100000000000).toFixed(0);
        setPallette(prev => [...prev, { id: randomId, color: 'orange' }])
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: '5%', alignItems: 'center', }}>
            <FlatList
                style={styles.flatList}
                numColumns={3}
                columnWrapperStyle={styles.row}
                horizontal={false}
                data={pallette}
                renderItem={item => <ColorItem colorItem={item.item} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '500', color: 'gray', }}>There are no items added to your cart yet</Text>}
            />
            <TouchableOpacity
                onPress={() => {
                    addNewColor();
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Добавить цвет
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '5%',
        backgroundColor: 'black',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    flatList: {
        height: '100%',
        width: '90%',
    },
    row: {
        flex: 1, 
        justifyContent: 'space-around'
    }
})