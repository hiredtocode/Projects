const questions = [
  {
    question: "What is 10 + 10?",
    options: ["8", "20", "28", "30"],
    answer: "20"
  },
  {
    question: "What is Athena's favorit animal?",
    options: ["jellyfish", "penguins", "otters"],
    answer: "otters"
  },
]

let question_number = 0;
let correct = 0;
let questionCount = questions.length;


document.addEventListener( 'DOMContentLoaded', () => {
  load_question();
} );

function load_question () {
  document.querySelector( '#question' ).innerHTML = questions[question_number].question;
  const options = document.querySelector( '#options' );
  options.innerHTML = '';
  for ( const option of questions[question_number].options ) {
    options.innerHTML += `<button class="option">${ option }</button>`;
  }

  let answer = questions[question_number].answer;
  let counter = document.querySelector( '#correct' );

  document.querySelectorAll( '.option' ).forEach( option => {
    option.onclick = () => {
      if ( option.textContent === answer ) {
        question_number++;
        correct++;
        counter.innerHTML = `${ correct } of ${ question_number }`;
        if (question_number < questionCount) {
					load_question();
				} else {
					const div = document.querySelector('div');
					div.innerHTML = `You've got `;
				}

      } else if ( option.textContent !== answer ) {
        question_number++;
        counter.innerHTML = `${ correct } of ${ question_number }`;
           if (question_number < questionCount) {
							load_question();
           } else {
             const div = document.querySelector( 'div' );
             div.innerHTML = `<h2>Quiz complete!</h2>`;
            }
      }
    }
  });
}