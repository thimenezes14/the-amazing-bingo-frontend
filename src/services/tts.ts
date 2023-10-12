
export default function playAudio(numberAsText: string) {
  const synth: SpeechSynthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(numberAsText);
  utterance.voice = synth.getVoices()[0];
  utterance.pitch = 0.25;
  utterance.rate = 0.75;
  utterance.volume = 1;
  synth.speak(utterance);
}