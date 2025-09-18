'use client';

import React, { useState } from 'react';
import Upload from '@/components/Upload';
import StyleSelector from '@/components/StyleSelector';
import PhraseSelector from '@/components/PhraseSelector';
import { uploadImageAndGenerate } from '@/lib/fal';

const styles = ['Vintage Travel Poster', 'Modern Minimal', 'Riviera Chic', 'Festival Glow'];
const palettes = ['Pastels', 'Neon Brights', 'Earth Tones', 'Monochrome'];
const eras = ['1960s', '1980s', '1990s', 'Contemporary'];
const moods = ['Dreamy', 'Playful', 'Romantic', 'Energetic'];

export default function AvatarPage() {
  const [image, setImage] = useState<string | null>(null);
  const [style, setStyle] = useState<string>('');
  const [palette, setPalette] = useState<string>('');
  const [era, setEra] = useState<string>('');
  const [mood, setMood] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buildPrompt = () => {
    return `
An award winning portrait, inspired by ${style.toLowerCase()}, high fashion.
${palette} color palette, ${mood.toLowerCase()}, subtle halftones, sunlit summer atmosphere.
Graphic but elegant, balanced, timeless summer aesthetic, ${era}, cinematic, 4k, crisp, depth.
    `.trim();
  };

  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleGenerate = async () => {
    if (!image || !style || !palette || !era || !mood) {
      setError('Please upload a photo and fill out all fields.');
      return;
    }

    setGenerating(true);
    setError(null);
    const prompt = buildPrompt();

    try {
      const file = dataURLtoFile(image, 'avatar.jpg');
      const resultUrl = await uploadImageAndGenerate(prompt, file);
      setOutput(resultUrl);
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong. Try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Your Endless Sommar Avatar</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Upload */}
        <Upload onUpload={(base64) => setImage(base64)} />

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Summer Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select...</option>
              {styles.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="font-medium">Color Palette</label>
            <select value={palette} onChange={(e) => setPalette(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select...</option>
              {palettes.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="font-medium">Era Vibe</label>
            <select value={era} onChange={(e) => setEra(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select...</option>
              {eras.map((e) => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="font-medium">Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full border p-2 rounded">
              <option value="">Select...</option>
              {moods.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-pink-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Generate Avatar'}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Output Image */}
        {output && (
          <div className="mt-6">
            <h2 className="text-center font-semibold mb-2">Your Endless Sommar Avatar:</h2>
            <img src={output} alt="Generated Avatar" className="rounded-lg mx-auto max-w-full border" />
          </div>
        )}
      </div>
    </div>
  );
}
