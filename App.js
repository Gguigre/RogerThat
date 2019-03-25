import React from "react";
import { StyleSheet, Text, View, Button, AppRegistry } from "react-native";
import Voice from "react-native-voice";
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
  };

  _startRecognition = async e => {
    this.setState({
      recognized: "",
      started: "",
      results: []
    });
    try {
      await Voice.start("fr-FR");
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
