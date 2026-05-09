export async function translateArToEn(text: string): Promise<string> {
  if (!text || typeof text !== 'string') return text;
  
  // Basic check if it contains Arabic characters
  const arabicPattern = /[\u0600-\u06FF]/;
  if (!arabicPattern.test(text)) return text;

  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    if (!res.ok) return text;
    const data = await res.json();
    return data[0].map((item: any) => item[0]).join('');
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

export async function translateObject(obj: any): Promise<any> {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return await translateArToEn(obj);
  }
  
  if (Array.isArray(obj)) {
    return await Promise.all(obj.map(item => translateObject(item)));
  }
  
  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Don't translate URLs, IDs, slugs or system fields
        if (key === '_id' || key === 'id' || key === 'slug' || key.toLowerCase().includes('url') || key.toLowerCase().includes('image') || key.toLowerCase().includes('icon')) {
          newObj[key] = obj[key];
        } else {
          newObj[key] = await translateObject(obj[key]);
        }
      }
    }
    return newObj;
  }
  
  return obj;
}
