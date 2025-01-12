# 技術設計書

## 1. システムアーキテクチャ
### 1.1 全体構成
```
[クライアント] → [CDN] → [フロントエンドサーバー] → [APIサーバー] → [データベース]
```

### 1.2 技術スタック
#### フロントエンド
- フレームワーク: React.js
- 状態管理: Redux
- UIライブラリ: Material-UI
- タイピング処理: カスタムフック
- ビルドツール: Vite

#### バックエンド
- 言語: Node.js
- フレームワーク: Express.js
- データベース: PostgreSQL
- ORM: Prisma
- API形式: RESTful

#### インフラストラクチャ
- クラウド: AWS
- CDN: CloudFront
- コンテナ化: Docker
- CI/CD: GitHub Actions

## 2. コンポーネント設計
### 2.1 フロントエンド構成
```
src/
├── components/
│   ├── common/         # 共通コンポーネント
│   ├── game/          # ゲーム関連コンポーネント
│   ├── typing/        # タイピング関連コンポーネント
│   └── score/         # スコア関連コンポーネント
├── hooks/             # カスタムフック
├── store/            # Redux関連
├── utils/            # ユーティリティ関数
└── pages/            # ページコンポーネント
```

### 2.2 主要コンポーネント
#### タイピングエンジン
- キー入力検知
- 文字列比較処理
- 進捗管理
- エラー処理

#### ゲームモード管理
- モード切り替え
- タイマー制御
- スコア計算
- 結果表示

## 3. データモデル
### 3.1 テーブル設計
```sql
-- タイピング問題
CREATE TABLE typing_problems (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    difficulty ENUM('beginner', 'intermediate', 'advanced'),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- スコア履歴
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    problem_id INTEGER REFERENCES typing_problems(id),
    wpm INTEGER NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    mode VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 4. API設計
### 4.1 エンドポイント
#### 問題取得
```
GET /api/problems
GET /api/problems/:id
GET /api/problems/random?difficulty=:difficulty
```

#### スコア管理
```
POST /api/scores
GET /api/scores/ranking
GET /api/scores/history
```

## 5. セキュリティ設計
### 5.1 対策一覧
- HTTPS通信の強制
- CSP（Content Security Policy）の設定
- レートリミットの実装
- 入力値のサニタイズ処理

## 6. パフォーマンス最適化
### 6.1 フロントエンド
- コード分割（Code Splitting）
- レンダリング最適化
- キャッシュ戦略
- 画像最適化

### 6.2 バックエンド
- データベースインデックス
- クエリ最適化
- キャッシュ層の導入
- 負荷分散設定 