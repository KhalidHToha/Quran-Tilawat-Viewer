async function getVerse() {
  const surah = document.getElementById('surah').value;
  const ayah = document.getElementById('ayah').value;

  if (!surah || !ayah) {
    alert("Please enter both Surah and Ayah number.");
    return;
  }

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.asad,bn.bengali`);
    const data = await res.json();

    const arabic = data.data.find(d => d.edition.identifier === 'quran-uthmani');
    const english = data.data.find(d => d.edition.identifier === 'en.asad');
    const bangla = data.data.find(d => d.edition.identifier === 'bn.bengali');

    document.getElementById('arabic').textContent = arabic.text;
    document.getElementById('translation-en').textContent = "English: " + english.text;
    document.getElementById('translation-bn').textContent = "বাংলা: " + bangla.text;

    const audioRes = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.alafasy`);
    const audioData = await audioRes.json();
    document.getElementById('audio').src = audioData.data.audio;
    audio.autoplay = true;
    audio.play().catch(error => {
    console.warn("Autoplay blocked by browser:", error);
     });


    document.getElementById('output').classList.remove('hidden');
  } catch (err) {
    alert("❌ Verse not found or API error.");
  }
}
