# 単一ファイルEpisoPass
  
## 考え方

- [EpisoPass.com](http://EpisoPass.com)にデータをセーブするのは良くないので、完全にひとつのHTML(+JS)でEpisoPass機能を実現するようにした  
  - 安心感とか使い勝手とかが若干向上したかも  
  
## 実装
  
  - <b> EpisoPassとどう違うのか</b>  
  
  - <b> episopass.htmlはどこに置くのか</b>  
    - EpisoPass.comを存続させるとすると EpisoPass.com/EpisoPass.html か?  
  
  - <b> HTMLファイル生成してダウンロード可能にする方法</b>  
    - テンプレートエンジンを使おうかと思ったが、テンプレートを表現する方法がない  
    - バッククオートでヒアドキュメントみたいなのは書けるが、いろんな記号を含むテキストだとうまくいかない  
    - テンプレートをBase64エンコードしたものを使うことにした。苦しい。  
    - 出力したいHTMLファイルのテンプレートを  
      - episodas.erbをerbしてエンコードしてdastemplate.jsを作る  
      - このデータdastemplateをlib.jsのmake_htmlで展開してJSONデータで置換  
  
  - <b> JSファイルをまとめる方法</b>  
    - とりあえずwebpackを使う  
  
  - <b> SPA的な実装</b>  
    - `<div>`を切り替えることにした  
    - lib.jsのshow()で指定する  
  
  - <b> Drag&Drop</b>  
    - `drop`イベントを`<body>`にバインドして`sendfile()`が呼ばれるようにしている  
    - (JSONだけでなく)HTMLをDrag&Dropできるようにした  
  
  - <b> CSSのwebpack</b>  
    - できるのだが表示のタイミングが遅れる  
    - erbを使うことにした  
  
  - <b> ブラウザ拡張機能</b>  
    - 以前のブラウザ拡張機能はEpisoPass.com上のデータを使ってた  
    - EpisoPass2020ではサーバ上にデータが無いので、`chrome.storage`にセーブしたQ/Aデータを使う  
    - DASのHTMLにアクセスしたとき `chrome.storage`にセーブする  
    - Amazonなどのサービスのログイン画面で、マッチするデータがあればDASを表示する  
  
  - <b> EpisoQから移動する方法</b>  
    - episoqコマンドで作った問題リスト/回答リストをepisopass.htmlの引数として渡すことにしたい  
  
  - <b> DASのHTMLの生成</b>  
    - `REPLACE`と書いてあるところのところにJSONを挿入する  
    - テンプレートエンジンを使う方がいいかも  
  
  - <b> セーブデータ</b>  
    - JSONデータをHTMLデータを扱うのは面倒なのでHTMLだけセーブできるようにする  
    - JSONはHTMLから抽出できる  
  
  - <b> PWA</b>  
    - 検討  

