// 공백·개행을 포함한 Unicode 코드 포인트 수 기준 글자 수(docs/api/04_cover_letter_ai.md).
export function countCharacters(text) {
  return [...(text ?? '')].length
}
