
document.addEventListener( 'DOMContentLoaded', function () {


	// clear button
	function clear() {
		localStorage.clear();
		location.reload();
	}

	document.getElementById('clear').addEventListener('click', clear);

	// delete button
	const main = document.querySelector('.wrapper main');

	main.addEventListener('click', function (e) {
		if (e.target.className === 'delete') {
			const article = e.target.closest('.article');
			main.removeChild(article);
		}
	});

	// Read book state (green background)

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

		// Checking if input fields are empty
		if (title === '' || author === '' || pages === '') {
			return;
		}

		// book object
		let book = {
			id: Date.now(),
			title: title,
			author: author,
			pages: pages,
		};


		// clear the form inputs after submitting.
		const formInputField = document.querySelectorAll('.modal_input');
		formInputField.forEach( ( input ) => ( input.value = '' ) );

		// saving to myLibrary and to localStorage
		myLibrary.push(book);
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

		// Make unique ID when add button is clicked
		let readId = {
			id: Date.now(),
		};

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
		main.appendChild( article );

	});


	// filter books (search function)
	const searchBar = document.forms['search-books'].querySelector('input');

	searchBar.addEventListener('keyup', function (event) {
		// turning the value to lower case
		const term = event.target.value.toLowerCase();
		// books = article
		const books = main.querySelectorAll( 'article' );
		if ( event.target.value === "" ) return;

		if (searchBar.target === '') console.log('done');
		console.log( "ss",searchBar );
			books.forEach(function (book) {
			const title = book.firstElementChild.textContent;
			if (title.toLowerCase().indexOf(term) !== -1) {
				book.style.display = 'block';
			} else {
				book.style.display = 'none';
			}

			// TODO add highlighting text while searching

				let searchExpression = new RegExp(term, 'ig');
				let matches = title.match(searchExpression);
				if (matches) {
					$('p').html(
						title.replace(searchExpression, (match) => {
							return `<span class="highlight">${match}</span>`;

						})
						);
						console.log('searchbar', term);
						console.log('matches', matches);
						console.log('searchEXP', searchExpression);
				}
		} );
	});

	// modal

	var modal = document.getElementsByClassName('modal')[0];
	var open = document.getElementsByClassName('openModal')[0];

	open.onclick = function () {
		modal.style.display = 'block';
	};

	window.onclick = function (e) {
		if (e.target == modal) {
			modal.style.display = 'none';
		}
	};
	// End of modal

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
	} );
	// End of footer
} );


