import { useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { useInterval } from "usehooks-ts";
import moment from 'moment';

export default function Timer() {
    const [timerLeft, setTimerLeft] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [isTimerFinished, setIsTimerFinished] = useState(false);

    useInterval(
        () => {
            if (timerLeft == 0) {
                setIsTimerStarted(false);
                setIsTimerFinished(true);
            } else {
                setTimerLeft(timerLeft - 1)
            }
        },
        isTimerStarted ? 1000 : null,
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.inputTitle}>
                    Введите время для таймера
                </Text>
                <TextInput
                    onChangeText={(text) => setTimerLeft(Number(text))}
                    inputMode='numeric'
                    readOnly={isTimerStarted}
                    value={!isTimerStarted ? timerLeft.toString() : '0'}
                    style={[styles.textInput, { backgroundColor: isTimerStarted ? 'gray' : 'white' }]}
                />
                <View style={styles.timerContainer}>
                    {isTimerFinished
                        ? <Text style={styles.readyText}>
                            Готово!
                        </Text>
                        : <Text style={styles.timerText}>
                            {moment.utc(Number(timerLeft) * 1000).format('mm:ss')}
                        </Text>
                    }
                </View>
                <TouchableOpacity
                    disabled={isTimerStarted}
                    onPress={() => {
                        setIsTimerStarted(true);
                        setIsTimerFinished(false);
                    }}
                    style={[styles.button, { backgroundColor: isTimerStarted ? 'gray' : 'black',  }]}
                >
                    <Text style={styles.buttonText}>
                        Старт
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        width: '100%', 
        paddingTop: '5%', 
        alignItems: 'center',
    },
    inputTitle: {
        fontSize: 18, 
        color: 'black', 
        fontWeight: '400', 
        marginBottom: 20,
    },
    textInput: {
        width: '90%', 
        height: 45, 
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 10, 
        paddingHorizontal: 10,
    },
    timerContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    readyText: {
        fontSize: 30, 
        fontWeight: '600', 
        color: 'green',
    },
    timerText: {
        fontSize: 30, 
        fontWeight: '600',
    },
    button: {
        width: '90%', 
        height: 45, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 10, 
        marginBottom: '5%',
    },
    buttonText: {
        fontSize: 20, 
        fontWeight: '500', 
        color: 'white',
    }
})