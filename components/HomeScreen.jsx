import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import LottieView from 'lottie-react-native';

function HomeScreen() {
    const [steps, setSteps] = useState(0);
    const [score, setScore] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [lastTimestamp, setLastTimestamp] = useState(0);

    const CALORIES_PER_STEP = 0.05;
    const POINTS_PER_STEP = 1;
    const STEPS_PER_POINT = 10;

    const resetScoreDaily = () => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
            setScore(0);
        }
    };

    useEffect(() => {
        resetScoreDaily();
        const intervalId = setInterval(resetScoreDaily, 60000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        let subscription;
        Accelerometer.isAvailableAsync().then((result) => {
            if (result) {
                subscription = Accelerometer.addListener((accelerometerData) => {
                    const { y } = accelerometerData;
                    const threshold = 0.1;
                    const timestamp = new Date().getTime();

                    if (
                        Math.abs(y - lastY) > threshold &&
                        !isCounting &&
                        timestamp - lastTimestamp > 800
                    ) {
                        setIsCounting(true);
                        setLastY(y);
                        setLastTimestamp(timestamp);
                        setSteps((prevSteps) => {
                            const newSteps = prevSteps + 1;
                            if (newSteps % STEPS_PER_POINT === 0) {
                                setScore((prevScore) => prevScore + POINTS_PER_STEP);
                            }
                            return newSteps;
                        });
                        setTimeout(() => {
                            setIsCounting(false);
                        }, 1200);
                    }
                });
            } else {
                console.log('Accelerometer not available on this device');
            }
        });
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [isCounting, lastY, lastTimestamp]);

    const estimatedCaloriesBurned = steps * CALORIES_PER_STEP;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Step tracker</Text>
            <View style={styles.infoContainer}>
                <View style={styles.stepsContainer}>
                    <Text style={styles.stepsText}>{steps}</Text>
                    <Text style={styles.stepsLabel}>Steps</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>Coins: {score}</Text>
                </View>
                <View style={styles.caloriesContainer}>
                    <Text style={styles.caloriesLabel}>
                        Estimated calories burned:
                    </Text>
                    <Text style={styles.caloriesText}>
                        {estimatedCaloriesBurned.toFixed(2)} calories
                    </Text>
                </View>
            </View>
            <View style={styles.animationContainer}>
                {isCounting ? (
                    <LottieView
                        autoPlay
                        style={styles.animation}
                        source={require('../assets/Animation - 1708965016099.json')}
                    />
                ) : (
                    <LottieView
                        autoPlay
                        style={styles.animation}
                        source={require('../assets/Animation - 1708971854959.json')}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    stepsText: {
        fontSize: 36,
        color: '#3498db',
        fontWeight: 'bold',
        marginRight: 8,
    },
    stepsLabel: {
        fontSize: 24,
        color: '#555',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 24,
        color: '#27ae60',
        fontWeight: 'bold',
    },
    caloriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    caloriesLabel: {
        fontSize: 20,
        color: '#555',
        marginRight: 6,
    },
    caloriesText: {
        fontSize: 18,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 5,
    },
    animation: {
        width: 400,
        height: 400,
        backgroundColor: 'transparent',
    },
});
export default HomeScreen;