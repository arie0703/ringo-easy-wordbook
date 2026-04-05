# 英単語学習アプリ "ringo" 設計ドキュメント

## 概要

英語 - 日本語のペアで単語を管理し、4択クイズ・穴埋めクイズの2モードで英単語学習ができるWebアプリケーション。

- **対象ユーザー**: 開発者本人のみ（将来的に複数ユーザーへ拡張予定）
- **対応デバイス**: PC・スマートフォン（レスポンシブ対応）
- **コスト**: 無料（Vercel無料枠 + JSONファイルによるデータ管理）

---

## 技術スタック

| 分類 | 採用技術 | 理由 |
|---|---|---|
| フレームワーク | React + Vite | 軽量・高速・ブラウザのみで動作（Tauriは不要） |
| 言語 | TypeScript | 型安全・エディタ補完によるデータ構造の保護 |
| スタイリング | Tailwind CSS | レスポンシブ対応が容易 |
| データ管理 | JSONファイル（`src/data/words.json`） | コストゼロ・エディタで直接編集・Gitでバージョン管理 |
| 進捗保存 | LocalStorage | バックエンド不要でブラウザに永続化 |
| ホスティング | Vercel | GitHub連携で自動デプロイ・無料枠で十分 |

### 将来拡張時の方針

データ取得を `useWords()` フックに抽象化しておくことで、複数ユーザー対応時は以下の差し替えのみで対応可能。

| フェーズ | データ層 | 認証 |
|---|---|---|
| 現在（個人） | JSONファイル（import） | 不要 |
| 将来（複数ユーザー） | Supabase または Firebase | Google SSO 等 |

---

## 機能要件

### 1. 単語データ管理

- 英語・日本語訳・例文をJSONファイルで管理する
- 例文は省略可能（4択クイズのみ対応の単語も登録できる）
- データの追加・編集はエディタ上で `src/data/words.json` を直接編集する

### 2. 4択クイズモード

