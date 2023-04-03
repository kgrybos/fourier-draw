let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let textarea = document.getElementById("points");
textarea.value = fox_points_string;

let button = document.getElementById("button");

function calculateOffset(x, y) {
  const rect = canvas.getBoundingClientRect();
  let iks = x - rect.left - 3;
  let igrek = y - rect.top - 3;
  return new Point(iks, igrek);
}

function background() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function parseTextarea() {
  return textarea.value
    .trim()
    .split('\n')
    .map(line => {
      numbers = line.trim().split(' ');
      return {x: parseFloat(numbers[0]), y: parseFloat(numbers[1])};
    });
}

let penDown = false;
let drawing;
let lastMouse = new Point();

function handleMouseMove(event) {
  background();
  let mouse = calculateOffset(event.clientX, event.clientY);
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 2, 0, TAU);
  ctx.fill();
  ctx.lineWidth = '2';

  if(penDown) {
    drawing.lineTo(mouse.x, mouse.y);
    ctx.stroke(drawing);

    textarea.value += `${mouse.x - canvas.width/2} ${mouse.y - canvas.height/2}\n`;
    lastMouse = mouse;
  }
}

function handleMouseDown(event) {
  canvas.addEventListener('mousemove', handleMouseMove);

  lastMouse = calculateOffset(event.clientX, event.clientY);
  penDown = true;
}

function handleMouseUp(event) {
  penDown = false;
  canvas.removeEventListener('mousemove', handleMouseMove);
}

let running = false;
let running_interval;
let time;

button.addEventListener('click', changeMode);
function changeMode() {
  running = !running;
  button.innerHTML = running ? 'Nowy rysunek' : 'Start';
  if(running) {
    canvas.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);

    textarea.disabled = true;

    let circles = new Circles(canvas.width/2, canvas.height/2);
    let points = parseTextarea();
    let numbers = [];
    for (let i = 0; i < points.length; i += 1) {
      const c = new Complex(points[i].x, points[i].y);
      numbers.push(c);
    }
    numbers = dft(numbers);
    for(let i = 0; i < numbers.length; i++) {
      circles.addCircle(i, numbers[i].ampl(), numbers[i].offset());
    }
    
    time = 0;
    running_interval = window.setInterval( () => {
      circles.render();
      time += TAU/numbers.length;
    }, 50);
  } else {
    window.clearInterval(running_interval);
    textarea.value = ''
    textarea.disabled = false;

    drawing = new Path2D();

    canvas.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
  }
}

changeMode();