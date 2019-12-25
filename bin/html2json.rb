#
# EpisoPass利用画面のHTMLからJSONを抜き出す
#
ARGF.each { |line|
  line.chomp!
  if line =~ /^\s*const data = (.*)$/
    json = $1
    json.sub!(/;$/,'')
    puts json
  end
}

