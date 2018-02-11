function startup(){
	var books = [{"title":"Outliers","authors":["Malcolm Gladwell"]},{"title":"Creativity Inc.","authors":["Edwin Catmull"]},{"title":"The Lean Startup","authors":["Eric Ries"]},{"title":"You Can Negotiate Anything","authors":["Herb Cohen"]},{"title":"Learn to Earn","authors":["Peter Lynch"]},{"title":"How to Invest $50-$5","authors":["000"]},{"title":"Thinking Fast and Slow","authors":["Daniel Kahneman  "]},{"title":"The Art of War","authors":["Sun Tzu"]},{"title":"Zero to One","authors":["Peter Thiel"]},{"title":"The Toyota Way","authors":["Jeffrey K. Liker"]},{"title":"How To Win Friends And Influence People","authors":["Dale Carnegie"]},{"title":"Good to Great","authors":["Jim Collins  "]},{"title":"Great","authors":["Choice"]},{"title":"Four Hour Workweek","authors":["Tim Ferriss"]},{"title":"The Zero Marginal Cost Society","authors":["Jeremy Rifkin"]},{"title":"The Challenger Sale","authors":["Matthew Dixon"]},{"title":"The Way of the Shepherd: 7 Ancient Secrets to Managing Productive People","authors":["Dr. Kevin Leman"]},{"title":"The Total Money Makeover","authors":["Dave Ramsey"]},{"title":"The Power of Habit","authors":["Charles Duhigg"]},{"title":"Sprint","authors":["Braden Kowitz"]},{"title":"Venture Deals","authors":["Jason Mendelson"]},{"title":"The Secret","authors":["Rhonda Byrne "]},{"title":"What Every Body Is Saying","authors":["Joe Navarro"]},{"title":"The Art of Conflict Management","authors":["Michael Dues"]},{"title":"The Millionaire Next Door","authors":["Thomas J. Stanley"]},{"title":"Curious: The Desire to Know and Why Your Future Depends On It","authors":["Ian Leslie"]},{"title":"Linchpin","authors":["Seth Godin "]},{"title":"The Alchemist","authors":["Paulo Coelho"]}]

	var ROW_TEMPLATE = '<div class="row">{{cards}}</div>'
	var CARD_TEMPLATE = 
	        '<div class="col s6 m4">\
	          <div class="card {{color}}">\
	            <div class="card-content white-text">\
	              <span class="card-title">{{title}} by {{authors}}</span>\
	              <p>{{description}}</p>\
	            </div>\
	            <div class="card-action">\
	              <a class="white-text" href="#">Notes</a>\
	            </div>\
	          </div>\
	        </div>'

	var booksDiv = document.getElementById('books')
	var rowOfBooks = []
	output = []
	for(i in books){
		var b = books[i]
		var color = getRandomMateralizeColor()
		singleBook = CARD_TEMPLATE
						.replace(/{{title}}/,b.title)
						.replace(/{{authors}}/,b.authors.join(','))
						.replace(/{{description}}/,b.description)
						.replace(/{{color}}/,color)
		rowOfBooks.push(singleBook)

		if(i % 3 == 2 || i == books.length - 1){
			var row = ROW_TEMPLATE.replace(/{{cards}}/,rowOfBooks.join(''))
			output.push(row)
		}
	}

	booksDiv.innerHTML = output.join('')
}

function getRandomMateralizeColor(){
	var values = {
		color:["red","pink","purple","deep-purple","indigo","purple","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey"],
		brightness:["lighten","darken"],
		intensity:["","-1","-2","-3","-4"]
	}
	var color = values.color[Math.floor(Math.random()*values.color.length)]
	var brightness = values.brightness[Math.floor(Math.random()*values.brightness.length)]
	var intensity = values.intensity[Math.floor(Math.random()*values.intensity.length)]
	return color + " " + brightness + intensity
}