

let dataList = document.querySelector( "#list" );

function Book () {

}
document.addEventListener( 'DOMContentLoaded', function () {
	// function save ( event ) {
	//   // to stop the form submitting
	//   event.preventDefault();

	//   // exit out of this function if empty input is detected
	//   if (
	//     document.getElementById( "title" ).value.length === 0 ||
	//     document.getElementById( "author" ).value.length === 0 ||
	//     document.getElementById( "pages" ).value.length === 0 ||
	//     document.getElementById( "read" ).value.length === 0
	//   ) {
	//     return;
	//   }

	//   // if there is nothing saved at the start then save an empty array
	//   if ( localStorage.getItem( 'data' ) === null ) {
	//     localStorage.setItem( 'data', '[]' );
	//   }

	//   // get old data and slap it to the new data
	//   let oldData = JSON.parse( localStorage.getItem( 'data' ) );
	//   oldData.push( book );

	//   // save the old + new data to local storage
	//   localStorage.setItem( 'data', JSON.stringify( oldData ) );

	//   // to clear the form for the next entry
	//   document.querySelector( 'form' ).reset();

	//   var output = '';
	//   for ( let i = 0; i < oldData.length; i++ ) {
	//     output += '<li>' + oldData[i] + '</li>';

	//   }

	//   if ( localStorage.getItem( 'data' ) !== null ) {
	//     dataList.innerHTML = localStorage.getItem( 'data' );

	//   }

	// };

	// clear button
	function clear() {
		localStorage.clear();
		location.reload();
	}
	// button event listeners
	// document.getElementById( 'add-book' ).addEventListener( 'click', save );

	document.getElementById('clear').addEventListener('click', clear);

	// delete button
	const main = document.querySelector('.wrapper main');

	main.addEventListener('click', function (e) {
		if (e.target.className === 'delete') {
			const article = e.target.closest('.article');
			main.removeChild(article);
		}
	});

	// Read book state

	const DynamicCheckboxes = {
		checkboxes: document.querySelectorAll('.article li input[type="checkbox"]'),
		article: document.querySelector('.article'),

		initialize () {
			this.select();
		},

		select () {
			const checkboxes = this.checkboxes;

			checkboxes.forEach( checkbox => checkbox.addEventListener( 'click', e => {
				const art = e.target.closest( '.article' );
				if ( checkbox.checked ) {

					art.style.backgroundColor = 'lightgreen';

				} else {

					art.removeAttribute( 'style' );

				}
			} ) )
		}
	}

	DynamicCheckboxes.initialize();


	// list.addEventListener('change', function (event) {
	//   if (readBoxId.checked) {
	// 		console.log('checked');
	// 		console.log('readbox', readBoxId);
	// 	} else {
	// 		console.log('unchecked');
	// 	}
	// });

	// add book-list
	const myLibrary = [];
	const addBookButton = document.getElementById('add-book');

	addBookButton.addEventListener('click', function (event) {
		// prevent default of refreshing the page when clicked
		event.preventDefault();
		// get the value that was typed in the input field
		const title = document.querySelector('#title').value;
		const author = document.querySelector('#author').value;
		const pages = document.querySelector('#pages').value;

		if (title === '' || author === '' || pages === '') {
			return;
		}
		//
		let book = {
			id: Date.now(),
			title: title,
			author: author,
			pages: pages,
		};

		myLibrary.push(book);
		console.log(myLibrary);

		// clear the form after submitting.
		const formInputField = document.querySelectorAll('.modal_input');
		formInputField.forEach( ( input ) => ( input.value = '' ) );
		
		//   // if there is nothing saved at the start then save an empty array
		//   if ( localStorage.getItem( 'data' ) === null ) {
		//     localStorage.setItem( 'data', '[]' );
		// saving to localStorage
		localStorage.setItem('BookList', JSON.stringify(myLibrary));

		//create elements
		const li = document.createElement('li');
		const bookTitle = document.createElement('span');
		const bookAuthor = document.createElement('span');
		const bookPages = document.createElement('span');
		const deleteButton = document.createElement('span');
		const readButton = document.createElement('section');
		const label = document.createElement('label');
		const input = document.createElement('input');
		const div = document.createElement('div');
		const article = document.createElement('article');
		const ul = document.createElement('ul');

		let readId = {
			id: Date.now(),
		};
		console.log(readId.id);

		// add content
		deleteButton.textContent = 'delete';
		readButton.textContent = '';
		bookTitle.textContent = book.title;
		bookAuthor.textContent = book.author;
		bookPages.textContent = book.pages;
		input.type = 'checkbox';
		label.htmlFor = readId.id;
		label.textContent = 'Finished reading?';

		// add classes

		bookTitle.classList.add('bookTitle');
		bookAuthor.classList.add('bookAuthor');
		bookPages.classList.add('bookPages');
		readButton.classList.add('container');
		deleteButton.classList.add('delete');
		input.classList.add('read');
		input.setAttribute('id', readId.id);
		div.classList.add('read');
		article.classList.add('article');
		ul.classList.add('list');

		// insert elements in to the DOM
		article.appendChild(ul); // orders matter
		ul.appendChild(li); // orders matter
		li.appendChild(bookTitle); // orders matter
		li.appendChild(bookAuthor); // orders matter
		li.appendChild(bookPages); // orders matter
		li.appendChild(div); // orders matter
		div.appendChild(label); // orders matter
		div.appendChild(input); // orders matter
		li.appendChild(deleteButton); // orders matter

		// append li to the DOM now
		main.appendChild(article);
	});

	// hide books

	// const hideBox = document.querySelector( '#hide' );

	// hideBox.addEventListener( 'change', function ( event ) {
	//   if ( hideBox.checked ) {
	//     list.style.display = "none";
	//   } else {
	//     list.style.display = "initial";
	//   }
	// } );

	// filter books (search function)
	// TODO add highlighting text while searching
	const searchBar = document.forms['search-books'].querySelector('input');

	searchBar.addEventListener('keyup', function (event) {
		// turning the value to lower case
		const term = event.target.value.toLowerCase();
		// books = li
		const books = main.getElementsByTagName('li');

		Array.from(books).forEach(function (book) {
			const title = book.firstElementChild.textContent;
			if (title.toLowerCase().indexOf(term) !== -1) {
				book.style.display = 'block';
			} else {
				book.style.display = 'none';
			}
		});
	});

	// modal button

	var modal = document.getElementsByClassName('modal')[0];
	var open = document.getElementsByClassName('openModal')[0];

	open.onclick = function () {
		modal.style.display = 'block';
	};

	// close.onclick = function () {
	//   modal.style.display = 'none';
	// };

	window.onclick = function (e) {
		if (e.target == modal) {
			modal.style.display = 'none';
		}
	};

	// tabbed content (footer)
	const tabs = document.querySelector('.tabs');
	const panels = document.querySelectorAll('.panel');
	tabs.addEventListener('click', function (event) {
		if (event.target.tagName === 'LI') {
			const targetPanel = document.querySelector(event.target.dataset.target);
			panels.forEach(function (panel) {
				if (panel === targetPanel) {
					panel.classList.add('active');
				} else {
					panel.classList.remove('active');
				}
			});
		}
	});
} );


