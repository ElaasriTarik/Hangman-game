let lost = document.querySelector('.lost')
let correct = document.querySelector('.correct')
let letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters = letters.split('')
letters.push("Space")
const animals = ["Animanls", "dog", "cat", "cow", "rabbit", "turtle", "tortoise", "porcupine", "crow", "pigeon"];
const insects = ["Insects", "scorpion", "maggot", "locust", "fly", "bee", "ant", "bug"]
const months = ["Months", "january", "february", "march", "april", "june", "july", "august", "september", "october", "november", "december"];
const cities = ["Cities", "madrid", "marrakech", "berlin", "new york", "amsterdam", "london", "montreal", "baghdad", "bangkok", "cairo", "milan", "roma"]
const countries = ["Countries", "morocco", "canada", "algeria", "england", "spain", "iraq", "cuba", "qatar", "brazil", "germany", "russia", "norway"]
let target_part = 2;

display_letters()
function display_letters() {
  [lost, correct].forEach((item, i) => {
    item.style.display = "none"
  });
  let alphabets_box = document.querySelector('.alphabets')
      let letter = letters.map((item) => {
        return `
           <h3 class="btn" id="${item}">${item}</h3>
        `
      }).join('')
      alphabets_box.innerHTML = letter;
      start_game()
}
function start_game() {
  target_part = 2;
  return_to_basic()

  let t_word = document.querySelector('.t_word')
   let subjects = [animals, insects, months, cities, countries]
   let random_subject = subjects[Math.floor(Math.random()*subjects.length)]
   let copy_random_subject = [...random_subject]
   let chosen_subject = [...copy_random_subject.splice(1)]
   let random_word  = chosen_subject[Math.floor(Math.random()*chosen_subject.length)].toUpperCase()
   console.log(random_word);
   t_word.textContent = random_subject[0]
   arrange_word(random_word)
}
function arrange_word(word) {
  let word_box = document.querySelector('.word_box')
  const rand = word[Math.floor(Math.random()*word.length)]
  const all_alphas = document.querySelectorAll('.btn')
  for (var i = 0; i < all_alphas.length; i++) {
    if (all_alphas[i].textContent === rand) {
      all_alphas[i].style.backgroundColor = "#f95959";
      all_alphas[i].style.color = "#e3e3e3";
    }
  }
  console.log(rand);
  const htmlString = word.split('').map((item) => {
    return `
       <div class="letter let${item}">${item === rand? item:''}</div>
    `
  }).join('')
  word_box.innerHTML = htmlString
  activate_keyboard(word, rand)
}
function activate_keyboard(word, rand_letter) {
  let alpha = document.querySelectorAll('.btn')
  alpha.forEach((item, i) => {
     item.addEventListener('click', () => {
       if(word.split('').indexOf(item.textContent) !== -1) {
         console.log(item.textContent);
         let those_include = document.querySelectorAll(`.let${item.textContent}`)
         .forEach((letter) => {
            letter.textContent = item.textContent;
              item.style.backgroundColor = "#a1f6b6";
            check_if_finished(word)
         });
       } else {
         wrong_letter()
       }
     })
  });
}
function check_if_finished(word) {
   let final_letters = document.querySelectorAll('.letter')
   let status = word.length;
   let times = 0;
   final_letters.forEach((item) => {
      item.textContent.length > 0 ? times++:times;

   });
   const corret_effect = document.querySelector('.correct')
   if (status === times) {
     console.log('done!');
     correct.classList.add("next_round")
     correct.style.display = "flex";
     setTimeout(() => {
       display_letters()
       correct.classList.remove("next_round")
     },1500)
   }
}
function wrong_letter(){
  const last_part = document.querySelector('.part11')
  target_part++;
  const this_part = document.querySelector(`.part${target_part}`)
  console.log(target_part);
  if (this_part == null) {
    return null
  }
  this_part.style.display = "block";
  if (last_part.style.display === "block") {
    for (var i = 6; i < 12; i++) {
      const to_red = document.querySelector(`.part${i}`)
      to_red.style.backgroundColor = "#f95959";
    }
    const head_red = document.querySelector(`.part${6}`)
    head_red.style.backgroundColor = "#e3e3e3"
    head_red.style.borderColor = "#f95959"
    const lost = document.querySelector('.lost')
    lost.classList.add("try_again")
    lost.style.display = "flex";
    setTimeout(() => {
      display_letters()
      lost.classList.remove("try_again")
    },1500)
  }
}

function return_to_basic() {
  for (var i = 3; i <= 11; i++) {
    const part = document.querySelector(`.part${i}`).style.display = "none"
  }
}
