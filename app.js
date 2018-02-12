var GOOGLE_BOOKS_TEMPLATE_URL = "https://www.googleapis.com/books/v1/volumes\?q\={{title}}+inauthor:{{author}}"
var CARD_TEMPLATE = 
        '<div class="col s{{width}} m{{width}}">\
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
var ROW_TEMPLATE = '<div class="row">{{cards}}</div>'
var BOOKS_PER_ROW = 6
function startup(){
	var books = [{"title":"Outliers","authors":["Malcolm Gladwell"]},{"title":"Creativity Inc.","authors":["Edwin Catmull"]},{"title":"The Lean Startup","authors":["Eric Ries"]},{"title":"You Can Negotiate Anything","authors":["Herb Cohen"]},{"title":"Learn to Earn","authors":["Peter Lynch"]},{"title":"How to Invest $50-$5","authors":["000"]},{"title":"Thinking Fast and Slow","authors":["Daniel Kahneman  "]},{"title":"The Art of War","authors":["Sun Tzu"]},{"title":"Zero to One","authors":["Peter Thiel"]},{"title":"The Toyota Way","authors":["Jeffrey K. Liker"]},{"title":"How To Win Friends And Influence People","authors":["Dale Carnegie"]},{"title":"Good to Great","authors":["Jim Collins  "]},{"title":"Great","authors":["Choice"]},{"title":"Four Hour Workweek","authors":["Tim Ferriss"]},{"title":"The Zero Marginal Cost Society","authors":["Jeremy Rifkin"]},{"title":"The Challenger Sale","authors":["Matthew Dixon"]},{"title":"The Way of the Shepherd: 7 Ancient Secrets to Managing Productive People","authors":["Dr. Kevin Leman"]},{"title":"The Total Money Makeover","authors":["Dave Ramsey"]},{"title":"The Power of Habit","authors":["Charles Duhigg"]},{"title":"Sprint","authors":["Braden Kowitz"]},{"title":"Venture Deals","authors":["Jason Mendelson"]},{"title":"The Secret","authors":["Rhonda Byrne "]},{"title":"What Every Body Is Saying","authors":["Joe Navarro"]},{"title":"The Art of Conflict Management","authors":["Michael Dues"]},{"title":"The Millionaire Next Door","authors":["Thomas J. Stanley"]},{"title":"Curious: The Desire to Know and Why Your Future Depends On It","authors":["Ian Leslie"]},{"title":"Linchpin","authors":["Seth Godin "]},{"title":"The Alchemist","authors":["Paulo Coelho"]}]


	
	var booksDiv = document.getElementById('books')
	var rowOfBooks = []
	var BOOK_WIDTH = 12 / BOOKS_PER_ROW
	output = []
	for(i in books){
		i=+i
		var b = books[i]
		var color = getRandomMateralizeColor()
		singleBook = CARD_TEMPLATE
						.replace(/{{title}}/,b.title)
						.replace(/{{authors}}/,b.authors.join(','))
						.replace(/{{description}}/,b.description)
						.replace(/{{color}}/,color)
						.replace(/{{width}}/g,BOOK_WIDTH)
		rowOfBooks.push(singleBook)

		if( (i+1) % BOOKS_PER_ROW == 0 || i == books.length - 1){
			var row = ROW_TEMPLATE.replace(/{{cards}}/,rowOfBooks.join(''))
			output.push(row)

			// clean for next row
			rowOfBooks = []
		}
	}

	booksDiv.innerHTML = output.join('')
}

function getDetailed(title, author, callback){
	var authorSafe = encodeURIComponent(author)
	var titleSafe = encodeURIComponent(title)
	targetURL = GOOGLE_BOOKS_TEMPLATE_URL
			.replace("{{title}}",titleSafe)
			.replace("{{author}}", authorSafe)
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	try{
    		callback(JSON.parse(this.responseText))
    	}
    	catch(e){
    		console.log("Unable to process response: " + this.responseText)
    		callback({})
    	}
    }
	};
	xhttp.open("GET", targetURL, true);
	xhttp.send();

}

function getRandomMateralizeColor(){
	var values = {
		color:["red","purple","deep-purple","indigo","purple","blue","light-blue","cyan","teal","green","orange","deep-orange"],
		brightness:["lighten","darken"],
		intensity:["","-1","-2","-3"] // -4 can be too light
	}
	var color = values.color[Math.floor(Math.random()*values.color.length)]
	var brightness = values.brightness[Math.floor(Math.random()*values.brightness.length)]
	var intensity = values.intensity[Math.floor(Math.random()*values.intensity.length)]
	return color + " " + brightness + intensity
}