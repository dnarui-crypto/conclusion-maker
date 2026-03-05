'use client';

import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('転職理由');
  const [situation, setSituation] = useState('');
  const [problem, setProblem] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: '転職理由', emoji: '🚪', label: '転職理由' },
    { id: '志望動機', emoji: '🏢', label: '志望動機' },
    { id: '自己PR', emoji: '💪', label: '自己PR' },
  ];

  const placeholders = {
    '転職理由': {
      situation: '例：不動産の賃貸営業を3年やっています',
      problem: '例：年功序列で成果を上げても給料が上がらない',
      goal: '例：頑張った分だけ稼ぎたい',
    },
    '志望動機': {
      situation: '例：今は小売業で販売員をしています',
      problem: '例：お客様との関わりが浅い',
      goal: '例：人生の大きな買い物に関わりたい',
    },
    '自己PR': {
      situation: '例：飲食店で3年間バイトリーダーでした',
      problem: '例：（空欄でOK）',
      goal: '例：チームをまとめる力を活かしたい',
    },
  };

  const handleSubmit = async () => {
    if (!situation && !problem && !goal) {
      setError('少なくとも1つは入力してください');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, situation, problem, goal }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成に失敗しました');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSituation('');
    setProblem('');
    setGoal('');
    setError(null);
  };

  const currentPlaceholders = placeholders[category];

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>
          <span className="highlight">結論ファースト</span>回答メーカー
        </h1>
        <p>あなたの状況を入力 → AIが面接回答を作成</p>
      </div>

      {/* Category Tabs */}
      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn ${category === cat.id ? 'active' : ''}`}
            onClick={() => {
              setCategory(cat.id);
              setResult(null);
              setError(null);
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <div className="error">{error}</div>}

      {/* Form or Result */}
      {!result ? (
        <div className="form-card">
          <div className="form-group">
            <label className="form-label label-situation">
              📍 今の状況（現職・経験）
            </label>
            <textarea
              className="form-input"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder={currentPlaceholders.situation}
            />
          </div>

          <div className="form-group">
            <label className="form-label label-problem">
              😤 不満・課題
            </label>
            <textarea
              className="form-input"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder={currentPlaceholders.problem}
            />
          </div>

          <div className="form-group">
            <label className="form-label label-goal">
              ✨ 叶えたいこと
            </label>
            <textarea
              className="form-input"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={currentPlaceholders.goal}
            />
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                生成中...
              </>
            ) : (
              <>🎯 回答を作成する</>
            )}
          </button>
        </div>
      ) : (
        <div className="result">
          <div className="result-header">
            <span className="result-badge">✨ あなたの回答</span>
          </div>

          <div className="sandwich">
            <div className="sandwich-step conclusion-top">
              <span className="step-number">1</span>
              <div className="step-label">結論（まず答える）</div>
              <div className="step-content">「{result.conclusion}」</div>
            </div>

            <div className="sandwich-step reason">
              <span className="step-number">2</span>
              <div className="step-label">理由・エピソード</div>
              <div className="step-content">「{result.reason}」</div>
            </div>

            <div className="sandwich-step conclusion-bottom">
              <span className="step-number">3</span>
              <div className="step-label">結論（だから〜）</div>
              <div className="step-content">「{result.finalConclusion}」</div>
            </div>
          </div>

          <div className="note">
            <p>
              💡 これは<strong>たたき台</strong>です。
              面談で一緒にブラッシュアップしましょう！
            </p>
          </div>

          <button className="reset-btn" onClick={handleReset}>
            ← もう一度入力する
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="footer">宅建Jobエージェント</div>
    </div>
  );
}
