# タスクリスト

spec.md の要件を実装するための最低限のタスク一覧。上から順に実施する。

---

## Phase 1: プロジェクトセットアップ

- [x] Vite + React + TypeScript でプロジェクトを作成する
- [x] Tailwind CSS を導入・設定する（`tailwind.config.ts` / `index.css`）
- [x] `react-router-dom` を追加する
- [x] 不要なボイラープレートを削除して初期状態を整理する

---

## Phase 2: データ・型定義

- [x] `src/types/index.ts` を作成し、`Word` / `WordExample` / `QuizMode` / `QuizQuestion` / `AnswerRecord` / `Progress` 型を定義する
- [x] `src/data/words.json` を作成し、サンプル単語を数件登録する（`example` あり・なし両方含む）

---

## Phase 3: フック実装

- [x] `src/hooks/useWords.ts` を実装する（`words.json` をインポートして `Word[]` を返す）
- [x] `src/hooks/useProgress.ts` を実装する（LocalStorage への `AnswerRecord` 読み書き・`getStats` ・`reset`）
- [x] `src/hooks/useQuiz.ts` を実装する
  - `meaning` モード: 全単語をシャッフルして1問ずつ出題、日本語4択を生成
  - `fillin` モード: `example` が `null` の単語を除外して出題、英語4択を生成
  - 選択肢シャッフル・`correctIndex` の記録
  - `answer()` が呼ばれたら `useProgress` に結果を記録
  - 全問回答後に `finished: true` を返す

---

## Phase 4: 共通コンポーネント実装

- [x] `src/components/ChoiceButton.tsx` を実装する（未回答・正解・不正解の3状態でスタイル変化）
- [x] `src/components/QuizCard.tsx` を実装する（英単語表示 + `ChoiceButton` 4つ + 正誤フィードバック + 「次へ」ボタン）
- [x] `src/components/FillInQuiz.tsx` を実装する（例文の穴埋め表示 + `ChoiceButton` 4つ + 正誤フィードバック + 「次へ」ボタン）
- [x] `src/components/WordList.tsx` を実装する（全単語のテーブル表示 + キーワード検索 + 例文有無フィルター）
- [x] `src/components/StatsView.tsx` を実装する（モードごとの正答率 + 単語ごとの正解・不正解回数）

---

## Phase 5: ページ実装

- [x] `src/pages/Home.tsx` を実装する（各モードへのナビゲーションカード）
- [x] `src/pages/QuizPage.tsx` を実装する（`useQuiz("meaning")` + `QuizCard` + 終了画面）
- [x] `src/pages/FillInPage.tsx` を実装する（`useQuiz("fillin")` + `FillInQuiz` + 終了画面）
- [x] `src/pages/WordListPage.tsx` を実装する（`WordList` をラップ）
- [x] `src/pages/StatsPage.tsx` を実装する（`StatsView` + 進捗リセットボタン）

---

## Phase 6: ルーティング

- [x] `src/App.tsx` に `react-router-dom` のルーティングを設定する（`/` / `/quiz` / `/fillin` / `/words` / `/stats`）
- [x] `src/main.tsx` で `<BrowserRouter>` または `<HashRouter>` でラップする

---

## Phase 7: レスポンシブ・仕上げ

- [x] スマートフォン（375px〜）・PC（1024px〜）で各ページのレイアウトを確認・調整する
- [x] ナビゲーション（ヘッダーまたはボトムバー）を追加してページ間の導線を整える

---

## Phase 8: デプロイ

- [ ] GitHub リポジトリにプッシュする
- [ ] Vercel に接続してデプロイする
- [ ] 本番URLで動作確認する
