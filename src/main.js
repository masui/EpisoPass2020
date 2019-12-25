//
// EpisoPassの入口
//

$ = require("./jquery.js")
editor = require("./editor.js")
episodas = require("./episodas.js")
crypt = require("./crypt.js")
dasmaker = require("./dasmaker.js")
dastemplate = require("./dastemplate.js")
// filesaver = require("./FileSaver.js")

sampledata = require("./sampledata.json")

editor.editor(sampledata)
