import { useState } from "react";
import { Volume2, VolumeX, Eye, EyeOff, Mic, MicOff, Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function Accessibility() {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [visualEnabled, setVisualEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [textSize, setTextSize] = useState([100]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume[0] / 100;
      utterance.onend = () => setSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const accessibilityFeatures = [
    {
      title: "Voice Navigation",
      description: "Navigate through the app using voice commands",
      icon: Mic,
    },
    {
      title: "Audio Descriptions",
      description: "Hear detailed descriptions of visual content",
      icon: Volume2,
    },
    {
      title: "High Contrast Mode",
      description: "Enhanced visual contrast for better readability",
      icon: Eye,
    },
    {
      title: "Sign Language Videos",
      description: "Emergency instructions in sign language",
      icon: Play,
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Accessibility Features</h1>
        <Button
          onClick={() => speakText("Welcome to accessibility settings. Here you can customize your experience for visual and auditory needs.")}
          variant="outline"
        >
          {speaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          Read Page
        </Button>
      </div>

      {/* Audio Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Audio Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Voice Assistance</label>
              <p className="text-sm text-muted-foreground">Enable text-to-speech for navigation</p>
            </div>
            <Switch
              checked={voiceEnabled}
              onCheckedChange={setVoiceEnabled}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Volume Level</label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
            <span className="text-sm text-muted-foreground">{volume[0]}%</span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => speakText("This is a volume test. You are hearing the current volume level.")}
              size="sm"
              variant="outline"
            >
              Test Volume
            </Button>
            <Button
              onClick={stopSpeaking}
              size="sm"
              variant="outline"
            >
              Stop Speaking
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visual Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visual Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Visual Enhancements</label>
              <p className="text-sm text-muted-foreground">Enable animations and visual cues</p>
            </div>
            <Switch
              checked={visualEnabled}
              onCheckedChange={setVisualEnabled}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Text Size</label>
            <Slider
              value={textSize}
              onValueChange={setTextSize}
              min={75}
              max={150}
              step={5}
              className="w-full"
            />
            <span className="text-sm text-muted-foreground">{textSize[0]}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accessibilityFeatures.map((feature, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <feature.icon className="h-6 w-6" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button
                onClick={() => speakText(feature.description)}
                size="sm"
                variant="outline"
                className="w-full"
              >
                {speaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {speaking ? "Stop" : "Listen"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Visual Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Visual Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 bg-destructive rounded-full mx-auto mb-2 animate-pulse" />
              <h3 className="font-medium">Emergency</h3>
              <p className="text-sm text-muted-foreground">Flashing red alert</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 bg-warning rounded-full mx-auto mb-2 animate-bounce" />
              <h3 className="font-medium">Warning</h3>
              <p className="text-sm text-muted-foreground">Bouncing orange alert</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-16 h-16 bg-success rounded-full mx-auto mb-2" />
              <h3 className="font-medium">Safe</h3>
              <p className="text-sm text-muted-foreground">Steady green indicator</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}