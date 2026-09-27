import { Platform } from 'react-native';

// Moderação de fotos do MVP (simulada, 100% local — nenhum dado sai do aparelho).
// 1) Bloqueia arquivos cujo nome sugere conteúdo impróprio.
// 2) Na web, estima a proporção de pixels em tom de pele no canvas; fotos com
//    proporção alta demais são rejeitadas como possível nudez.
// URLs remotas (Unsplash) não abrem no canvas por CORS e passam direto.

const BLOCKED_KEYWORDS = /(nude|nudes|nudez|nsfw|porn|xvideos|onlyfans|sexo|explicit)/i;
const SKIN_RATIO_LIMIT = 0.65;

export async function moderatePhoto(uri, fileName = '') {
  if (BLOCKED_KEYWORDS.test(fileName) || BLOCKED_KEYWORDS.test(uri)) {
    return { ok: false, reason: 'Foto bloqueada: o nome do arquivo sugere conteúdo impróprio.' };
  }
  if (Platform.OS !== 'web' || !uri.startsWith('data:')) return { ok: true };
  try {
    const ratio = await skinRatio(uri);
    if (ratio > SKIN_RATIO_LIMIT) {
      return {
        ok: false,
        reason:
          'Foto bloqueada pela moderação: a imagem parece conter nudez. ' +
          'Escolha uma foto de rosto ou do dia a dia.',
      };
    }
  } catch {
    // Canvas indisponível: aceita a foto.
  }
  return { ok: true };
}

function skinRatio(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const g = canvas.getContext('2d');
        g.drawImage(img, 0, 0, size, size);
        const { data } = g.getImageData(0, 0, size, size);
        let skin = 0;
        const total = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          if (isSkinPixel(data[i], data[i + 1], data[i + 2])) skin += 1;
        }
        resolve(skin / total);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = reject;
    img.src = src;
  });
}

// Heurística clássica de tom de pele (regra de Kovac simplificada, RGB).
function isSkinPixel(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return (
    r > 95 &&
    g > 40 &&
    b > 20 &&
    r >= g &&
    r >= b &&
    max - min > 15 &&
    Math.abs(r - g) > 15
  );
}
