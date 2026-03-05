# 結論ファースト回答メーカー

求職者が入力した情報を、AIが「結論→理由→結論」の型に整形するWebアプリです。

## 公開までの手順

### STEP 1: GitHubアカウントを作る

1. https://github.com にアクセス
2. 「Sign up」をクリック
3. メールアドレス、パスワードを入力して登録

### STEP 2: このコードをGitHubにアップロード

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. Repository name: `conclusion-maker`（何でもOK）
4. 「Create repository」をクリック
5. 「uploading an existing file」をクリック
6. このフォルダ内のファイルをすべてドラッグ&ドロップ
7. 「Commit changes」をクリック

### STEP 3: Vercelでデプロイ

1. https://vercel.com にアクセス
2. 「Sign Up」→「Continue with GitHub」でログイン
3. 「Add New...」→「Project」をクリック
4. 先ほど作ったリポジトリを選択して「Import」
5. 「Environment Variables」で以下を追加：
   - Name: `GEMINI_API_KEY`
   - Value: あなたのAPIキー
6. 「Deploy」をクリック
7. 数分待つと公開完了！URLが発行されます

## 使い方

1. 発行されたURLを求職者に送る
2. 求職者がURLを開く
3. 「転職理由」「志望動機」「自己PR」を選ぶ
4. 自分の状況を入力
5. 「回答を作成する」をクリック
6. AIが結論ファーストの型で回答を生成

## 注意事項

- 無料枠は1日約20回まで
- 1日3〜5人の利用なら大丈夫
- 上限超えたらエラーが出るだけ（課金されない）
