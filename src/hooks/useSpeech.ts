export function useSpeech(word: string) {
  function speak() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then((res) => res.json())
      .then((data) => {
        const phonetics: { audio: string }[] = data[0]?.phonetics ?? [];
        const audioUrl = phonetics.find((p) => p.audio)?.audio;
        if (audioUrl) {
          new Audio(audioUrl).play().catch(() => {});
        }
      })
      .catch(() => {});
  }

  return { speak };
}
