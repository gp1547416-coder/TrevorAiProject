export class TrevorEngine {
  private greetings = ["Certainly! I have drafted the code for your request. ✨", "Neural nodes activated. Here is your custom GUI: 🚀", "Analysis complete. Synthesizing your component... 🤖"];

  public getResponse(input: string): { text: string, code?: string } {
    const low = input.toLowerCase();
    
    // Check if the user wants to code/build something
    if (low.includes("make") || low.includes("code") || low.includes("build") || low.includes("create")) {
      
      // LOGIC: Extracting a color if mentioned
      const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "pink"];
      const foundColor = colors.find(c => low.includes(c)) || "#3b82f6"; // Default blue
      
      let generatedHtml = "";

      // LOGIC: Deciding what to build
      if (low.includes("button")) {
        generatedHtml = `<button style="background: ${foundColor}; color: white; border: none; padding: 15px 30px; border-radius: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">User Requested Button</button>`;
      } else if (low.includes("card") || low.includes("box")) {
        generatedHtml = `<div style="background: #1e293b; border: 2px solid ${foundColor}; padding: 25px; border-radius: 20px; color: white; text-align: center;"><h3>AI Generated Card</h3><p>Custom accent color: ${foundColor}</p></div>`;
      } else if (low.includes("input") || low.includes("search bar")) {
        generatedHtml = `<input placeholder="AI Search..." style="width: 100%; padding: 12px; border-radius: 10px; border: 2px solid ${foundColor}; background: #0f172a; color: white;" />`;
      } else {
        // Default "Smart" Code block if it doesn't recognize the shape
        generatedHtml = `<div style="font-family: monospace; color: ${foundColor}; padding: 10; background: #000; border-radius: 5px;">// Logic for: ${input}\nconsole.log("System optimized.");</div>`;
      }

      return {
        text: `${this.greetings[Math.floor(Math.random() * this.greetings.length)]}\n\nI have processed your request for a ${foundColor} component. Below is the live GUI preview.`,
        code: generatedHtml
      };
    }

    // LONG PARAGRAPH FALLBACK (The "ChatGPT" Rant)
    return { text: this.generateLongRant(input) };
  }

  private generateLongRant(input: string): string {
    let rant = "In regards to your query, the computational overhead required to process such a complex linguistic structure is significant. ";
    const thoughts = [
      "The recursive nature of this project allows for deep learning integration.",
      "By utilizing Next.js and Vercel, we minimize latency in the neural response loop.",
      "The aesthetic of the GUI is designed to reflect high-end industrial AI standards.",
      "I am constantly scanning your input to improve the weights of my trigram models."
    ];
    for (let i = 0; i < 8; i++) rant += thoughts[i % thoughts.length] + " ";
    return rant + "\n\nIs there a specific UI element you would like me to code now? 🧠";
  }
}