- 英単語を表示し、日本語の意味を4択から選ぶ
- 正解以外の3択は、登録済み単語からランダムに選出する
- 正解・不正解をその場でフィードバックする
- 正答率・回答履歴をLocalStorageに保存する
- 英単語カード（word-card）をタップすると発音が再生される
  - [Free Dictionary API](https://api.dictionaryapi.dev/api/v2/entries/en/{word}) から音声ファイルURLを取得し再生する
  - APIキー不要・無料。音声が存在しない単語は静かにスキップする
- 回答後の次問への進み方はデバイスで異なる
  - スマートフォン（〜767px）: 画面のどこをタップしても次の問題へ進む。「タップして次へ」のヒントを表示する
  - PC（768px〜）: 「次へ」ボタンをクリックして次の問題へ進む
  - 誤タップ防止のため、回答直後400ms間はタップ操作を無効にする

### 3. 穴埋めクイズモード（optional）

- 例文の空白部分（`___`）に入る単語を4択から選ぶ
- 例文データが登録されている単語のみ出題対象とする
- 例: `His ___ is vital to the team.`
  - 選択肢: 1. versatility　2. adroit　3. stigma　4. hamper
- 正解・不正解をその場でフィードバックする
- 回答後に例文の日本語訳（`translation`）を表示する
- 回答後の次問への進み方は4択クイズモードと同様（デバイスによって異なる）

### 4. 単語一覧

- 登録済みの全単語を一覧表示する
- 英語・日本語・例文有無でフィルタリング・検索できる

### 5. 学習統計

- モードごとの正答率を表示する
- 各単語ごとの正解回数・不正解回数を確認できる
- LocalStorageに保存し、ブラウザをまたいでも保持される

---

## データ構造

### `src/data/words.json`

```json
{
  "words": [
    {
      "id": "w001",
      "english": "versatility",
      "japanese": "汎用性・多才さ",
      "tags": ["eiken-1"],
      "example": {
        "before": "His",
        "after": "is vital to the team.",
        "translation": "彼の多才さはチームにとって不可欠だ。"
      }
    },
    {
      "id": "w002",
      "english": "adroit",
      "japanese": "巧みな・器用な",
      "tags": ["eiken-1"],
      "example": {
        "before": "She was",
        "after": "at handling difficult negotiations.",
        "translation": "彼女は難しい交渉をうまく処理することに長けていた。"
      }
    },
    {
      "id": "w003",
      "english": "stigma",
      "japanese": "汚名・烙印",
      "tags": ["eiken-1"],
      "example": null
    }
  ]
}
```

### 型定義（`src/types/index.ts`）

```ts
export type WordExample = {
  before: string;
  after: string;
  translation: string;  // 例文の日本語訳
};

export type Word = {
  id: string;
  english: string;
  japanese: string;
  tags: string[];           // カテゴリ・レベルタグ（例: "eiken-1"）
  example: WordExample | null;
};

export type QuizMode = "meaning" | "fillin";

export type QuizQuestion = {
  word: Word;
  choices: string[];      // 日本語4択（meaningモード）または英語4択（fillinモード）
  correctIndex: number;
};

export type AnswerRecord = {
  wordId: string;
  mode: QuizMode;
  correct: boolean;
  answeredAt: number;     // Unix timestamp
};

export type Progress = {
  records: AnswerRecord[];
};
```

---

## ディレクトリ構成

```
vocab-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── data/
│   │   └── words.json          # 単語データ（エディタで直接編集）
│   ├── types/
│   │   └── index.ts            # 型定義
│   ├── hooks/
│   │   ├── useWords.ts         # 単語データ取得（将来的にAPI差し替え対象）
│   │   ├── useQuiz.ts          # クイズロジック（選択肢生成・採点）
│   │   └── useProgress.ts      # LocalStorageへの進捗保存・取得
│   ├── components/
│   │   ├── QuizCard.tsx        # 4択クイズのカードUI
│   │   ├── FillInQuiz.tsx      # 穴埋めクイズのUI
│   │   ├── ChoiceButton.tsx    # 選択肢ボタン（正解・不正解の色変化含む）
│   │   ├── WordList.tsx        # 単語一覧テーブル
│   │   └── StatsView.tsx       # 学習統計の表示
│   ├── pages/
│   │   ├── Home.tsx            # モード選択トップページ
│   │   ├── QuizPage.tsx        # 4択クイズページ
│   │   ├── FillInPage.tsx      # 穴埋めクイズページ
│   │   ├── WordListPage.tsx    # 単語一覧ページ
│   │   └── StatsPage.tsx       # 学習統計ページ
│   ├── App.tsx                 # ルーティング定義
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 各フックの責務

### `useWords.ts`

```ts
// words.jsonをimportして返す（将来的にはfetch/Supabase等に差し替え）
export function useWords(): Word[]
```

### `useQuiz.ts`

```ts
// 指定モードのクイズ問題を生成する
// - meaningモード: 英語を見て日本語を選ぶ
// - fillinモード: 例文の空欄に入る英語を選ぶ（example必須）
export function useQuiz(mode: QuizMode): {
  question: QuizQuestion | null;
  next: () => void;
  answer: (index: number) => { correct: boolean };
  finished: boolean;
}
```

### `useProgress.ts`

```ts
// LocalStorageから進捗を読み書きする
export function useProgress(): {
  records: AnswerRecord[];
  addRecord: (record: AnswerRecord) => void;
  getStats: (wordId?: string) => { correct: number; total: number };
  reset: () => void;
}
```

---

## ルーティング

`react-router-dom` を使用。

| パス | ページ | 説明 |
|---|---|---|
| `/` | Home | モード選択・ナビゲーション |
| `/quiz` | QuizPage | 4択クイズ |
| `/fillin` | FillInPage | 穴埋めクイズ |
| `/words` | WordListPage | 単語一覧 |
| `/stats` | StatsPage | 学習統計 |

---

## クイズロジック仕様

### 選択肢生成（4択）

1. 出題する単語（正解）を1つ選ぶ
2. 残りの単語からランダムに3つ選び、不正解選択肢とする
3. 4択の並び順をシャッフルして `correctIndex` を記録する
4. `fillinモード` では `example` が `null` の単語を除外してから出題対象を絞る

### 出題順

- 全単語をシャッフルし、先頭10問を出題する（1セット = 10問）
- `fillinモード` では `example` が `null` の単語を除外した上でシャッフルし、先頭10問を選ぶ
- 全問回答後に「終了」画面を表示し、再挑戦またはホームへ戻る選択肢を出す

---

## 開発の進め方（推奨順）

1. `words.json` と `src/types/index.ts` を作成する
2. `useWords.ts` → `useProgress.ts` → `useQuiz.ts` の順にフックを実装する
3. `ChoiceButton.tsx` → `QuizCard.tsx` の順にコンポーネントを実装する
4. `QuizPage.tsx` を実装して4択クイズを動作させる
5. `FillInQuiz.tsx` → `FillInPage.tsx` を実装して穴埋めクイズを追加する
6. `WordList.tsx` / `StatsView.tsx` を実装する
7. `Home.tsx` でナビゲーションをまとめてレスポンシブ調整する
8. Vercelにデプロイする

---

## 非機能要件

- **レスポンシブ**: スマートフォン（375px〜）とPC（1024px〜）の両方で快適に操作できること
- **オフライン**: データはJSONファイルとLocalStorageのみのため、ネットワーク不要で動作すること
- **パフォーマンス**: 静的サイトのため初期ロードは1秒以内を目標とする

---

## 将来拡張メモ

- 単語データをSupabase（PostgreSQL）に移行することで複数ユーザー対応が可能
- `useWords.ts` のみ書き換えればよく、UIコンポーネントへの影響はない
- 認証が必要になった場合はSupabase AuthまたはFirebase Authを追加する
- 音声読み上げ（Web Speech API）は無料で追加可能な機能として検討余地あり
