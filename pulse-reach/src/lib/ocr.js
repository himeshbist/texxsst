let tesseractMod = null;

export async function extractText(file, lang = "eng", onProgress) {
    if (!tesseractMod) {
        tesseractMod = await import("tesseract.js");
    }
    const Tesseract = tesseractMod;
    const { data } = await Tesseract.recognize(file, lang, {
        logger: (m) => onProgress?.(m),
    });
    return data; // { text, words, ... }
}