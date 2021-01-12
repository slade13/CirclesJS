
    // Get the canvas element
    let canvas = document.getElementById( "canvas" );
    // Get our 2D context for drawing
    let ctx = canvas.getContext( "2d" );

    // Frames-per-second
    let FPS = 30;

    // Particle Array
    let particles = [];

    // Game loop draw function
    function draw() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    for ( let i = 0; i < particles.length; i++ ) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
    ctx.fillStyle = p.color;
    ctx.fill();
}
}

    // Game loop update function
    function update() {
    for ( let i = 0; i < particles.length; i++ ) {
    let p = particles[i];

    // Update code here:
    p.vx += p.ax / FPS;
    p.vy += p.ay / FPS;
    p.x += p.vx / FPS;
    p.y += p.vy / FPS;

    if ( ( p.x - p.radius ) < 0 ) {
    p.x = p.radius;
    p.vx = -p.vx;
}
    if ( ( p.x + p.radius ) > canvas.width ) {
    p.x = canvas.width -p.radius;
    p.vx = -p.vx;
}
    if ( ( p.y - p.radius ) < 0 ) {
    p.y = p.radius;
    p.vy = -p.vy;
}
    if ( ( p.y + p.radius ) > canvas.height ) {
    p.y = canvas.height - p.radius;
    p.vy = -p.vy;
}
}
}

    function tick() {
    draw();
    update();
}

    setInterval( tick, 1000 / FPS );

    function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
}
    let rect = document.getElementById("canvas").getBoundingClientRect();

    // Get canvas offset
    let offset = {
    x: rect.left,
    y: rect.top
};

    window.onmousedown = function(e) {
    // IE doesn't always have e here
    e = e || window.event;

    // get event location
    let location = {
    x: e.pageX - offset.x,
    y: e.pageY - offset.y
};
    if((location.x >= 0)&&(location.x <= rect.width)) {
    if((location.y >= 0)&&(location.y <= rect.height)) {
    createParticle(location);
}
}

};

    function createParticle(location) {
    particles.push({
        // Use location values:
        x: location.x,
        y: location.y,
        // Create random values for each of these:
        vx: randNum( -200, 200 ),
        vy: randNum( -200, 200 ),
        ax: randNum( -150, 150 ),
        ay: randNum( -150, 150 ),
        radius: 10,
        color: "rgba(255, 255, 255, 1)"
    });
}