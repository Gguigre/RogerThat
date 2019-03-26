import React from "react";
import { StyleSheet, Text, View, Button, AppRegistry } from "react-native";
import Voice from "react-native-voice";
import Speech from "react-native-speech";
export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: "",
      started: "",
      results: []
    };
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechEnd = this.onSpeechEnd;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  _startHandler() {
    const now = new Date();
    Speech.speak({
      text: `Il est ${now.getHours()} heures et ${now.getMinutes()} minutes`,
      voice: "fr-FR"
    })
      .then(started => {
        console.log("Speech started");
      })
      .catch(error => {
        console.log("You've already started a speech instance.");
      });
  }

  _pauseHandler() {
    Speech.pause();
  }

  _resumeHandler() {
    Speech.resume();
  }

  _stopHandler() {
    Speech.stop();
  }

  onSpeechStart = e => {
    this.setState({
      started: "√"
    });
  };

  onSpeechEnd = e => {
    console.warn("OnSpeechEnd");
  };

  onSpeechRecognized = e => {
    this.setState({
      recognized: "√"
    });
  };

  onSpeechResults = e => {
    this.setState({
      results: e.value
    });
    console.warn(e.value);
    if (e.value[0].includes("heure")) {
      this._startHandler();
    }
  };

  _startRecognition = async e => {
    this.setState({
      recognized: "",
      started: "",
      results: []
    });
    try {
      await Voice.start("es-ES");
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognition = async e => {
    this.setState({
      recognized: "",
      started: "",
      results: []
    });
    await Voice.stop();
  };

  render() {
    return (
      <View>
        <Text style={styles.transcript}>Transcript</Text>
        {this.state.results.map((result, index) => (
          <Text style={styles.transcript}> {result}</Text>
        ))}
        <Text>{JSON.stringify(this.state, null, 2)}</Text>
        <Button
          style={styles.transcript}
          onPress={
            this.state.started ? this._stopRecognition : this._startRecognition
          }
          title={this.state.started ? "Stop" : "Start"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
    top: "200%"
  }
});
