let rand;
let this_word;
let exposed_letters = []
let random_letters = []
let score = 0;
let highest_score = 0;
let lost = document.querySelector('.lost')
let correct = document.querySelector('.correct')
const credits_html = document.querySelector('.credits')
const erase_btn = document.querySelector('.erase_btn')
const show_btn = document.querySelector('.show_btn')
const skip_btn = document.querySelector('.skip_btn')
const score_html = document.querySelector('.score')
const highestScore_html = document.querySelector('.highestScore')

const for_h_score = localStorage.getItem("highest_score")
score_html.textContent = score;
highest_score = parseInt(for_h_score);
highestScore_html.textContent = for_h_score !== undefined ? for_h_score:highest_score;

let credits = 20;
credits_html.textContent = credits;
let letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters = letters.split('')
//letters.push("Space")
const companies = ["Companies", "google", "facebook", "fedex", "amazon", "twitter", "ebay", "microsoft", "dell", "xiaomi"]
const cars = ["cars", "bmw", "renault", "nissan", "dacia", "ferrari", "mercedes", "ford", "fiat"]
const animals = ["Animanls", "dog", "cat", "cow", "rabbit", "turtle", "tortoise", "porcupine", "crow", "pigeon"];
const insects = ["Insects", "scorpion", "maggot", "locust", "fly", "bee", "ant", "bug", "worm"]
const months = ["Months", "january", "february", "march", "april", "june", "july", "august", "september", "october", "november", "december"];
const cities = ["Cities", "madrid", "marrakech", "berlin", "amsterdam", "london", "montreal", "baghdad", "bangkok", "cairo", "milan", "roma", "kiyv"]
const countries = ["Countries", "morocco", "canada", "algeria", "england", "spain", "iraq", "cuba", "qatar", "brazil", "germany", "russia", "norway"]
const human_organs = ["Human Organs", "hand", "face", "leg", "toe", "finger", "nose", "mouth", "forehead", "hair", "eyes", "neck", "skin"]
let target_part = 2;

function add_to_localStorage() {
  score += 10;
  setTimeout(() => {
    score_html.textContent = score;
    score_html.style.animationName = "none"
  },700)
  score_html.style.animationName = "up_down"
  if (score > highest_score) {
    console.log(score, highest_score);
    highest_score = score;
    localStorage.setItem("highest_score", highest_score)
    const h_score = localStorage.getItem("highest_score")
    setTimeout(() => {
     // highestScore_html.textContent = h_score;
       // highestScore_html.style.animationName = "none"
    },700)
    // highestScore_html.style.animationName = "up_down"
    console.log(h_score)
  }
}

display_letters()
function display_letters() {
  random_letters = [];
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
   let subjects = [animals, insects, months, cities, countries, human_organs, cars, companies]
   let random_subject = subjects[Math.floor(Math.random()*subjects.length)]
   let copy_random_subject = [...random_subject]
   let chosen_subject = [...copy_random_subject.splice(1)]
   let random_word  = chosen_subject[Math.floor(Math.random()*chosen_subject.length)].toUpperCase()
   console.log(random_word);
   t_word.textContent = random_subject[0]
   arrange_word(random_word)
}
function arrange_word(word) {
  credits += 3;
  get_random_letter(word)
  activate_keyboard(word)
}

function get_random_letter(word) {
  console.log(this_word);
  if (credits >= 3) {
    credits -= 3;
    credits_html.textContent = credits;
    this_word = word !== undefined? word:this_word;
    rand = this_word[Math.floor(Math.random()*this_word.length)]
    console.log(rand);
    while (random_letters.indexOf(rand) >= 0) {
      rand = this_word[Math.floor(Math.random()*this_word.length)];
    }
    random_letters.push(rand)
    console.log(random_letters);
    const all_alphas = document.querySelectorAll('.btn')
    for (var i = 0; i < all_alphas.length; i++) {
      if (all_alphas[i].textContent === rand) {
        if (all_alphas[i].classList.contains("deleted")) {
          all_alphas[i].style.backgroundColor = "#e3e3e3";
          all_alphas[i].style.color = "#455d7a";
        } else {
          all_alphas[i].style.backgroundColor = "#f95959";
          all_alphas[i].style.backgroundColor = "#a1f6b6";
          all_alphas[i].style.color = "#455d7a";
        }
      }
  }
  let word_box = document.querySelector('.word_box')
  let htmlString;
  for (var i = 0; i < random_letters.length; i++) {
      htmlString = this_word.split('').map((item) => {
      return `
         <div class="letter let${item}"></div>
      `
    }).join('')
    }
  word_box.innerHTML = htmlString
  // ADD NEW BONUS LETTER FROM random_letters ARRAY
  const to_be_filled_letters = document.querySelectorAll('.letter')
  for (var i = 0; i < to_be_filled_letters.length; i++) {
    for (var x = 0; x < random_letters.length; x++) {
      if (to_be_filled_letters[i].classList[1].slice(3) === random_letters[x]) {
        to_be_filled_letters[i].textContent = random_letters[x]
      }
    }
  }
  check_if_finished(this_word)
} else {
  alert("you don't have enough credits!")
}

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
         wrong_letter(item)
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
     //correct.classList.add("next_round")
     //correct.style.display = "flex";
     add_to_localStorage()
     setTimeout(() => {
       credits+= 2;
       credits_html.textContent = credits;
       display_letters()
       //correct.classList.remove("next_round")
     },1500)
   }
}
function wrong_letter(this_wrong_item){
  credits--;
  credits_html.textContent = credits;
  this_wrong_item.style.borderColor = "grey"
  this_wrong_item.classList.add("deleted")
  this_wrong_item.style.cursor = "none"
  exposed_letters.indexOf(this_wrong_item.textContent) !== -1? null:exposed_letters.push(this_wrong_item.textContent)
  const last_part = document.querySelector('.part11')
  target_part++;
  const this_part = document.querySelector(`.part${target_part}`)
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
    //lost.classList.add("try_again")
    //lost.style.display = "flex";
    setTimeout(() => {
      credits--;
      credits_html.textContent = credits;
      display_letters()
      //lost.classList.remove("try_again")
    },1500)
  }
}

function return_to_basic() {
  for (var i = 3; i <= 11; i++) {
    const part = document.querySelector(`.part${i}`).style.display = "none"
  }
}

show_btn.addEventListener('click', () => {
  get_random_letter()
})
erase_btn.addEventListener('click', () => {
  erase_one_letter()
})
function erase_one_letter() {
  if (credits >= 2) {
    const all_letters = document.querySelectorAll('.btn')
    let rand_delete = all_letters[Math.floor(Math.random()*all_letters.length)]

    if (this_word.indexOf(rand_delete.textContent) == -1) {
      exposed_letters.indexOf(rand_delete.textContent) !== -1? null:exposed_letters.push(rand_delete.textContent)
      rand_delete.style.borderColor = "grey"
      rand_delete.classList.add("deleted")
      rand_delete.style.cursor = "none"
      credits -= 2;
      credits_html.textContent = credits;
      console.log(exposed_letters);
    } else {
      erase_one_letter()
    }
  } else {
    alert('You need more credits!')
  }
}
skip_btn.addEventListener('click', () => {
  credits -= 2;
  credits_html.textContent = credits
  display_letters()
})
