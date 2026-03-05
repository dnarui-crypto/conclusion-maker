import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { category, situation, problem, goal } = await request.json();

    // APIキーの確認
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: 'APIキーが設定されていません' },
        { status: 500 }
      );
    }

    // Gemini APIの初期化
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // プロンプトの作成
    const prompt = `あなたは転職エージェントのキャリアアドバイザーです。
求職者から以下の情報をヒアリングしました。面接で使える「結論ファースト」の回答を作成してください。

【質問の種類】${category}

【現在の状況】
${situation || '（未入力）'}

【不満・課題】
${problem || '（未入力）'}

【叶えたいこと】
${goal || '（未入力）'}

以下のJSON形式のみで回答してください。説明や前置きは不要です：
{"conclusion":"最初に言う結論（1文で簡潔に）","reason":"理由の説明（具体的なエピソードを含めて2-3文）","finalConclusion":"だから〜したい（1文）"}

注意：
- ネガティブな表現はポジティブに言い換える
- 自然な日本語で作成する
- 足りない情報は補完して提案する`;

    // Gemini APIの呼び出し
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSONを抽出してパース
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json(
        { error: '回答の生成に失敗しました。もう一度お試しください。' },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return Response.json(parsed);

  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'エラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    );
  }
}
