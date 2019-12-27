# 単一ファイルEpisoPass
  
## 考え方

  - [EpisoPass.com](http://EpisoPass.com)にデータをセーブするのは良くないので、完全にひとつのHTML(+JS)でEpisoPass機能を実現するようにした  
  - 安心感とか使い勝手とかが若干向上したかも  
  
## 実装
  
  - <b> EpisoPassとどう違うのか</b>  
    - WAF利用をやめた  
    - サーバにデータを置くのをやめた  
  
  - <b> episopass.htmlはどこに置くのか</b>  
    - EpisoPass.com/episopass.html に置く  
  
  - <b> HTMLファイル生成してダウンロード可能にする方法</b>  
    - テンプレートエンジンを使おうかと思ったが、テンプレートを表現する方法がない  
    - バッククオートでヒアドキュメントみたいなのは書けるが、いろんな記号を含むテキストだとうまくいかない  
    - テンプレートをBase64エンコードしたものを使うことにした。苦しい。  
    - 出力したいHTMLファイルのテンプレートを  
      - episodas.erbをerbしてエンコードしてdastemplate.jsを作る  
      - このデータdastemplateをlib.jsのmake_htmlで展開してJSONデータで置換  
  
  - <b> JSファイルをまとめる方法</b>  
    - webpackを使う  
  
  - <b> SPA的な実装</b>  
    - `<div>`を切り替える  
    - lib.jsの`show()`で指定する  
  
  - <b> Drag&Drop</b>  
    - `drop`イベントを`<body>`にバインドして`sendfile()`が呼ばれるようにしている  
    - (JSONだけでなく)HTMLをDrag&Dropできるようにした  
  
  - <b> CSSのwebpack</b>  
    - 表示のタイミングが遅れるのでerbを使うことにした  
  
  - <b> ブラウザ拡張機能</b>  
    - 以前のブラウザ拡張機能はEpisoPass.com上のデータを使ってた  
    - EpisoPass2020ではサーバ上にデータが無いので、`chrome.storage`にセーブしたQ/Aデータを使う  
    - DASのHTMLにアクセスしたとき `chrome.storage`にセーブする  
    - Amazonなどのサービスのログイン画面で、マッチするデータがあればDASを表示する  
  
  - <b> <a href="http://github.com/masui/EpisoQ">EpisoQ</a>から移動する方法</b>
    - episoqコマンドで作った問題リスト/回答リストをepisopass.htmlの引数として渡す  
  
  - <b> DASのHTMLの生成</b>  
    - `REPLACE`と書いてあるところにJSONを挿入する  
    - `lodash`のようなテンプレートエンジンを使う方がいいかも  
  
  - <b> セーブデータ</b>  
    - JSONデータをHTMLデータを扱うのは面倒なのでHTMLだけセーブできるようにする  
    - JSONはHTMLから抽出できる  
  
  - <b> PWA</b>  
    - 検討  

