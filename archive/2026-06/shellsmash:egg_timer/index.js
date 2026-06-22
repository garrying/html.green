let st = 0


const base_second = 1000

let timer;

let range_slider = document.getElementById("timer")
let range_slider_text = document.getElementById("timer_value")
let cooker = document.getElementById("cooker")
let timeout = 0;

let yolk = document.getElementById("yolk")
let egg_shell = document.getElementById("egg-shell")
let egg = document.getElementById("egg")

cooker.disabled = true;

/**
 * Thresholds
 *  - raw:    time <= 180   (<= 3 minutes)
 *  - medium: time <= 420   (<= 7 minutes)
 *  - hard:   time >  420   (> 7 minutes)
 */
function change_color(seconds) {
  const states = ['raw', 'soft', 'jammy', 'hard', 'overcooked'];

  let state;
  let minutes = seconds / 60;
  if (minutes < 4) {
    state = 'raw';
  } else if (minutes < 6) {
    state = 'soft';
  } else if (minutes < 8) {
    state = 'jammy';
  } else if (minutes < 12) {
    state = 'hard';
  } else {
    state = 'overcooked';
  }

  const applyState = (element) => {
    states.forEach(s => element.classList.remove(s));
    element.classList.add(state);
  };

  applyState(yolk);
  applyState(document.getElementById('egg_white'));

  return state;
}

function init() {
  range_slider.addEventListener('input', () => {
    const seconds = range_slider.value * 60;

    if (range_slider.value > 1) {
      cooker.disabled = false;
    }

    range_slider_text.innerHTML = `${range_slider.value} Min(s) / ${change_color(seconds)}`;
  });

  cooker.addEventListener('click', () => {
    timeout = range_slider.value * 60;
    cook(range_slider.value * 60);
    cooker.disabled = true;
    range_slider.disabled = true;
  })
}


function timer_text_rem(val) {
  let timer_rem = timeout - val;
  range_slider_text.innerHTML = "" + timer_rem + " \t Min(s) remaining"
}

function cook(time) {
  timer = setInterval(() => {
    st++
    change_color(st)
    if (st >= time) {
      clearInterval(timer);
      alert("Your egg is ready!")
    }
    timer_text_rem()
  }, base_second);

}


init();










