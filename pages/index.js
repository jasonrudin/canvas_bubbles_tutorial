import Head from 'next/head'
import '../public/canvas.js'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <canvas></canvas>
      {DrawCanvas()}
       
      {/* <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main> */}

{/*
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>

*/}
    </div>
  )
}

var canvas = undefined;
var c = undefined;
var canvas_x = undefined;
var canvas_y = undefined;


//circle data




var CircleArray = [];
var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 60;
var minRadius = 2;


function DrawCanvas(){
  if (typeof window !== "undefined"){
  canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth*(2/3);
  canvas.height = window.innerHeight*(2/3);
  canvas_x = canvas.getBoundingClientRect().left;
  canvas_y = canvas.getBoundingClientRect().top;
  c = canvas.getContext('2d');
    
    //x = (radius + 1) + (Math.random() * (canvas.width - (2 * (radius-1))));
    //y = (radius + 1) + (Math.random() * (canvas.height - (2 * (radius-1))));

    init();

    window.addEventListener('mousemove', function(event){
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('resize', function(){
      canvas.width = window.innerWidth*(2/3);
      canvas.height = window.innerHeight*(2/3);
      canvas_x = canvas.getBoundingClientRect().left;
      canvas_y = canvas.getBoundingClientRect().top;
      init();
    })

    animate();
  }
}



function Circle(xStart, yStart, radius, dx, dy, color){
  this.x = xStart;
  this.y = yStart;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.originalRadius = radius;

  this.draw = function(){
    //console.log('draw');
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function(){
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if( (mouse.x - this.x - canvas_x) > -50 && (mouse.x - this.x - canvas_x) < 50 
        && (mouse.y - this.y - canvas_y) > -50 && (mouse.y - this.y - canvas_y) < 50){
          if(this.radius < maxRadius){
            this.radius+= 2;
          }
    }
    else if(this.radius > minRadius && this.radius > this.originalRadius){
        this.radius --;
      }

    this.draw();
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0, canvas.width, canvas.height);
  for(var i = 0; i < CircleArray.length; i++){
    CircleArray[i].update();
  }
}

function init(){
  CircleArray = [];
  for(var i = 0; i < 300; i++){
    var radius = minRadius+(2 * minRadius * Math.random());
    var x = Math.random()*(canvas.width - radius * 2) + radius;
    var y = Math.random()*(canvas.height - radius * 2) + radius;
    var dx = 6*(Math.random() - 0.5);
    var dy = 6*(Math.random() - 0.5);
    var color = ``;

    var colorArray = [
      '#dee0e6',
      '#1ac0c6',
      '#ff6150'
    ]

    color = colorArray[Math.floor(Math.random()*colorArray.length)];

    CircleArray.push(new Circle(x, y, radius, dx, dy, color));
    console.log(canvas_x);
  }
}