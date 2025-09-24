'use server'

// Mock implementation of text-to-speech functionality
export async function textToSpeech({ text }: { text: string }): Promise<{ audioDataUri: string }> {
  // Return a mock audio data URI for development
  // In a real implementation, this would call a TTS service
  return {
    audioDataUri: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAc='
  }
}