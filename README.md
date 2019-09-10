# Sharechat
Node.jsを使った、シェアハウス用のチャットツールです。


## 概要
- このチャットアプリを使うと、シェアハウスのメンバーとチャットをする事が出来ます。
- if you use this chat tool application, you can do communicate with sharehouse's members.


## このアプリを作ろうとした動機
- 自分でアプリを作りたいと思った時に、実際に誰かの役に立つ物を作りたいと考えました。そこで東京で住んでいたシェアハウスではオーナーと各個人が繋がっていていますが、横の繋がりが無かったので、みんなでチャットが出来るアプリを作ろうと考えたのがきっかけです。
- When I wanted to make an app myself, I really wanted to make something useful for someone.Then, in the share house that lived in Tokyo, the owner and each resident are connected, but since there was no horizontal connection, I decided to make an app that allows everyone to chat.


## 使っている技術や言語（FW）
- フロントエンド
  - HTML&CSS
  - Javascript
  - jQuery
- サーバーサイド
  - Node.js<BR>
  →最初にサーバーサイドで学習したのがNode.jsでとても楽しかった事とリアルタイム性の特徴を持っている事を考慮し、今回はNode.jsを選択しました。
- DB
  - MySQL<br>
  →テーブル数3つ（account room message）
  
  
## 機能一覧
- ユーザー新規作成＋ログイン(C)
- チャットルーム新規作成＋ログイン(C)
- メッセージやユーザー情報、チャットルームの情報更新(U)
- チャットルームやメッセージの詳細ページ表示(R)
- メッセージやユーザー情報、チャットルームの情報削除(D)
- セッションによるユーザーの識別（編集や削除の可否を左右）


## 今回の開発で使用した新しい技術や特に意識した点
- Socket.io
  - Websocketを使用できるNode.jsのライブラリ「Socket.io」を使用してリアルタイムかつ双方向通信を行っています。
- issueページ
  - 今回の開発で詰まった所や解決法をissueにまとめています。理由としては次回以降再度似た様なエラーが出た際に、解決またはヒントになる様再現性を持たせる為です。
  
  
## 現時点での完成度(9/10時点）
- 80%
  - チャット機能の部分がまだ未完成。具体的には、GET通信でのリクエストでDBからメッセージを受け取り表示する所までは上手くいっているが、「各ユーザーの投稿をDBへ保存しさらにそれをフロントで表示させる」が出来ていない。ので80%としている。
  - 今考えているアプローチは、「メッセージがSocket通信でやり取りして成功した時にajaxでPOST通信して保存している処理」をpolling??などを使用し常時DBを監視して、値の更新などがあればそれらをトリガーに、フロントに表示させようと考えています。まだ具体的なコードのイメージは出来ていないので公式ドキュメントを参考にしつつ、処理を作っていきます。
  
  
## 知り合いのエンジニアの方に質問した事
- 2つのボタンをサーバー側でどう判別するか(https://github.com/takattty/Sharechat/issues/10)
  - フロントで片方のボタンを押した際に``onClick``の処理を実行し、引数にある値をサーバー側に渡してあげる。そしてその値をサーバー側で識別し、処理を行う。
  - ``/routes/chat.js``の140~154行目
  
- ajaxの呼び出しと書き方と使い方
  - ``ejs``ファイルの``script``で用意していたajaxの呼び出しに上記と同じ様に``onClick``を使用。（引数の処理は自力で）
  - socket通信の処理とajax処理がバラバラで接続が不安定さを解消。
  - ``/views/chat.ejs``の70~89行目
  
  
### 今後の予定
- 画像処理
- フロントデザインの改善
- ミドルウェア「Passport」の使用
- Railsでのリライト
