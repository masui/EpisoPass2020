//
//
//

editor = require("./editor.js")

data = {};
data['name'] = 'Amazon_masui@pitecan.com';
data['seed'] = 'Amazon_seed';
data['qas'] = [
    {
        question: "コケて小指をケガしたのは?",
        answers: ["北海道", "東京", "神奈川", "長野", "奈良"]
    }, {
        question: "威頼とは?",
        answers: ["体育", "音楽", "物理", "英語", "書道"]
    }
];

editor.editor(data)
