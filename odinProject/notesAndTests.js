function Book ( title, author, pages, read ) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
   return  `${ title } by ${ author }, ${ pages } pages, ${ read }`;
  }
}

const theHobbit = new Book( "The Hobbit", "J.R.R. Tolkien", 295, "not read yet" );

console.log( theHobbit.info() );

function Student() {
}

Student.prototype.sayName = function() {
  console.log(this.name)
}

function EighthGrader(name) {
  this.name = name
  this.grade = 8
}

EighthGrader.prototype = Object.create(Student.prototype)

const carl = new EighthGrader("carl")
console.log(carl.sayName()  );  // console.logs "carl"
console.log(carl.grade   );  // console.logs "carl"
// 8