EpisoPass2020  
<b> EpisoPassとどう違うのか</b>  
  
<b> episopass.htmlはどこに置くのか</b>  
  - EpisoPass.comを存続させるとすると EpisoPass.com/EpisoPass.html か?  
  
<b> HTMLファイル生成してダウンロード可能にする方法</b>  
  - テンプレートエンジンを使おうかと思ったが、テンプレートを表現する方法がない  
  - バッククオートでヒアドキュメントみたいなのは書けるが、いろんな記号を含むテキストだとうまくいかない  
  - テンプレートをBase64エンコードしたものを使うことにした。苦しい。  
  - 出力したいHTMLファイルのテンプレートを  
    - episodas.erbをerbしてエンコードしてdastemplate.jsを作る  
    - このデータdastemplateをlib.jsのmake_htmlで展開してJSONデータで置換  
  
<b> JSファイルをまとめる方法</b>  
  - とりあえずwebpackを使う  
  
<b> SPA的な実装</b>  
  - `<div>`を切り替えることにした  
  - lib.jsのshow()で指定する  
  
<b> Drag&Drop</b>  
  - そういうAPIがある  
  - JSONだけでなくHTMLもDrag&Dropできるようにした  
  - `sendfile` というキーワード  
  
<b> CSSのwebpack</b>  
  - できるのだがタイミングがずれる  
  - erbを使うことにした  
  
<b> 拡張機能</b>  
  - サーバ上にデータが無いので、`chrome.storage`にセーブしたQ/Aデータを使うことにした  
  - DASのHTMLにアクセスしたとき `chrome.storage`にセーブする  
  - Amazonなどのサービスのログイン画面で、マッチするデータがあればDASを表示する  
  
<b> EpisoQから移動する方法</b>  
  - episoqコマンドで作った問題リスト/回答リストをepisopass.htmlに渡すことにしたい  
  
<b> DASのHTMLの生成</b>  
  - REPLACEのところにJSONが入るようにする  
  - JSからerbを使えないから  
  - テンプレートエンジンを使う方法はあるかも  
  
<b> セーブデータ</b>  
  - JSONデータをHTMLデータを扱うのは面倒なのでHTMLだけセーブできるようにする  
  - JSONはHTMLから抽出できる  
  
<b> PWA</b>  

