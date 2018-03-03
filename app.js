var GOOGLE_BOOKS_TEMPLATE_URL = "https://www.googleapis.com/books/v1/volumes\?q\={{title}}+inauthor:{{author}}"
var CARD_TEMPLATE = 
        '<div class="col s{{width}} m{{width}}">\
          <div class="card {{color}}">\
            <div class="card-content white-text">\
              <span class="card-title">{{title}}</span>\
              <p>by {{authors}}</p>\
            </div>\
            <div class="card-action">\
              <button class="white black-text btn waves-effect waves-light" onclick="openNotes(\'{{title}}\',\'{{authors}}\')">Notes\
			    \
			  </button>\
            </div>\
          </div>\
        </div>'
var ROW_TEMPLATE = '<div class="row">{{cards}}</div>'
var BOOKS_PER_ROW = 4
function startup(){

	$('.modal').modal();

	fetchJSON("books.json",renderBooks)

	function renderBooks(books){
		var booksDiv = document.getElementById('books')
		var rowOfBooks = []
		var BOOK_WIDTH = 12 / BOOKS_PER_ROW
		output = []
		var pastReads = books.past
		for(i in pastReads){
			i=+i
			var b = pastReads[i]
			var color = getRandomMateralizeColor()
			singleBook = CARD_TEMPLATE
							.replace(/{{title}}/g,b.title)
							.replace(/{{authors}}/g,b.authors.join(','))
							.replace(/{{description}}/g,b.description)
							.replace(/{{color}}/g,color)
							.replace(/{{width}}/g,BOOK_WIDTH)
			rowOfBooks.push(singleBook)

			if( (i+1) % BOOKS_PER_ROW == 0 || i == pastReads.length - 1){
				var row = ROW_TEMPLATE.replace(/{{cards}}/,rowOfBooks.join(''))
				output.push(row)

				// clean for next row
				rowOfBooks = []
			}
		}

		booksDiv.innerHTML = output.join('')
	}
}

function getDetailed(title, author, callback){
	var authorSafe = encodeURIComponent(author)
	var titleSafe = encodeURIComponent(title)
	targetURL = GOOGLE_BOOKS_TEMPLATE_URL
			.replace("{{title}}",titleSafe)
			.replace("{{author}}", authorSafe)

	fetchJSON(targetURL, callback)

}

function openNotes(title, author){
	getDetailed(title, author, function(details){
		// TODO Check items == 0
		if(details.items.length === 0){
			var error = "Cannot find book in Google Book store"
			console.log(error)
			document.getElementById("modalHeader").innerHTML = error
			$('#modal1').modal('open')
			return;
		}
		bookInfo = details.items[0].volumeInfo
		var imageURL = bookInfo.imageLinks.thumbnail
		var description = bookInfo.description || ""
		document.getElementById("bookCover").src = imageURL
		document.getElementById("modalHeader").innerHTML = title
		document.getElementById("modalDescription").innerHTML = description
		$('#modal1').modal('open');
	})
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

function fetchJSON(url, callback){
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
		xhttp.open("GET", url, true);
		xhttp.send();
	}