import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [result, setResult] = useState(null);

    const passwordInputRef = useRef();
    const genderInputRef = useRef();

    const handleLogin = () => {
        if (username && password) {
            setIsLoggedIn(true);
        } else {
            alert('Please enter both username and password.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setAge('');
        setGender('');
        setResult(null);
    };

    const handleSubmit = async () => {
        if (!age || !gender) {
            alert('Please enter both age and gender.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/retirement_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ age, gender }),
            });

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();

            if (data.asset_allocation && typeof data.asset_allocation === 'object') {
                const allocationList = Object.entries(data.asset_allocation).map(([key, value]) => 
                    `${key.replace(/_/g, ' ')}: ${(value * 100).toFixed(2)}%`
                ).filter(item => !item.toLowerCase().includes('years to retirement')); // Exclude "Years to Retirement"
                setResult({
                    yearsToRetirement: data.years_to_retirement,
                    assetAllocationList: allocationList
                });
            } else {
                setResult({
                    yearsToRetirement: data.years_to_retirement,
                    assetAllocationList: [] 
                });
                console.error('Unexpected data structure for asset_allocation:', data.asset_allocation);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Submission failed: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            {!isLoggedIn && (
                <Image source={require('/Users/ajseals/Desktop/GitHub/RoboAdvisor/MyRoboAdvisorApp/RoboAdvisorIcon.jpeg')} style={styles.logo} />
            )}
            {isLoggedIn ? (
                <View style={styles.loggedInContainer}>
                    <Text style={styles.loggedInText}>Welcome, {username}!</Text>
                    <View style={styles.ageGenderContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter age"
                            onChangeText={text => setAge(text)}
                            value={age}
                            keyboardType="numeric"
                            returnKeyType="next"
                            onSubmitEditing={() => genderInputRef.current.focus()}
                        />
                        <TextInput
                            ref={genderInputRef}
                            style={styles.input}
                            placeholder="Enter gender (M/F)"
                            onChangeText={text => setGender(text)}
                            value={gender}
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
                        />
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    {result && (
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={styles.resultText}>Years to Retirement: {result.yearsToRetirement}</Text>
                                {result.assetAllocationList && result.assetAllocationList.length > 0 && (
                                    <ScrollView style={styles.scrollView}>
                                        {result.assetAllocationList.map((item, index) => (
                                            <Text key={index} style={styles.resultText}>{item}</Text>
                                        ))}
                                    </ScrollView>
                                )}
                            </Card.Content>
                        </Card>
                    )}
                </View>
            ) : (
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username"
                        onChangeText={text => setUsername(text)}
                        value={username}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordInputRef.current.focus()}
                    />
                    <TextInput
                        ref={passwordInputRef}
                        style={styles.input}
                        placeholder="Enter password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}
            {isLoggedIn && (
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    loggedInContainer: {
        alignItems: 'center',
        flex: 1,
        marginTop: 30,
    },
    loggedInText: {
        fontSize: 20,
        marginBottom: 20,
    },
    loginContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    loginButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    ageGenderContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    card: {
        marginTop: 20,
        width: '80%',
        padding: 10,
        borderRadius: 10,
    },
    scrollView: {
        marginTop: 10,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 5,
    },
});


















































