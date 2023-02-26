Der einfachste Weg das Script zu verwenden ist, auf der Seite folgende Zeilen in die Browser Console eingeben:

fetch('https://raw.githubusercontent.com/stkng/daf-autosearch/main/autosearch.js').then(r => r.text()).then(t => eval(t))
