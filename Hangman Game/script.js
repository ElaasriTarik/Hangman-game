let rand;
let this_word;
let exposed_letters = []
let lost = document.querySelector('.lost')
let correct = document.querySelector('.correct')
const credits_html = document.querySelector('.credits')
const erase_btn = document.querySelector('.erase_btn')
const show_btn = document.querySelector('.show_btn')
const skip_btn = document.querySelector('.skip_btn')

let credits = 6;
credits_html.textContent = credits;
let letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters = letters.split('')
//letters.push("Space")
const animals = ["Animanls", "dog", "cat", "cow", "rabbit", "turtle", "tortoise", "porcupine", "crow", "pigeon"];
const insects = ["Insects", "scorpion", "maggot", "locust", "fly", "bee", "ant", "bug"]
const months = ["Months", "january", "february", "march", "april", "june", "july", "august", "september", "october", "november", "december"];
const cities = ["Cities", "madrid", "marrakech", "berlin", "amsterdam", "london", "montreal", "baghdad", "bangkok", "cairo", "milan", "roma"]
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
    while (exposed_letters.indexOf(rand) >= 0) {
      rand = this_word[Math.floor(Math.random()*this_word.length)];
    }
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
  const htmlString = this_word.split('').map((item) => {
    return `
       <div class="letter let${item}">${item === rand? item:''}</div>
    `
  }).join('')
  word_box.innerHTML = htmlString
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
     correct.classList.add("next_round")
     correct.style.display = "flex";
     setTimeout(() => {
       credits+= 2;
       credits_html.textContent = credits;
       display_letters()
       correct.classList.remove("next_round")
     },1500)
   }
}
function wrong_letter(this_wrong_item){
  this_wrong_item.style.borderColor = "grey"
  this_wrong_item.classList.add("deleted")
  this_wrong_item.style.cursor = "none"
  exposed_letters.indexOf(this_wrong_item.textContent) !== -1? null:exposed_letters.push(this_wrong_item.textContent)
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
      credits--;
      credits_html.textContent = credits;
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
  display_letters()
})
