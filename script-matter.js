// script-matter.js
document.addEventListener('DOMContentLoaded', () => {
    initAboutMatter();
});



//I used Gemini along with matter js document to help with matter js syntaxes and logic. 
function initAboutMatter() {
    const container = document.getElementById('about-matter');
    if (!container) return;

    container.innerHTML = '';

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies;

    const engine = Engine.create();
    engine.gravity.y = 0.85;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 600;

    // Random Background Color
    const bgColors = ['#FE99DF', '#FFDB2D', '#35A9FF'];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: width,
            height: height,
            background: randomBg,
            wireframes: false,
            showVelocity: false
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const imagePaths = [
        'web-assets/about-element-1.png',
        'web-assets/about-element-2.png',
        'web-assets/about-element-3.png'
    ];

    // Ground & Walls
    const ground = Bodies.rectangle(width/2, height * 0.82, width * 2, 80, {
        isStatic: true,
        render: { visible: false }
    });

    Composite.add(engine.world, [ground]);

    Composite.add(engine.world, [
        Bodies.rectangle(-40, height/2, 80, height * 2, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(width + 40, height/2, 80, height * 2, { isStatic: true, render: { visible: false } })
    ]);

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.6 }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // ====================== SETTINGS ======================
    const MAX_BODIES = 150; //MAX BODIES-----------IMPORTANTTTTT
    let spawningEnabled = true;

    // Spawn function
    function spawnElement() {
        if (!spawningEnabled) return;

        const currentBodies = Composite.allBodies(engine.world).filter(body => !body.isStatic).length;

        if (currentBodies >= MAX_BODIES) {
            spawningEnabled = false;
            console.log(`Maximum bodies (${MAX_BODIES}) reached. Spawning stopped.`);
            return;
        }

        const x = Math.random() * (width * 0.9) + width * 0.05;
        const size = 90 + Math.random() * 60;

        const element = Bodies.rectangle(x, -60, size, size, {
            restitution: 0.75,
            friction: 0.2,
            density: 0.8,
            angle: Math.random() * Math.PI * 2 - Math.PI,
            render: {
                sprite: {
                    texture: imagePaths[Math.floor(Math.random() * imagePaths.length)],
                    xScale: size / 190,
                    yScale: size / 190
                }
            }
        });

        Matter.Body.setVelocity(element, {
            x: (Math.random() - 0.5) * 4,
            y: Math.random() * 2 - 1
        });

        Composite.add(engine.world, element);
    }

    // Continuous spawning
    const spawnInterval = setInterval(() => {
        if (!spawningEnabled) {
            clearInterval(spawnInterval);
            return;
        }

        const count = Math.random() > 0.5 ? 2 : 1;
        for (let i = 0; i < count; i++) {
            setTimeout(spawnElement, i * 60);
        }
    }, 580);

    // Optional: Still clean up bodies that fall off screen
    setInterval(() => {
        const bodies = Composite.allBodies(engine.world);
        bodies.forEach(body => {
            if (!body.isStatic && body.position.y > height + 200) {
                Composite.remove(engine.world, body);
            }
        });
    }, 1500);

    // Gentle wind effect
    setInterval(() => {
        const bodies = Composite.allBodies(engine.world);
        bodies.forEach(body => {
            if (!body.isStatic && Math.random() > 0.65) {
                Matter.Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * 0.015,
                    y: (Math.random() - 0.8) * 0.01
                });
            }
        });
    }, 2500);

    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newW = container.clientWidth;
            const newH = container.clientHeight;
            render.canvas.width = newW;
            render.canvas.height = newH;
            render.options.width = newW;
            render.options.height = newH;
        }, 150);
    });

    // Cleanup
    window.aboutMatterCleanup = () => {
        clearInterval(spawnInterval);
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        if (render.canvas) render.canvas.remove();
    };
}