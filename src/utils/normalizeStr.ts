// 数字を半角に、アルファベットを半角大文字に変換する
function normalizeStr(str: string): string {
  return str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s =>
      String.fromCharCode(s.charCodeAt(0) - 65248)
    )
    .replace(/[a-z]/g, s => String.fromCharCode(s.charCodeAt(0) - 32));
}

export default normalizeStr;
