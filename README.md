# ringo

英語 - 日本語の単語ペアで学習できるWebアプリ。4択クイズ・穴埋めクイズの2モードに対応。

## 技術スタック

- React + Vite + TypeScript
- Tailwind CSS
- react-router-dom
- データ: `src/data/words.json`（JSONファイル直接編集）
- 進捗保存: LocalStorage

## セットアップ

```bash
npm install
```

## 起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開く。

## ビルド

```bash
npm run build
```

## 単語の追加・編集

`src/data/words.json` を直接編集する。

```json
{
  "words": [
    {
      "id": "w001",
      "english": "versatility",
      "japanese": "汎用性・多才さ",
      "example": {
        "before": "His",
        "after": "is vital to the team."
      }
    },
    {
      "id": "w002",
      "english": "stigma",
      "japanese": "汚名・烙印",
      "example": null
    }
  ]
}
```

- `example` は省略可能（`null` にすると穴埋めクイズの出題対象から除外される）
- `id` は重複しないように設定する
