import './globals.css';

export const metadata = {
  title: '結論ファースト回答メーカー',
  description: '転職面接の回答を「結論→理由→結論」の型に整形します',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
