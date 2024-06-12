require('dotenv').config();
const express = require('express');
const basicAuth = require('basic-auth');
const OpenAI = require('openai');
const app = express();
const port = process.env.PORT || 3000;

// OpenAI API 設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// BASIC認証 設定
const auth = (req, res, next) => {
  const user = basicAuth(req);
  if (!user || user.name != process.env.BASIC_AUTH_USER || user.pass !== process.env.BASIC_AUTH_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Authentication required. ID/パスワードに誤りがあります。');
  }
  next();
};

app.use(auth);

// トップページのルート
app.get('/', (req, res) => {
  res.send('<h1>こんにちは！ようこそ私たちのWebサービスへ！</h1>');
});

// コンテンツページのルート
app.get('/content1', (req, res) => {
  res.send('<h1>コンテンツページ1</h1><p>ここにはコンテンツ1の詳細が表示されます。</p>');
});

app.get('/content2', (req, res) => {
  res.send('<h1>コンテンツページ2</h1><p>ここにはコンテンツ2の詳細が表示されます。</p>');
});

app.get('/content3', (req, res) => {
  res.send('<h1>コンテンツページ3</h1><p>ここにはコンテンツ3の詳細が表示されます。</p>');
});

app.get('/content4', (req, res) => {
  res.send('<h1>コンテンツページ4</h1><p>ここにはコンテンツ4の詳細が表示されます。</p>');
});

app.get('/content5', async (req, res) => {
  try {
      const response = await openai.completions.create({
          model: "text-davinci-002",
          prompt: "こんにちは",
          max_tokens: 5
      });
      res.send(`<h1>コンテンツページ5</h1><p>${response.choices[0].text}</p>`);
  } catch (error) {
      res.status(500).send('OpenAI APIの呼び出しに失敗しました');
  }
});

// サーバの軌道
app.listen(port, () => {
  console.log(`サーバが起動しました。 http://localhost:${port}`);
});