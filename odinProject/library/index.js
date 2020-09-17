

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

  //   // input values
  //   let book = {
  //     title: document.getElementById( 'title' ).value,
  //     author: document.getElementById( 'author' ).value,
  //     pages: document.getElementById( 'pages' ).value,
  //     read: document.getElementById( 'read' ).value
  //   };

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
  function clear () {
    localStorage.clear();
  }
  // button event listeners
  // document.getElementById( 'add-book' ).addEventListener( 'click', save );
  //TODO make button to clear local storage
  document.getElementById( 'clear' ).addEventListener( 'click', clear );

  // Have read the book check button
  let isChecked = () => {
    let read = document.getElementById( 'read' ).checked;
    if ( read === checked ) {
      return true;
    }
  };

  // delete button
  const list = document.querySelector( '#book-list ul' );

  list.addEventListener( 'click', function ( event ) {
    if ( event.target.className === 'delete' ) {
      const li = event.target.parentElement;
      list.removeChild( li );
    }
  } );

  // add book-list
  const myLibrary = [];
  const addBookButton = document.getElementById( 'add-book' );

  addBookButton.addEventListener( 'click', function ( event ) {
    // prevent default of refreshing the page when clicked
    event.preventDefault();
    // get the value that was typed in the input field
    const title = document.querySelector( '#title' ).value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
     //
    let book = {
      id: Date.now(),
      title: title,
      author: author,
      pages: pages
    }

    myLibrary.push( book );
    document.querySelector( 'form' ).reset(); // clear the form after submitting.

    // saving to localStorage
    localStorage.setItem( 'BookList', JSON.stringify( myLibrary ) );

    //create elements
    const li = document.createElement( 'li' );
    const bookTitle = document.createElement( 'span' );
    const bookAuthor = document.createElement( 'span' );
    const bookPages = document.createElement( 'span' );
    const deleteButton = document.createElement( 'span' );

    // add content
    deleteButton.textContent = 'delete';
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;

    // add classes
    bookTitle.classList.add('bookTitle');
    bookAuthor.classList.add('bookAuthor');
    bookPages.classList.add('bookPages');
    deleteButton.classList.add( 'delete' );

    // insert elements in to the DOM
    li.appendChild(bookTitle); // orders matter
    li.appendChild(bookAuthor); // orders matter
    li.appendChild(bookPages); // orders matter
    li.appendChild( deleteButton ); // orders matter

    // append li to the DOM now
    list.appendChild( li );



  } );

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
  const searchBar = document.forms['search-books'].querySelector( 'input' );

  searchBar.addEventListener( 'keyup', function ( event ) {

    // turning the value to lower case
    const term = event.target.value.toLowerCase();
    // books = li
    const books = list.getElementsByTagName( 'li' );

    Array.from( books ).forEach( function ( book ) {
      const title = book.firstElementChild.textContent;
      if ( title.toLowerCase().indexOf( term ) !== -1 ) {
        book.style.display = 'block';

      } else {

        book.style.display = 'none';

      }
    }
    );
  } );

  // modal button
  // TODO find out what "modalBox" does.
  var modal = document.getElementsByClassName( 'modal' )[0];
  var open = document.getElementsByClassName( 'openModal' )[0];
  var close = document.getElementsByClassName( 'closeModal' )[0];

  open.onclick = function () {
    modal.style.display = 'block';
  };

  close.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function ( e ) {
    if ( e.target == modal ) {
      modal.style.display = 'none';
    }
  };

  // tabbed content (footer)
  const tabs = document.querySelector( '.tabs' );
  const panels = document.querySelectorAll( '.panel' );
  tabs.addEventListener( 'click', function ( event ) {
    if ( event.target.tagName === 'LI' ) {
      const targetPanel = document.querySelector( event.target.dataset.target );
      panels.forEach( function ( panel ) {
        if ( panel === targetPanel ) {
          panel.classList.add( 'active' );
        } else {
          panel.classList.remove( 'active' );
        }
      } );
    }
  } );
} );