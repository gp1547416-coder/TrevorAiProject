export class TrevorEngine {
  private greetings = ["Component architecture finalized. ✨", "Synthesizing visual representation... 🚀", "GUI parameters confirmed. Rendering now. 🤖"];

  public getResponse(input: string): { text: string, code?: string } {
    const low = input.toLowerCase();
    
    if (low.includes("make") || low.includes("code") || low.includes("build") || low.includes("draw")) {
      const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver", "pink"];
      const foundColor = colors.find(c => low.includes(c)) || "#3b82f6";
      
      let generatedHtml = "";

      // UNIVERSAL GEOMETRIC LOGIC
      if (low.includes("spoon")) {
        generatedHtml = `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 40px; height: 60px; background: silver; border-radius: 50% 50% 40% 40%; box-shadow: inset -5px -5px 10px rgba(0,0,0,0.2);"></div>
            <div style="width: 8px; height: 100px; background: silver; border-radius: 0 0 5px 5px;"></div>
          </div>`;
      } else if (low.includes("circle") || low.includes("ball")) {
        generatedHtml = `<div style="width: 100px; height: 100px; background: ${foundColor}; border-radius: 50%; box-shadow: 0 10px 20px rgba(0,0,0,0.3);"></div>`;
      } else if (low.includes("button")) {
        generatedHtml = `<button style="background: ${foundColor}; color: white; border: none; padding: 15px 30px; border-radius: 12px; font-weight: bold; cursor: pointer;">User Button</button>`;
      } else if (low.includes("house")) {
        generatedHtml = `
          <div style="position: relative; width: 100px; height: 100px;">
            <div style="width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 50px solid brown;"></div>
            <div style="width: 100px; height: 60px; background: ${foundColor};"></div>
          </div>`;
      } else {
        // FLEXIBLE BOX LOGIC: If he doesn't know the shape, he builds a custom box with the name
        generatedHtml = `<div style="padding: 30px; border: 4px dashed ${foundColor}; border-radius: 20px; color: white; text-align: center; background: rgba(255,255,255,0.05);"><h3>${input.toUpperCase()}</h3><p>Architecture Dynamic</p></div>`;
      }

      return {
        text: `${this.greetings[Math.floor(Math.random() * this.greetings.length)]}\n\nI have generated the visual layers for "${input}". Here is your 90-line analysis of the render pipeline:\n${this.generateLongRant(90)}`,
        code: generatedHtml
      };
    }

    return { text: this.generateLongRant(10) };
  }

  private generateLongRant(lines: number): string {
    const thoughts = [
      "The pixel-density of this requested object requires significant GPU allocation.",
      "Linguistic markers identified within your request suggest a high priority for GUI clarity.",
      "The recursive nature of the CSS rendering engine allows for real-time manipulation of these hex-codes.",
      "By utilizing a flexbox-oriented container, I am ensuring cross-platform stability.",
      "The visual hierarchy is maintained through precise margin and padding adjustments."
    ];
    let rant = "";
    for (let i = 0; i < lines; i++) {
      rant += thoughts[i % thoughts.length] + " ";
      if (i % 5 === 0) rant += "\n";
    }
    return rant;
  }
}
