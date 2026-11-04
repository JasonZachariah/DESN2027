const { Engine, Render, Runner, Bodies, Composite } = Matter;

const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: { width: 800, height: 600, wireframes: false }
});


const quoteSets = [
  
    "The only way to do great work is to love what you do.",
    "Stay hungry, stay foolish.",
    "Simplicity is the ultimate sophistication.",
  
 
    "Design is how it works.",
    "Less, but better.",
    "Make it simple, but significant.",
  
  
    "Creativity is intelligence having fun.",
    "Every great design begins with an even better story.",
    "Have the courage to be simple.",
  
];

const quoteList = document.createElement("p");
quoteList.style.color = "#111";


quoteList.style.lineHeight = "1.6";
quoteList.style.padding = "0.5rem 1.25rem 0.5rem 2rem";

const containerWidth = 800;
const containerHeight = 600;
const groundHeight = 40;

const ground = Bodies.rectangle(
    containerWidth / 2,
    containerHeight - groundHeight / 2,
    containerWidth,
    groundHeight,
    {
        isStatic: true,
        render: { fillStyle: "#5c6b73" }
    }
);

// 1. Create a physical box that will act as the text bounds
const textBox = Bodies.rectangle(400, 200, 200, 60, {
    render: {
        fillStyle: '#3498db',
        // Inject custom text properties for our renderer to read later
        text: {
            content: "Hello Matter.js",
            color: "#ffffff",
            size: 24,
            family: "Host Grotesk"
        }
    }
});
Composite.add(engine.world, [textBox, ground]);

// 2. Override the renderer to paint the custom text properties
const nativeRenderBodies = Render.bodies; 

Render.bodies = function(render, bodies, context) {
    // Let Matter.js render the default body shapes first
    nativeRenderBodies(render, bodies, context);

    // Loop through all active bodies to find our custom text properties
    bodies.forEach(body => {
        if (body.render && body.render.text) {
            const { content, color, size, family } = body.render.text;
            
            context.save();
            // Move and rotate the canvas context to match the physics body
            context.translate(body.position.x, body.position.y);
            context.rotate(body.angle);
            
            // Configure canvas text styles
            context.textBaseline = "middle";
            context.textAlign = "center";
            context.fillStyle = color || "#ffffff";
            context.font = `${size || 16}px ${family || 'Arial'}`;
            
            // Draw the text at local coordinate (0,0) due to translate()
            context.fillText(content, 0, 0);
            context.restore();
        }
    });
};

// Start the simulation loop
Runner.run(Runner.create(), engine);
Render.run(render);