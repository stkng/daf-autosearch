Der einfachste Weg das Script zu verwenden ist, auf der Seite folgende Zeile in die Browser Console einzugeben:

fetch('https://raw.githubusercontent.com/stkng/daf-autosearch/main/autosearch.js').then(r => r.text()).then(t => eval(t))
